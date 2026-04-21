import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "./style.css";


const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// 📍 Botón para centrar mapa
const RecenterMap = ({ coords }) => {
  const map = useMap();

  if (coords) {
    map.setView(coords, 15);
  }

  return null;
};

// 📍 Marcador draggable
const DraggableMarker = ({ coords, setCoords }) => {
  const markerRef = useRef(null);

  return coords ? (
    <Marker
      draggable
      position={coords}
      ref={markerRef}
      eventHandlers={{
        dragend: () => {
          const marker = markerRef.current;
          if (marker) {
            const position = marker.getLatLng();
            setCoords(position);
          }
        }
      }}
    />
  ) : null;
};

export const MapPicker = ({ setCoords }) => {
  const [coords, setLocalCoords] = useState(null);
  
  const FixMapSize = () => {
    const map = useMap();

    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }, [map]);

    return null;
  };

  const defaultCenter = [19.357, -99.056]; // 🔥 CDMX oriente

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLocalCoords(e.latlng);
        setCoords(e.latlng);
      }
    });
    return null;
  };

  // 📍 usar ubicación real
  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newCoords = { lat: latitude, lng: longitude };

        setLocalCoords(newCoords);
        setCoords(newCoords);
      },
      () => {
        alert("No se pudo obtener tu ubicación");
      }
    );
  };

  return (      
    <>
      <button className="geo-btn" onClick={handleMyLocation}>
        📍 Usar mi ubicación
      </button>

      <MapContainer center={defaultCenter} zoom={12}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents />

        <RecenterMap coords={coords} />

        <DraggableMarker
          coords={coords}
          setCoords={(pos) => {
            setLocalCoords(pos);
            setCoords(pos);
          }}
        />
      </MapContainer>
    </>
  );
};
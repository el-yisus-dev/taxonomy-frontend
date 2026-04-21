import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

const LocationMarker = ({ setCoords }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setCoords(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

export const MapPicker = ({ setCoords }) => {
  return (
    <MapContainer center={[19.4326, -99.1332]} zoom={5}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker setCoords={setCoords} />
    </MapContainer>
  );
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createObservation } from "../../services/taxa.service";
import { uploadToCloudinary } from "../../services/images.service";
import { MapPicker } from "../../components/MapPicker";

import "./style.css";

export const CreateObservationPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: "",
    observedAt: "",
    placeName: ""
  });

  const [coords, setCoords] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🔥 VALIDACIONES
      if (!coords) {
        alert("Selecciona una ubicación en el mapa");
        return;
      }

      if (!form.description && images.length === 0) {
        alert("Debes agregar descripción o al menos una imagen");
        return;
      }

      // 🔥 subir imágenes a Cloudinary
      const uploadedImages = await Promise.all(
        images.map((file) => uploadToCloudinary(file))
      );

      const payload = {
        description: form.description || null,
        observedAt: new Date(form.observedAt).toISOString(),
        latitude: coords.lat,
        longitude: coords.lng,
        placeName: form.placeName || null,
        images: uploadedImages
      };

      await createObservation(payload);

      navigate("/home");

    } catch (error) {
      console.error("Error creating observation", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-observation">
      <h1>Nueva Observación</h1>

      <form onSubmit={handleSubmit}>
        
        {/* DESCRIPCIÓN */}
        <textarea
          name="description"
          placeholder="Descripción (opcional si subes imágenes)"
          onChange={handleChange}
        />

        {/* FECHA */}
        <input
          type="datetime-local"
          name="observedAt"
          onChange={handleChange}
          required
        />

        {/* LUGAR (opcional) */}
        <input
          type="text"
          name="placeName"
          placeholder="Nombre del lugar"
          onChange={handleChange}
        />

        {/* MAPA */}
        <div className="map-section">
          <p>Selecciona ubicación:</p>
          <div className="map-wrapper map-wrapper--relative">
            <MapPicker setCoords={setCoords} />
          </div>
          {coords && (
            <p>
              📍 {coords.lat.toFixed(4)} | {coords.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* IMÁGENES */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
        />

        {/* PREVIEW */}
        {images.length > 0 && (
          <div className="preview">
            {images.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
              />
            ))}
          </div>
        )}

        {/* SUBMIT */}
        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Crear Observación"}
        </button>

      </form>
    </div>
  );
};
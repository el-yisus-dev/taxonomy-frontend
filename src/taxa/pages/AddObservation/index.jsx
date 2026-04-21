import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createObservation } from "../../services/taxa.service";

import "./style.css";
import { uploadToCloudinary } from "../../services/images.service";
import { MapPicker } from "../../components/MapPicker";

export const CreateObservationPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: "",
    observedAt: "",
    latitude: "",
    longitude: "",
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

      // 🔥 subir imágenes
      const uploadedImages = await Promise.all(
        images.map((file) => uploadToCloudinary(file))
      );

      const payload = {
        ...form,
        latitude: coords?.lat,
        longitude: coords?.lng,
        observedAt: new Date(form.observedAt).toISOString(),
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
        
        <textarea
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="observedAt"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="latitude"
          placeholder="Latitud"
          onChange={handleChange}
          required
        />
        <MapPicker setCoords={setCoords} />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Crear Observación"}
        </button>
      </form>
    </div>
  );
};
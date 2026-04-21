import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import Input from "@shared/Input";
import FormRow from "@shared/FormRow";

import { useSnackbar } from "@context/snackbar.context";

import { createObservation } from "../../services/taxa.service";
import { uploadToCloudinary } from "../../services/images.service";
import { MapPicker } from "../../components/MapPicker";

import "./style.css";

export const CreateObservationPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar(); // 🔥 SOLO ESTE

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

      if (!coords) {
        showSnackbar("Selecciona una ubicación", "error");
        return;
      }

      if (!form.description && images.length === 0) {
        showSnackbar("Agrega descripción o al menos una imagen", "error");
        return;
      }

      // 🔥 subir imágenes
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

      showSnackbar("Observación creada correctamente", "success");

      setTimeout(() => {
        navigate("/home");
      }, 800);

    } catch (err) {
      const message = err.response?.data?.message || "Error al crear la observación";
      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-observation">
      <h1>Nueva Observación</h1>

      <form onSubmit={handleSubmit}>

        {/* DESCRIPCIÓN */}
        <FormRow>
          <div className="input">
            <label className="input__label">Descripción</label>
            <textarea
              className="input__field"
              name="description"
              placeholder="Opcional si subes imágenes"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </FormRow>

        <FormRow columns={2}>
          <Input
            label="Fecha de observación"
            type="datetime-local"
            name="observedAt"
            value={form.observedAt}
            onChange={handleChange}
            required
          />

          <Input
            label="Lugar"
            name="placeName"
            placeholder="Ej: CDMX, México"
            value={form.placeName}
            onChange={handleChange}
          />
        </FormRow>

        <div className="map-section">
          <p>Selecciona ubicación:</p>

          <div className="map-wrapper map-wrapper--relative">
            <MapPicker setCoords={setCoords} />
          </div>

          {coords && (
            <p className="coords">
              📍 {coords.lat.toFixed(4)} | {coords.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* IMÁGENES */}
        <FormRow>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />
        </FormRow>

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
        <Button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Crear Observación"}
        </Button>

      </form>
    </div>
  );
};
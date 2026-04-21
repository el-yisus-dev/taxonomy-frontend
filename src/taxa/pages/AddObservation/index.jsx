import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import Input from "@shared/Input";
import FormRow from "@shared/FormRow";

import { useSnackbar } from "@context/snackbar.context";

import { createObservation } from "../../services/taxa.service";
import { uploadToCloudinary } from "../../services/images.service";
import { MapPicker } from "../../components/MapPicker";
import { CameraModal } from "../../components/CameraModal";

import "./style.css";

export const CreateObservationPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    description: "",
    observedAt: "",
    placeName: ""
  });

  const [coords, setCoords] = useState(null);
  const [images, setImages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 FILE INPUT
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // 🔥 CAMERA CAPTURE
  const handleCapture = (file) => {
    setImages((prev) => [...prev, file]);
  };

  // 🔥 REMOVE IMAGE
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 SUBMIT
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

      // 🔥 subir imágenes a cloudinary
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
      console.error(err);
      const message =
        err.response?.data?.message || "Error al crear la observación";
      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-observation">
      <h1>Nueva Observación</h1>

      <form onSubmit={handleSubmit}>

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

        <FormRow>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
            />

            <Button
              type="button"
              variant="tertiary"
              onClick={() => setShowCamera(true)}
            >
              Tomar fotografía
            </Button>
          </div>
        </FormRow>

        {images.length > 0 && (
          <div className="preview">
            {images.map((file, i) => (
              <div key={i} className="preview-item">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                />

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeImage(i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SUBMIT */}
        <Button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Crear Observación"}
        </Button>

      </form>

      {/* CAMERA MODAL */}
      {showCamera && (
        <CameraModal
          onClose={() => setShowCamera(false)}
          onCapture={handleCapture}
        />
      )}
    </div>
  );
};
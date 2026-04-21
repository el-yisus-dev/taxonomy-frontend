import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";

// Agrega estos estilos en el mismo archivo o en un CSS aparte (ver más abajo)
import "./style.css";

export const CreateTaxaPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    rank: "",
    parentId: "",
    validationStatus: "PENDING"
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    // 🔥 Convertir rank a mayúsculas
    if (field === "rank") {
      value = value.toUpperCase();
    }
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    else if (form.name.trim().length < 2) newErrors.name = "El nombre debe tener al menos 2 caracteres";
    if (!form.rank) newErrors.rank = "Debes seleccionar un rango taxonómico";
    if (form.parentId && form.parentId.trim() && isNaN(Number(form.parentId))) {
      newErrors.parentId = "El ID del padre debe ser un número";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // 🔥 Asegurar mayúsculas también aquí
      const payload = {
        name: form.name.trim(),
        rank: form.rank.toUpperCase(), // <- otra capa de seguridad
        validationStatus: form.validationStatus,
        ...(form.parentId && form.parentId.trim() && { parentId: Number(form.parentId) })
      };
      console.log("Taxón creado:", payload);
      alert("Taxón creado exitosamente");
      navigate("/home");
    } catch (err) {
      console.error("Error al crear taxón:", err);
      alert("Error al crear el taxón");
    } finally {
      setLoading(false);
    }
  };

  const rankOptions = [
    { value: "", label: "Seleccionar rango..." },
    { value: "DOMAIN", label: "Dominio (DOMAIN)" },
    { value: "KINGDOM", label: "Reino (KINGDOM)" },
    { value: "PHYLUM", label: "Filo (PHYLUM)" },
    { value: "CLASS", label: "Clase (CLASS)" },
    { value: "ORDER", label: "Orden (ORDER)" },
    { value: "FAMILY", label: "Familia (FAMILY)" },
    { value: "GENUS", label: "Género (GENUS)" },
    { value: "SPECIES", label: "Especie (SPECIES)" }
  ];

  return (
    <section className="login register">
      <form className="register__form" onSubmit={handleSubmit}>
        <FormRow>
          <h2 className="login__title">Crear Nuevo Taxón</h2>
        </FormRow>

        <FormRow>
          <Input
            label="Nombre del taxón"
            placeholder="Ej: Homo sapiens, Canis lupus, Felis catus"
            value={form.name}
            onChange={handleChange("name")}
            error={errors.name}
            disabled={loading}
          />
        </FormRow>

        <FormRow>
          <div className="form-group">
            <label className="form-label">Rango taxonómico *</label>
            <select
              className={`form-select ${errors.rank ? "error" : ""}`}
              value={form.rank}
              onChange={handleChange("rank")}
              disabled={loading}
            >
              {rankOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.rank && <span className="error-message">{errors.rank}</span>}
          </div>
        </FormRow>

        <FormRow>
          <Input
            label="ID del taxón padre (opcional)"
            placeholder="Ej: 123"
            type="number"
            value={form.parentId}
            onChange={handleChange("parentId")}
            error={errors.parentId}
            disabled={loading}
            helperText="Opcional - Debe ser un nivel superior al rango seleccionado"
          />
        </FormRow>

        <FormRow>
          <div className="form-group">
            <label className="form-label">Estado de validación</label>
            <select
              className="form-select"
              value={form.validationStatus}
              onChange={handleChange("validationStatus")}
              disabled={loading}
            >
              <option value="PENDING">Pendiente</option>
              <option value="APPROVED">Aprobado</option>
              <option value="REJECTED">Rechazado</option>
            </select>
          </div>
        </FormRow>

        <FormRow>
          <Button size="lg" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Taxón"}
          </Button>
        </FormRow>

        <FormRow>
          <p className="login__create-account-text">
            ¿Quieres volver al inicio?
            <Link to="/home" className="login__create-account-link">
              <span> Ir al dashboard</span>
            </Link>
          </p>
        </FormRow>
      </form>
    </section>
  );
};
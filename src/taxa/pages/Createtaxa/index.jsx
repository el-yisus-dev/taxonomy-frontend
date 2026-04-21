import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";

import "./style.css";

export const CreateTaxaPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    rank: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
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
    else if (form.name.trim().length < 2)
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    if (!form.rank) newErrors.rank = "Debes seleccionar un rango taxonómico";
    if (!form.description.trim()) newErrors.description = "La descripción es requerida";
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
      const payload = {
        rank: form.rank.toUpperCase(),
        name: form.name.trim(),
        description: form.description.trim()
      };
      console.log("Enviando taxón:", payload);
      // await createTaxon(payload); // descomenta cuando tengas el servicio
      alert("✅ Taxón creado exitosamente");
      navigate("/home");
    } catch (err) {
      console.error("Error al crear taxón:", err);
      alert("❌ Error al crear el taxón");
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
    <section className="login register create-taxon-page">
      <form className="register__form" onSubmit={handleSubmit}>
        <FormRow>
          <h2 className="login__title">Crear Nuevo Taxón</h2>
        </FormRow>

        <FormRow>
          <Input
            label="Nombre del taxón"
            placeholder="Ej: Bacteria, Homo sapiens"
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
          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              disabled={loading}
              placeholder="Ej: Microorganismos unicelulares procariotas"
              className={`form-textarea ${errors.description ? "error" : ""}`}
              rows={4}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </FormRow>

        <FormRow>
          <Button size="lg" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Taxón"}
          </Button>
        </FormRow>
      </form>
    </section>
  );
};
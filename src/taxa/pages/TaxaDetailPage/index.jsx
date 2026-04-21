import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaxonById } from "../../services/taxa.service";

import "./style.css";

export const TaxonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taxon, setTaxon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaxon = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getTaxonById(id);
        setTaxon(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el taxón");
        setTaxon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxon();
  }, [id]);

  if (loading) {
    return (
      <div className="taxon-detail">
        <p>Cargando taxón...</p>
      </div>
    );
  }

  if (error || !taxon) {
    return (
      <div className="taxon-detail">
        <button onClick={() => navigate(-1)}>← Volver</button>
        <h2>❌ Taxón no encontrado</h2>
        <p>{error || "El recurso no existe o fue eliminado"}</p>
      </div>
    );
  }

  return (
    <div className="taxon-detail">

      {/* HEADER GRANDE */}
      <div className="taxon-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <h1 className="taxon-title">{taxon.name}</h1>

        <div className="taxon-meta">
          <span className="badge">{taxon.rank}</span>
          <span className={`status status--${taxon.validationStatus}`}>
            {taxon.validationStatus}
          </span>
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      <div className="taxon-section">
        <h2>Descripción</h2>
        <p className="taxon-description">
          {taxon.description || "Sin descripción disponible"}
        </p>
      </div>

      {/* INFO GENERAL */}
      <div className="taxon-grid">

        <div className="taxon-card">
          <h3>Información básica</h3>

          <p><strong>ID:</strong> {taxon.id}</p>
          <p><strong>Rank:</strong> {taxon.rank}</p>
          <p><strong>Nombre científico:</strong> {taxon.name}</p>
        </div>

        <div className="taxon-card">
          <h3>Auditoría</h3>

          <p>
            <strong>Creado por:</strong>{" "}
            {taxon.creator
              ? `${taxon.creator.name} ${taxon.creator.lastName} (@${taxon.creator.username})`
              : "Desconocido"}
          </p>

          <p>
            <strong>Creado:</strong>{" "}
            {new Date(taxon.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Actualizado:</strong>{" "}
            {new Date(taxon.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* RELACIÓN PARENT (si existe) */}
      {taxon.parentId && (
        <div className="taxon-section">
          <h2>Relación taxonómica</h2>
          <p>
            Este taxón pertenece a otro nivel jerárquico.
          </p>

          <button
            className="link-btn"
            onClick={() => navigate(`/home/taxons/${taxon.parentId}`)}
          >
            Ver taxón padre
          </button>
        </div>
      )}

    </div>
  );
};
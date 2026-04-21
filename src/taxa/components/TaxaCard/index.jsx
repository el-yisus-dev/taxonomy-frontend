import { useNavigate } from "react-router-dom";

export const TaxonCard = ({ taxon }) => {
  const navigate = useNavigate();

  return (
    <div className="taxon-card">
      <div className="taxon-card__content">
        <h3>{taxon.name}</h3>
        <p className="taxon-rank">{taxon.rank}</p>
        <p className="taxon-status">{taxon.validationStatus}</p>
      </div>

      <button
        className="taxon-card__btn"
        onClick={() => navigate(`/taxons/${taxon.id}`)}
      >
        Ver detalle
      </button>
    </div>
  );
};


export const ObservationCard = ({ observation }) => {
  return (
    <div className="observation-card">
      {observation.images?.[0] && (
        <img
          src={observation.images[0].url}
          alt="observation"
          className="observation-img"
        />
      )}

      <div className="observation-content">
        <p>{observation.description || "Sin descripción"}</p>
        <span>{new Date(observation.observedAt).toLocaleDateString()}</span>
        <small>{observation.placeName || "Ubicación desconocida"}</small>
      </div>
    </div>
  );
};
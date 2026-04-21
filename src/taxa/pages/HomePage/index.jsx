import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@shared/Button";

import { getObservations, getTaxons } from "../../services/taxa.service";
import { TaxonCard, ObservationCard } from "../../components/TaxaCard";
import { RANK_OPTIONS, STATUS_OPTIONS } from "../../const";

import "./style.css";

export const HomePage = ({ data = {} }) => {
  const [activeTab, setActiveTab] = useState("taxons");

  const [taxons, setTaxons] = useState([]);
  const [observations, setObservations] = useState([]);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    rank: [],
    status: []
  });

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const buildQuery = () => {
    const query = {
      page,
      limit: 9
    };

    if (filters.rank.length) {
      query.rank = filters.rank.join(",");
    }

    if (filters.status.length) {
      query.status = filters.status.join(",");
    }

    return query;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (activeTab === "taxons") {
          const res = await getTaxons(buildQuery());
          setTaxons(res.data);
          setMeta(res.meta);
        }

        if (activeTab === "observations") {
          const res = await getObservations({ page, limit: 6 });
          setObservations(res.data);
          setMeta(res.meta);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, filters, page]);

    const stats = [
    { label: "Especies Registradas", value: data.stats?.totalSpecies || 0 },
    { label: "Avistamientos", value: data.stats?.totalSightings || 0 },
    { label: "Fotos Subidas", value: data.stats?.totalPhotos || 0 },
    { type: "action" }
    ];

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
        const exists = prev[type].includes(value);

        return {
        ...prev,
        [type]: exists
            ? prev[type].filter((v) => v !== value)
            : [...prev[type], value]
        };
    });

    setPage(1);
    };

    useEffect(() => {
    const handleClick = (e) => {
        if (e.target.closest(".stat-card--action")) return;

        setShowQuickCreate(false);
    };

    if (showQuickCreate) {
        window.addEventListener("click", handleClick);
    }

    return () => {
        window.removeEventListener("click", handleClick);
    };
    }, [showQuickCreate]);
    
    return (
    <div className="dashboard-content">
      <h1>Bienvenido a AnimalDex</h1>

    <div className="stats-grid">
        {stats.map((stat, index) => {
            if (stat.type === "action") {
            return (
                <div key={index} className="stat-card stat-card--action">
                
                <div
                    className="quick-action"
                    onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickCreate((prev) => !prev);
                    }}
                >
                    +
                </div>

                {/* MENU */}
                {showQuickCreate && (
                            <div
                            className="quick-menu"
                            onClick={(e) => e.stopPropagation()}
                            >
                            <div
                                className="quick-item"
                                onClick={() => {
                                setShowQuickCreate(false);
                                navigate("/taxons/create");
                                }}
                            >
                                🌿 Nuevo taxón
                            </div>

                            <div
                                className="quick-item"
                                onClick={() => {
                                setShowQuickCreate(false);
                                navigate("/home/observations/create");
                                }}
                            >
                                📸 Nueva observación
                            </div>
                            </div>
                        )}

                        </div>
                    );
                    }

                    return (
                    <div key={index} className="stat-card">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                    );
                })}
    </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "taxons" ? "tab active" : "tab"}
          onClick={() => {
            setActiveTab("taxons");
            setPage(1);
          }}
        >
          Taxones
        </button>

        <button
          className={activeTab === "observations" ? "tab active" : "tab"}
          onClick={() => {
            setActiveTab("observations");
            setPage(1);
          }}
        >
          Observaciones
        </button>
      </div>

      {/* 🔥 FILTROS SOLO PARA TAXONS */}
      {activeTab === "taxons" && (
        <div className="filters">
        {/* RANK */}
        <div className="filter-group">
            <span className="filter-title">Rank</span>
            <div className="chips">
            {RANK_OPTIONS.map((rank) => (
                <button
                key={rank}
                className={`chip ${
                    filters.rank.includes(rank) ? "active" : ""
                }`}
                onClick={() => toggleFilter("rank", rank)}
                >
                {rank}
                </button>
            ))}
            </div>
        </div>

  {/* STATUS */}
  <div className="filter-group">
    <span className="filter-title">Status</span>
    <div className="chips">
      {STATUS_OPTIONS.map((status) => (
        <button
          key={status}
          className={`chip ${
            filters.status.includes(status) ? "active" : ""
          }`}
          onClick={() => toggleFilter("status", status)}
        >
          {status}
        </button>
      ))}
    </div>
  </div>

  {/* CLEAR */}
  <button
    className="clear-btn"
    onClick={() => {
      setFilters({ rank: [], status: [] });
      setPage(1);
    }}
  >
    Limpiar filtros
  </button>
</div>
      )}

      {/* CONTENT */}
      <section className="taxons-section">
        <h2>
          {activeTab === "taxons"
            ? "Taxones"
            : "Observaciones"}
        </h2>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <div className="taxons-grid">
              {activeTab === "taxons" &&
                taxons.map((taxon) => (
                  <TaxonCard key={taxon.id} taxon={taxon} />
                ))}

              {activeTab === "observations" &&
                observations.map((obs) => (
                  <ObservationCard key={obs.id} observation={obs} />
                ))}
            </div>

            {/* 🔥 PAGINACIÓN REAL */}
            {meta && (
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Anterior
                </button>

                <span>
                  Página {meta.page} de {meta.totalPages}
                </span>

                <button
                  disabled={page === meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
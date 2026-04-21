import { useEffect, useState } from "react";
import { getObservations, getTaxons } from "../../services/taxa.service";

import { TaxonCard, ObservationCard } from "../../components/TaxaCard";

import "./style.css";

export const HomePage = ({ data = {} }) => {
  const [activeTab, setActiveTab] = useState("taxons");

  const [taxons, setTaxons] = useState([]);
  const [observations, setObservations] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (activeTab === "taxons" && taxons.length === 0) {
          const res = await getTaxons({ limit: 6 });
          setTaxons(res.data);
        }

        if (activeTab === "observations" && observations.length === 0) {
          const res = await getObservations({ limit: 6 });
          setObservations(res.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const stats = [
    { label: "Especies Registradas", value: data.stats?.totalSpecies || 0 },
    { label: "Avistamientos", value: data.stats?.totalSightings || 0 },
    { label: "Usuarios Activos", value: data.stats?.activeUsers || 0 },
    { label: "Fotos Subidas", value: data.stats?.totalPhotos || 0 }
  ];

  return (
    <div className="dashboard-content">
      <h1>Bienvenido a AnimalDex</h1>

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "taxons" ? "tab active" : "tab"}
          onClick={() => setActiveTab("taxons")}
        >
          Taxones
        </button>

        <button
          className={activeTab === "observations" ? "tab active" : "tab"}
          onClick={() => setActiveTab("observations")}
        >
          Observaciones
        </button>
      </div>

      {/* CONTENT */}
      <section className="taxons-section">
        <h2>
          {activeTab === "taxons"
            ? "Últimos Taxones"
            : "Últimas Observaciones"}
        </h2>

        {loading ? (
          <p>Cargando...</p>
        ) : (
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
        )}
      </section>
    </div>
  );
};
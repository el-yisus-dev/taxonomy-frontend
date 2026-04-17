export const ExplorarPage = ({ data }) => (
    <div className="explore-content">
        <h1>Explorar Especies</h1>
        <div className="species-grid">
            {data?.length > 0 ? (
                data.map((species, index) => (
                    <div key={index} className="species-card">
                        <div className="species-image">
                            <i className="fas fa-image"></i>
                        </div>
                        <div className="species-info">
                            <h3>{species.name}</h3>
                            <p>{species.scientificName}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay especies para mostrar</p>
            )}
        </div>
    </div>
);
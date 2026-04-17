import { Binocular, Butterfly, CameraAlt } from '@boxicons/react';

export const HomePage = ({ data = {} }) => {
    const stats = [
        { label: "Especies Registradas", value: data.stats?.totalSpecies || 0, icon: <Butterfly/> },
        { label: "Avistamientos", value: data.stats?.totalSightings || 0, icon: <Binocular /> },
        { label: "Usuarios Activos", value: data.stats?.activeUsers || 0, icon: "fas fa-users" },
        { label: "Fotos Subidas", value: data.stats?.totalPhotos || 0, icon: <CameraAlt /> }
    ];

    return (
        <div className="dashboard-content">
            <h1>Bienvenido a AnimalDex</h1>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        {stat.icon}
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
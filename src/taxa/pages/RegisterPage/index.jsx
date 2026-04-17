export const RegistrosPage = ({ data }) => (
    <div className="records-content">
        <h1>Mis Registros</h1>
        <div className="records-table">
            <table className="records-table">
                <thead>
                    <tr>
                        <th>Especie</th>
                        <th>Ubicación</th>
                        <th>Fecha</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record, index) => (
                        <tr key={index}>
                            <td>{record.species}</td>
                            <td>{record.location}</td>
                            <td>{record.date}</td>
                            <td>
                                {record.photo ? 
                                    <i className="fas fa-check-circle" style={{ color: "green" }}></i> : 
                                    <i className="fas fa-times-circle" style={{ color: "red" }}></i>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
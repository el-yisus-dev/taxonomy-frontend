import { useNavigate, useLocation } from "react-router-dom";
    
import { useTheme } from "@context/darkLighit.context"; 
import { useAuth } from "@context/auth.context";

export default function c({ sidebarOpen, toggleSidebar, onOpenCamera, setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
        
    const isActive = (path) => location.pathname === path;
    const { toggleTheme } = useTheme(); 
    const { logout } = useAuth();

    return (
        <>
            <div className={`sidebar ${!sidebarOpen ? "collapsed" : ""}`}>

                <div className="top-section">
                    <div className="sidebar-logo" onClick={toggleSidebar}>
                        <i className='bx bx-menu' />
                        {sidebarOpen && <span>AnimalDex</span>}
                    </div>
                    <div
                        className={`nav-item ${isActive("/home") ? "active" : ""}`}
                        onClick={() => navigate("/home")}
                    >
                        Inicio
                    </div>

                    <div
                        className={`nav-item ${isActive("/home/explorar") ? "active" : ""}`}
                        onClick={() => navigate("/home/explorar")}
                    >
                        Explorar
                    </div>

                    <div
                        className={`nav-item ${isActive("/home/mapa") ? "active" : ""}`}
                        onClick={() => navigate("/home/mapa")}
                    >
                        Mapa
                    </div>

                    <div
                        className={`nav-item ${isActive("/home/registros") ? "active" : ""}`}
                        onClick={() => navigate("/home/registros")}
                    >
                        Registros
                    </div>

                    <div className="nav-item" onClick={onOpenCamera}>
                        Cámara
                    </div>
                </div>
                <div className="bottom-section">
                    <div className="nav-item" onClick={toggleTheme}>
                        Tema
                    </div>
                    <div className="nav-item" onClick={logout}>
                        Cerrar sessión
                    </div>
                </div>      
            </div>
            
            <div className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <i class='bx bx-menu'></i>
            </div>
        </>
    );
}
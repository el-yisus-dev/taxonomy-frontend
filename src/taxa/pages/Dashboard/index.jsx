import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Binocular, Butterfly, CameraAlt, Menu } from '@boxicons/react';


import { useAuth } from "@context/auth.context";
import { useSnackbar } from "@context/snackbar.context";
import { useTheme } from "@context/darkLighit.context";
import { authPath } from "@shared/constants/paths";

import "./style.css";

export const Home = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { showSnackbar } = useSnackbar();
    const { darkMode, toggleTheme } = useTheme();
    
    const [currentPage, setCurrentPage] = useState("inicio");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showCamera, setShowCamera] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalSpecies: 245,
            totalSightings: 1890,
            activeUsers: 156,
            totalPhotos: 3420
        },
        explorations: [],
        recentRecords: [
            { species: "Jaguar", location: "Amazonas", date: "2024-01-15", photo: true },
            { species: "Guacamaya", location: "Petén", date: "2024-01-14", photo: true },
            { species: "Mono Araña", location: "Chiapas", date: "2024-01-13", photo: false }
        ]
    });

    const handleLogout = () => {
        logout();
        showSnackbar("Sesión cerrada exitosamente", "success");
        navigate(authPath.login);
    };

    const handleCapture = async (imageBlob) => {
        showSnackbar("Imagen capturada exitosamente", "success");
        setShowCamera(false);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando...</p>
                </div>
            );
        }

        switch (currentPage) {
            case "inicio":
                return <InicioPage data={dashboardData} />;
            case "explorar":
                return <ExplorarPage data={dashboardData.explorations} />;
            case "mapa":
                return <MapaPage />;
            case "registros":
                return <RegistrosPage data={dashboardData.recentRecords} />;
            default:
                return <InicioPage data={dashboardData} />;
        }
    };

    return (
        <div className="app-wrapper">
            <div className={`sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
                <div className="sidebar-logo">
                    <i class='bx bx-menu' />
                    {sidebarOpen && <span>AnimalDex</span>}
                </div>
                
                <div 
                    className={`nav-item ${currentPage === "inicio" ? "active" : ""}`}
                    onClick={() => setCurrentPage("inicio")}
                >
                    <i className="fas fa-home"></i>
                    {sidebarOpen && <span>Inicio</span>}
                </div>
                
                <div 
                    className={`nav-item ${currentPage === "explorar" ? "active" : ""}`}
                    onClick={() => setCurrentPage("explorar")}
                >
                    <i className="fas fa-globe-americas"></i>
                    {sidebarOpen && <span>Explorar</span>}
                </div>
                
                <div 
                    className={`nav-item ${currentPage === "mapa" ? "active" : ""}`}
                    onClick={() => setCurrentPage("mapa")}
                >
                    <i className="fas fa-map-marked-alt"></i>
                    {sidebarOpen && <span>Mapa</span>}
                </div>
                
                <div 
                    className={`nav-item ${currentPage === "registros" ? "active" : ""}`}
                    onClick={() => setCurrentPage("registros")}
                >
                    <i className="fas fa-clipboard-list"></i>
                    {sidebarOpen && <span>Registros</span>}
                </div>
                
                <div 
                    className="nav-item"
                    onClick={() => setShowCamera(true)}
                >
                    <i className="fas fa-camera"></i>
                    {sidebarOpen && <span>Cámara</span>}
                </div>

                <div className="sidebar-footer">
                    <div className="sidebar-action" onClick={toggleTheme}>
                        <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                        {sidebarOpen && <span>{darkMode ? "Modo Claro" : "Modo Oscuro"}</span>}
                    </div>
                    <div className="sidebar-action" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        {sidebarOpen && <span>Cerrar Sesión</span>}
                    </div>
                </div>
            </div>

            <div className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <i class='bx bx-menu'></i>
            </div>

            <div className="main-area">
                {renderContent()}
            </div>

            <ChatAssistant />

            {showCamera && (
                <CameraModal 
                    onClose={() => setShowCamera(false)}
                    onCapture={handleCapture}
                />
            )}
        </div>
    );
};

const InicioPage = ({ data }) => {
    const stats = [
        { label: "Especies Registradas", value: data.stats?.totalSpecies || 0, icon: <Butterfly/> },
        { label: "Avistamientos", value: data.stats?.totalSightings || 0, icon: <Binocular /> },
        { label: "Usuarios Activos", value: data.stats?.activeUsers || 0, icon: "fas fa-users" },
        { label: "Fotos Subidas", value: data.stats?.totalPhotos || 0, icon: <CameraAlt /> }
    ];

    return (
        <div className="dashboard-content">
            <div className="dashboard-header">
                <h1>Bienvenido a AnimalDex</h1>
                <p>Observatorio Naturalista - Explora y registra la biodiversidad</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-icon">
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value.toLocaleString()}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recent-activity">
                <h2>Actividad Reciente</h2>
                <div className="activity-list">
                    {data.recentRecords?.map((record, index) => (
                        <div key={index} className="activity-item">
                            <i className="fas fa-leaf"></i>
                            <div>
                                <p><strong>{record.species}</strong></p>
                                <small>{record.location} • {record.date}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ExplorarPage = ({ data }) => (
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

const MapaPage = () => (
    <div className="map-content">
        <h1>Mapa de Avistamientos</h1>
        <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Aquí se cargará el mapa interactivo</p>
        </div>
    </div>
);

const RegistrosPage = ({ data }) => (
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

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: "bot", text: "¡Hola! Puedes usar la cámara desde el menú lateral 📸" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = { type: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            const botMessage = { type: "bot", text: "Gracias por tu mensaje. Estoy aprendiendo para ayudarte mejor." };
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    return (
        <div className="chat-assistant">
            <div className="chat-bubble" onClick={() => setIsOpen(!isOpen)}>
                <i className="fas fa-robot"></i>
            </div>
            
            <div className={`chat-window ${!isOpen ? "closed" : ""}`}>
                <div className="chat-header">
                    <span><i className="fas fa-comment-dots"></i> Asistente IA</span>
                    <button className="close-chat" onClick={() => setIsOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`msg msg-${msg.type}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="chat-input-area">
                    <input 
                        type="text" 
                        placeholder="Escribe tu mensaje..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

// CameraModal CON CAMBIO DE CÁMARA (frontal/trasera) y CIERRE INSTANTÁNEO
const CameraModal = ({ onClose, onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    let mediaStream = null;
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cameraFacing, setCameraFacing] = useState("user"); // "user" = frontal, "environment" = trasera

    useEffect(() => {
        startCamera();
        return () => {
            stopCameraImmediately();
        };
    }, [cameraFacing]);

    const startCamera = async () => {
        // Detener cámara actual si existe
        stopCameraImmediately();
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { exact: cameraFacing } }
            });
            mediaStream = stream;
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    setIsCameraReady(true);
                };
            }
        } catch (error) {
            // Si no se puede con la cámara exacta, intentar con cualquier cámara
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                mediaStream = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        setIsCameraReady(true);
                    };
                }
            } catch (fallbackError) {
                console.error("Error al acceder a la cámara:", fallbackError);
                setIsCameraReady(false);
            }
        }
    };

    const stopCameraImmediately = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => {
                track.stop();
            });
            mediaStream = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraReady(false);
    };

    const switchCamera = () => {
        setCameraFacing(prev => prev === "user" ? "environment" : "user");
    };

    const handleClose = () => {
        stopCameraImmediately();
        onClose();
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current && isCameraReady) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            // Para cámara frontal, voltear la imagen para que no salga al revés
            if (cameraFacing === "user") {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
            
            // Apagar cámara inmediatamente
            stopCameraImmediately();
            
            canvas.toBlob((blob) => {
                if (blob && onCapture) {
                    onCapture(blob);
                }
            }, 'image/jpeg', 0.9);
            
            onClose();
        }
    };

    return (
        <div className="camera-modal" onClick={handleClose}>
            <div className="camera-container" onClick={(e) => e.stopPropagation()}>
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className="camera-video"
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transform: cameraFacing === "user" ? 'scaleX(-1)' : 'none',
                        display: isCameraReady ? 'block' : 'none'
                    }}
                />
                {!isCameraReady && (
                    <div className="camera-loading">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Iniciando cámara...</p>
                    </div>
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <div className="camera-controls">
                    <button 
                        onClick={switchCamera} 
                        className="switch-camera-btn"
                        disabled={!isCameraReady}
                    >
                        <i className="fas fa-sync-alt"></i>
                    </button>
                    <button 
                        onClick={takePhoto} 
                        className="capture-btn"
                        disabled={!isCameraReady}
                    ></button>
                    <button onClick={handleClose} className="close-btn">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
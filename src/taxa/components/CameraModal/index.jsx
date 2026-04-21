import { useEffect, useRef, useState } from "react";

export const CameraModal = ({ onClose, onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    let mediaStream = null;
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cameraFacing, setCameraFacing] = useState("user"); // "user" = frontal, "environment" = trasera

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
                    const file = new File([blob], `camera-${Date.now()}.jpg`, {
                    type: "image/jpeg"
                    });

                    onCapture(file);
                }
                }, "image/jpeg", 0.9);
            
            onClose();
        }
    };

    useEffect(() => {
        startCamera();
        return () => {
            stopCameraImmediately();
        };
    }, [cameraFacing]);

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
// src/context/darkLighit.context.jsx
import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const isTransitioning = useRef(false);
    const overlayRef = useRef(null);

    const removeOverlay = useCallback(() => {
        if (overlayRef.current) {
            overlayRef.current.remove();
            overlayRef.current = null;
        }
    }, []);

    const toggleTheme = useCallback(() => {
        // Evita múltiples transiciones simultáneas
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        const newMode = !darkMode;
        
        // Crear overlay una sola vez
        const overlay = document.createElement('div');
        overlayRef.current = overlay;
        
        // Usar clases CSS en lugar de estilos inline para mejor rendimiento
        overlay.className = 'theme-overlay';
        overlay.style.backgroundColor = newMode ? '#0B1120' : '#F3F6FB';
        
        document.body.appendChild(overlay);
        
        // Usar requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
        });
        
        // Cambiar el tema
        const timeoutId = setTimeout(() => {
            setDarkMode(newMode);
            
            // Actualizar clases del body
            if (newMode) {
                document.body.classList.remove('light');
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
            
            localStorage.setItem('app-theme', newMode ? 'dark' : 'light');
            
            // Fade out
            overlay.classList.remove('active');
            
            // Limpiar
            setTimeout(() => {
                removeOverlay();
                isTransitioning.current = false;
            }, 400);
        }, 300);
        
        // Limpiar timeout si es necesario
        return () => clearTimeout(timeoutId);
    }, [darkMode, removeOverlay]);

    // Cargar tema guardado al inicio (sin animación)
    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme');
        
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            setDarkMode(false);
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
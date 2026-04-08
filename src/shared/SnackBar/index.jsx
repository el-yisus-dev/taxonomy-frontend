import { useEffect } from "react";
import "./style.css";

export default function Snackbar({ open, message, type = "success", onClose, duration = 3000 }) {
  
  useEffect(() => {
    
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={`snackbar snackbar--${type}`}>
      {message}
    </div>
  );
}
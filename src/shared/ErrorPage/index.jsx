import { Link } from "react-router-dom";
import Button from "@shared/Button";

export const Errorpage404 = () => {
  return (
    <section className="login">
      <div className="login__form" style={{ textAlign: "center", maxWidth: "500px" }}>
        <h2 className="login__title">404</h2>
        <h3>Página no encontrada</h3>
        <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
        <Link to="/home">
          <Button variant="primary" size="lg">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </section>
  );
};
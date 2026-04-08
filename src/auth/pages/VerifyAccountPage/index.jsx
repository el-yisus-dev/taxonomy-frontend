import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import { useSnackbar } from "@context/snackbar.context";
import { authPath } from "@shared/constants/paths";

import { verifyAccount } from "../../services/auth.services";
import "./style.css";

export const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const navigate = useNavigate();

    const { showSnackbar } = useSnackbar();

    const [status, setStatus] = useState(() => {
        return token ? "loading" : "error";
    });

    const hasRun = useRef(false);

    useEffect(() => {
    if (!token || hasRun.current) return;

    hasRun.current = true;

    (async () => {
        try {
        await verifyAccount(token);
        setStatus("success");
        } catch (err) {
        setStatus("error");

        const message =
            err.response?.data?.message || "Token inválido o expirado";

        showSnackbar(message, "error");
        }
    })();
    }, [token]);

    useEffect(() => {
        if (status === "success") {
            setTimeout(() => {
            navigate(authPath.login);
            }, 2000);
        }
    }, [status]);
    
    return (
    <section className="login">
      <div className="login__form">

        {status === "loading" && (
          <>
            <FormRow>
                <h2 className="login__title">Verificando...</h2>
            </FormRow>
            <FormRow>
                <p className="login__create-account-text">Esto puede tardar unos segundos</p>
            </FormRow>
            </>
        )}


        {status === "success" && (
          <>
            <FormRow>
              <h2 className="login__title">Correo verificado 🎉</h2>
            </FormRow>

            <FormRow>
              <p className="login__create-account-text">
                Tu cuenta ha sido verificada correctamente.
              </p>
            </FormRow>

            <FormRow>
              <Link to={authPath.login} className="style-links">
                <Button size="lg">Ir a iniciar sesión</Button>
              </Link>
            </FormRow>
          </>
        )}

        
        {status === "error" && (
          <>
            <FormRow>
              <h2 className="login__title">Token inválido</h2>
            </FormRow>

            <FormRow>
              <p className="login__create-account-text">
                El enlace es inválido o ha expirado.
              </p>
            </FormRow>

            <FormRow>
                <Button size="lg" onClick={() => showSnackbar("Pendiente implementar", "error")}>
                    Reenviar correo
                </Button>
            </FormRow>

            <FormRow>
              <Link to={authPath.login} className="style-links">
                <span className="login__create-account-link">
                  Volver al login
                </span>
              </Link>
            </FormRow>
          </>
        )}

      </div>
    </section>
  );
};
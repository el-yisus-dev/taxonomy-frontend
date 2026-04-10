/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";
import { useSnackbar } from "@context/snackbar.context";
import { useTheme } from "@context/darkLighit.context";
import { authPath } from "@shared/constants/paths";

import { resendVerification, verifyAccount } from "../../services/auth.services";
import "./style.css";
import { validateEmail } from "../../utils/auth";

export const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { darkMode, toggleTheme } = useTheme();
    const hasRun = useRef(false);

    const [status, setStatus] = useState(() => {
        return token ? "loading" : "error";
    });

    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        email: "",
    });    
    const [errors, setErrors] = useState({});
    
    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });

        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const handleResend = async () => {
        const validationErrors = validateEmail(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const response = await resendVerification(form);
            showSnackbar(response.data.message, "success");
            setStep(2);

        } catch (err) {
            const message = err.response?.data?.message || "Error al verificar correo";
            showSnackbar(message, "error");
        }
    };

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
      {/* Switch de tema */}
      <div className="theme-toggle">
          <i className='bx bx-sun'></i>
          <label className="switch">
              <input 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={toggleTheme}
              />
              <span className="slider"></span>
          </label>
          <i className='bx bx-moon'></i>
      </div>

      <div className="login__form">

        {status === "loading" && (
          <>
            <FormRow>
              <h2 className="login__title">Verificando...</h2>
            </FormRow>
            <FormRow>
              <p className="login__create-account-text">
                Esto puede tardar unos segundos
              </p>
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

        {status === "error" && step === 0 && (
          <>
            <FormRow>
              <h2 className="login__title">Token inválido</h2>
            </FormRow>

            <FormRow>
              <p className="login__create-account-text">
                {token === null ? "El token es requerido" : "El enlace es inválido o ha expirado."}
              </p>
            </FormRow>

            <FormRow>
              <Button size="lg" onClick={() => setStep(1)}>
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

        {status === "error" && step === 1 && (
          <>
            <FormRow>
              <h2 className="login__title">Reenviar verificación</h2>
            </FormRow>

            <FormRow>
              <Input
                label="Email"
                type="email"
                placeholder="example@example.com"
                value={form.email}
                onChange={handleChange("email")}
                error={errors.email}
            />
            </FormRow>

            <FormRow>
              <Button size="lg" onClick={handleResend}>
                Enviar correo
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

        {status === "error" && step === 2 && (
          <>
            <FormRow>
              <h2 className="login__title">Correo enviado 📩</h2>
            </FormRow>

            <FormRow>
              <p className="login__create-account-text">
                Revisa tu bandeja de entrada para continuar.
              </p>
            </FormRow>

            <FormRow>
              <Link to={authPath.login} className="style-links">
                <Button size="lg">Ir a iniciar sesión</Button>
              </Link>
            </FormRow>
          </>
        )}

      </div>
    </section>
  );
};
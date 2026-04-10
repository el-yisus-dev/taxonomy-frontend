import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";
import OTPInput from "../../components/OTPInput";
import { authPath } from "@shared/constants/paths.js";
import { useSnackbar } from "@context/snackbar.context";
import { useTheme } from "@context/darkLighit.context";

import {
  requestPasswordReset,
  resetPassword,
} from "../../services/auth.services";

import { validateEmail, validateUpdatePassword } from "../../utils/auth";

import "./style.css";

export const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);

  const { showSnackbar } = useSnackbar();
  const { darkMode, toggleTheme } = useTheme();

  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (value) => {
    const val = value?.target ? value.target.value : value;

    setForm({ ...form, [field]: val });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();

    const validationErrors = validateEmail(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      
      const response = await requestPasswordReset(form.email);
      showSnackbar(response.data.message, "success");
      setTimeout(() => navigate(authPath.login), 2000);

    } catch (err) {
      const message =
      err.response?.data?.message || "Error al enviar el código";
      showSnackbar(message, "error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const validationErrors = validateUpdatePassword(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await resetPassword(form);

      showSnackbar(response.data.message, "success");

      setStep(1);
      setForm({ email: "", code: "", password: "" });
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al actualizar contraseña";

      showSnackbar(message, "error");
    }
  };

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

      <form className="login__form">

        <FormRow>
          <h2 className="login__title">
            {step === 1 ? "Recuperar contraseña" : "Verificar código"}
          </h2>
        </FormRow>

        {step === 1 && (
          <>
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
              <Button size="lg" onClick={handleRequestCode}>
                Enviar código
              </Button>
            </FormRow>

            <FormRow>
              <p className="login__create-account-text">
                Volver al
                <Link
                  to={authPath.login}
                  className="login__create-account-link"
                >
                  <span> inicio de sesión</span>
                </Link>
              </p>
            </FormRow>
          </>
        )}

        {step === 2 && (
          <>
            <FormRow>
              <p className="login__create-account-text">
                Ingresa el código que enviamos a tu correo
              </p>

              <OTPInput
                value={form.code}
                onChange={handleChange("code")}
              />

              {errors.code && (
                <span className="input-error">{errors.code}</span>
              )}
            </FormRow>

            <FormRow>
              <Input
                label="Nueva contraseña"
                type="password"
                placeholder="*******"
                value={form.password}
                onChange={handleChange("password")}
                error={errors.password}
              />
            </FormRow>

            <FormRow>
              <Button size="lg" onClick={handleResetPassword}>
                Actualizar contraseña
              </Button>
            </FormRow>

            <FormRow>
              <p className="login__create-account-text">
                ¿No recibiste el código?
                <span
                  className="login__create-account-link"
                  onClick={() => setStep(1)}
                  style={{ cursor: "pointer" }}
                >
                  {" "}Reintentar
                </span>
              </p>
            </FormRow>
          </>
        )}
      </form>
    </section>
  );
};
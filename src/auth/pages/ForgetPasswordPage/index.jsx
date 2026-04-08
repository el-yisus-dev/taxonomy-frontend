import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";
import OTPInput from "../../components/OTPInput";
import { authPath } from "@shared/constants/paths.js"

import "./style.css";

export const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
  });

  return (
    <section className="login">
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
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </FormRow>

            <FormRow>
              <Button
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                Enviar código
              </Button>
            </FormRow>

            
            <FormRow>
                <p className="login__create-account-text">
                    Volver al
                    <Link to={authPath.login} className="login__create-account-link">
                    <span> inicio de sesión</span>
                    </Link>
                </p>
            </FormRow>
          </>
        )}

        {/* STEP 2 → OTP + PASSWORD */}
        {step === 2 && (
          <>
            <FormRow>
              <p className="login__create-account-text">
                Ingresa el código que enviamos a tu correo
              </p>

              <OTPInput
                value={form.code}
                onChange={(val) =>
                  setForm({ ...form, code: val })
                }
              />
            </FormRow>

            <FormRow>
              <Input
                label="Nueva contraseña"
                type="password"
                placeholder="*******"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </FormRow>

            <FormRow>
              <Button
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  // aquí validas OTP + cambias password
                }}
              >
                Actualizar contraseña
              </Button>
            </FormRow>

            {/* volver */}
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
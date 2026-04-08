import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";
import { authPath } from "../../../shared/constants/paths";

import { register } from "../../services/auth.services";
import { useSnackbar } from "@context/snackbar.context";

import "./style.css";
import { validateRegister } from "../../utils/auth";

export const RegisterPage = () => {
    
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const  [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });

        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateRegister(form);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...payload } = form;

            await register(payload);

            navigate(authPath.login, {
            state: {
                message: "Cuenta creada correctamente, por favor verificala",
                type: "success",
            },
            });

        } catch (err) {

            const status = err.response?.status;
            const message = err.response?.data?.message;

            if (status === 409) {
                showSnackbar(err.response.data.message || "usuario o email ya existen", "error");
            } else {
                showSnackbar(message || "Error al registrarse", "error");
            }
        }
    };

    return(
        <section className="login register">
            <form className="register__form" onSubmit={handleSubmit}>                
                <FormRow>
                    <h2 className="login__title">Crear Cuenta</h2>
                </FormRow>
                <FormRow columns={2}>
                    <Input 
                        label="Nombre"
                        placeholder="Juan papas"
                        value={form.name}
                        onChange={handleChange("name")}
                        error={errors.name}
                    />
                    <Input 
                        label="Apellido"
                        placeholder="Tu apellido"
                        value={form.lastName}
                        onChange={handleChange("lastName")}
                        error={errors.lastName}
                    />
                </FormRow>
                <FormRow>
                    <Input 
                        label="Nombre de usuario"
                        placeholder="pepe_picas_xd"
                        value={form.username}
                        onChange={handleChange("username")}
                        error={errors.username}
                    />
                </FormRow>
                <FormRow>
                    <Input 
                        label="Email"
                        placeholder="example@example.com"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        error={errors.email}
                    />
                </FormRow>
                <FormRow columns={2}>
                    <Input 
                        label="Contraseña"
                        type="password"
                        value={form.password}
                        onChange={handleChange("password")}
                        error={errors.password}
                    />
                    <Input 
                        label="Confirma Contraseña"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        error={errors.confirmPassword}
                    />
                </FormRow>
                <FormRow>
                    <Button size="lg" type="submit">Crear Cuenta</Button>
                </FormRow>
                <FormRow>
                    <p className="login__create-account-text">
                        ¿Tienes una cuenta? 
                        <Link to={authPath.login} className="login__create-account-link">
                            <span> Inicia sessión</span>
                        </Link>
                    </p>
                </FormRow>
            </form>
        </section>
    )
}
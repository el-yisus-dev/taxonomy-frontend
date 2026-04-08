import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";
import { authPath, taxonsPath } from "@shared/constants/paths";
import { useSnackbar } from "@context/snackbar.context";
import { useAuth } from "@context/auth.context";

import { login } from "../../services/auth.services";
import { validateLogin } from "../../utils/auth";

import "./style.css";

export const LoginPage = () => {
    
    const [form, setForm] = useState({
        identifier: "",
        password: ""
    })

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { login: loginUser } = useAuth();
    
    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateLogin(form);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const res = await login(form);

            const { accessToken, user } = res.data.data;

            loginUser(user, accessToken);

            showSnackbar("Login exitoso", "success");

            navigate(taxonsPath.home);

        } catch (err) {
            const message =
            err.response?.data?.message || "Error al iniciar sesión";

            showSnackbar(message, "error");
        }
    };

    return(
        <section className="login">
            <form
            className="login__form"
            onSubmit={handleSubmit}
            >               
                <FormRow>
                    <h2 className="login__title">Iniciar sessión</h2>
                </FormRow>
                <FormRow>
                    <Input 
                        label="Identificador"
                        placeholder="Correo o nombre de usuario"
                        value={form.identifier}
                        onChange={handleChange("identifier")}
                        error={errors.identifier}
                    />
                    
                </FormRow>

                <FormRow>
                    <Input 
                        label="Contraseña"
                        placeholder="*******"
                        type="password"
                        value={form.password}
                        onChange={handleChange("password")}
                        error={errors.password}

                    />
                </FormRow>
                <FormRow colums={2}>
                    <Link to={authPath.forgetPassword} className="login__forget-password">
                        <p className="login__forget-password">¿Olvidaste tu contraseña?</p>
                    </Link>
                </FormRow>
                <FormRow>
                    <Button size="lg" type="submit">
                        Iniciar sessión
                    </Button>                
                </FormRow>
                <FormRow>
                    <p className="login__create-account-text">
                        ¿No tienes una cuenta? 
                        <Link to={authPath.register} className="login__create-account-link">
                            <span> Crear una</span>
                        </Link>
                    </p>
                </FormRow>
            </form>
        </section>
    )
}
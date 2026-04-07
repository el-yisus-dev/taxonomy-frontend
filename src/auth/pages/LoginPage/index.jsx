import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";

import "./style.css";

export const LoginPage = () => {
    
    const [form, setForm] = useState({
        identifier: ""
    })

    return(
        <section className="login">
            <form className="login__form">
                <FormRow>
                    <h2 className="login__title">Iniciar sessión</h2>
                </FormRow>
                <FormRow>
                    <Input 
                        label="Identidicador"
                        placeholder="Tu correo o nombre de usuario"                    
                    />
                </FormRow>
                <FormRow>
                    <Input 
                        label="Contraseña"
                        placeholder="*******"
                        type="password"                    
                    />
                </FormRow>
                <FormRow colums={2}>
                    <Link to="forget-password" className="login__forget-password">
                        <p className="login__forget-password">¿Olvidaste tu contraseña?</p>
                    </Link>
                </FormRow>
                <FormRow>
                    <Button>Iniciar sessión</Button>
                </FormRow>
                <FormRow>
                    <p className="login__create-account-text">
                        ¿No tienes una cuenta? 
                        <Link to="/register" className="login__create-account-link">
                            <span> Crea una</span>
                        </Link>
                    </p>
                </FormRow>
            </form>
        </section>
    )
}
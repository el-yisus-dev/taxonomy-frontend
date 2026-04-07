import { useState } from "react";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";

import "./style.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    
    const [form, setForm] = useState({
        identifier: ""
    })

    return(
        <section className="login">
            <form className="login__form">
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
                    <Link to="forget-password">
                    ¿Olvidaste tu contraseña?
                </Link>
                </FormRow>
                <FormRow>
                    <Button>Iniciar sessión</Button>
                </FormRow>
                <FormRow>
                    <p>No tienes una cuenta</p>
                    <Link to="/register">
                        <p>Crea una</p>
                    </Link>
                </FormRow>
            </form>
        </section>
    )
}
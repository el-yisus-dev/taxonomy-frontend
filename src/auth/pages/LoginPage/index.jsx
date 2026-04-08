import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";

import "./style.css";
import { authPath } from "../../../shared/constants/paths";

export const LoginPage = () => {
    
    const [form, setForm] = useState({
        identifier: "",
        password: ""
    })


    return(
        <section className="login">
            <form className="login__form">
                <FormRow>
                    <h2 className="login__title">Iniciar sessión</h2>
                </FormRow>
                <FormRow>
                    <Input 
                        label="Identificador"
                        placeholder="Correo o nombre de usuario"                    
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
                    <Link to={authPath.forgetPassword} className="login__forget-password">
                        <p className="login__forget-password">¿Olvidaste tu contraseña?</p>
                    </Link>
                </FormRow>
                <FormRow>
                    <Button size="lg">Iniciar sessión</Button>
                </FormRow>
                <FormRow>
                    <p className="login__create-account-text">
                        ¿No tienes una cuenta? 
                        <Link to={authPath.register} className="login__create-account-link">
                            <span> Crea una</span>
                        </Link>
                    </p>
                </FormRow>
            </form>
        </section>
    )
}
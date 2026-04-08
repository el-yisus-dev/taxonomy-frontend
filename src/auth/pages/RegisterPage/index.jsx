import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@shared/Button";
import FormRow from "@shared/FormRow";
import Input from "@shared/Input";
import { authPath } from "../../../shared/constants/paths";

import "./style.css";

export const RegisterPage = () => {
    
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        email: "",
    })

    
    return(
        <section className="login register">
            <form className="register__form">
                <FormRow>
                    <h2 className="login__title">Crear Cuenta</h2>
                </FormRow>
                <FormRow columns={2} className="login__field-responsive">
                    <Input 
                        label="Nombre"
                        placeholder="Juan papas"                    
                    />
                    <Input 
                        label="Apellido"
                        placeholder="Tu apellido"
                    />
                </FormRow>
                <FormRow>
                    <Input 
                        label="Nombre de usuario"
                        placeholder="pepe_picas_xd"
                    />
                </FormRow>
                <FormRow>
                    <Input 
                        label="Email"
                        placeholder="example@example.com"
                        type="email"
                    />
                </FormRow>
                <FormRow columns={2}>
                    <Input 
                        label="Contraseña"
                        placeholder="******"                    
                    />
                    <Input 
                        label="Confirma Contraseña"
                        placeholder="*****"
                    />
                </FormRow>
                <FormRow>
                    <Button size="lg">Crear Cuenta</Button>
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
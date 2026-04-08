import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./auth/pages/LoginPage";
import { ResetPasswordPage } from "./auth/pages/ForgetPasswordPage";
import { RegisterPage } from "./auth/pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/forget-password",
        element: <ResetPasswordPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "*",
        element: <RegisterPage />
    }
])


export default router;
import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./auth/pages/LoginPage";
import { ResetPasswordPage } from "./auth/pages/ForgetPasswordPage";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { VerifyEmailPage } from "./auth/pages/VerifyAccountPage";

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
        path: "/verify-email",
        element: <VerifyEmailPage />,
    },
    {
        path: "/home",
        element: <RegisterPage />
    }
])


export default router;
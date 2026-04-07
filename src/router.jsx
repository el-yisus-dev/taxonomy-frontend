import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./auth/pages/LoginPage";
import { ForgetPasswordPage } from "./auth/pages/ForgetPasswordPage";
import { RegisterPage } from "./auth/pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/forget-password",
        element: <ForgetPasswordPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
])


export default router;
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./auth/pages/LoginPage";

const router = createBrowserRouter([{
    path: "/",
    element: <LoginPage />
}])


export default router;
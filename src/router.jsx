import { createBrowserRouter, Navigate } from "react-router-dom";

import { LoginPage } from "./auth/pages/LoginPage";
import { ResetPasswordPage } from "./auth/pages/ForgetPasswordPage";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { VerifyEmailPage } from "./auth/pages/VerifyAccountPage";

import { HomeLayout } from "./taxa/pages/HomeLayout";
import { MapaPage } from "./taxa/pages/Map";
import { HomePage } from "./taxa/pages/HomePage";
import { RegistrosPage } from "./taxa/pages/RegisterPage";
import { ExplorarPage } from "./taxa/pages/Explorer";

import ProtectedRoute from "@shared/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />
  },
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
    element: <VerifyEmailPage />
  },

  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "explorar",
        element: <ExplorarPage />
      },
      {
        path: "mapa",
        element: <MapaPage />
      },
      {
        path: "registros",
        element: <RegistrosPage />
      }
    ]
  }
]);

export default router;
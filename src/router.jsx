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
import { CreateObservationPage } from "./taxa/pages/AddObservation";

import ProtectedRoute from "@shared/ProtectedRoute";
import { CreateTaxaPage } from "./taxa/pages/Createtaxa";
import { Errorpage404 } from "@shared/ErrorPage"
import { TaxonDetailPage } from "./taxa/pages/TaxaDetailPage";

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
    path: "*",
    element: <Errorpage404 />
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
      },
      {
        path: "observations/create",
        element: <CreateObservationPage />
      },  
      {
        path: "taxons/create",
        element: <CreateTaxaPage />
      }
      },
      {
        path: "taxons/:id",
        element: <TaxonDetailPage />
      },
    ]
  }
]);

export default router;
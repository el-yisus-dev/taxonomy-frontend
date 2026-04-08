import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";

import { SnackbarProvider } from "@context/snackbar.context";
import { AuthProvider } from "@context/auth.context";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
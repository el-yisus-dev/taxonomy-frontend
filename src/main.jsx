import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";

import { SnackbarProvider } from "@context/snackbar.context";
import { AuthProvider } from "@context/auth.context";
import { ThemeProvider } from "@context/darkLighit.context"; 

import "./index.css";
import "./style.css";

import 'boxicons/css/boxicons.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider> 
      <AuthProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
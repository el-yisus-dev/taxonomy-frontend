import { api } from "../../services/api";

// login
export const login = (data) => {
  return api.post("auth/login", data);
};

// pedir OTP (forgot password)
export const requestPasswordReset = (email) => {
  return api.post("auth/forgot-password", { email });
};

// validar OTP + cambiar password
export const resetPassword = ({ code, password, email }) => {
  return api.post("auth/reset-password", {
    code,
    password,
    email,
  });
};
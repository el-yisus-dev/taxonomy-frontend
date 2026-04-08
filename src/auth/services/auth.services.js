import { api } from "../../services/api";

export const login = (data) => {
  return api.post("auth/login", data);
};

export const register = (data) => {
  return api.post("users", data);
};

export const requestPasswordReset = (email) => {
  return api.post("auth/forgot-password", { email });
};

export const resetPassword = ({ code, password, email }) => {
  return api.post("auth/reset-password", {
    code,
    password,
    email,
  });
};
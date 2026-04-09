import { api } from "../../services/api";

export const login = (data) => {
  return api.post("auth/login", data);
};

export const register = (data) => {
  return api.post("users", data);
};

export const verifyAccount = (token) => {
  return api.get(`auth/email-verification/confirm?token=${token}`);
}
export const resendVerification = (data) => {
  return api.post("auth/email-verification/resend", data)
}

export const requestPasswordReset = (email) => {
  return api.post("auth/password-reset/request", { email });
};

export const resetPassword = ({ code, password, email }) => {
  return api.post("auth/password-reset/confirm", {
    code,
    password,
    email,
  });
};

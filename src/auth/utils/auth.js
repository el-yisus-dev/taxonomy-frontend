export function validateLogin(form) {
  const newErrors = {};

  if (!form.identifier.trim()) {
    newErrors.identifier = "El login o email obligatorio";
  }

  if (!form.password.trim()) {
    newErrors.password = "La contraseña es obligatoria";
  }

  return newErrors;
}
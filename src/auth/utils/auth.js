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

export function validateRegister(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "El apellido es obligatorio";
  }

  if (!form.username.trim()) {
    errors.username = "El username es obligatorio";
  }

  if (!form.email.trim()) {
    errors.email = "El email es obligatorio";
  }

  if (!form.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (form.password.length < 6) {
    errors.password = "Mínimo 6 caracteres";
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}
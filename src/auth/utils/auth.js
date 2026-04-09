export const validateLogin = (form) => {
  const newErrors = {};

  if (!form.identifier.trim()) {
    newErrors.identifier = "El login o email obligatorio";
  }

  if (!form.password.trim()) {
    newErrors.password = "La contraseña es obligatoria";
  }

  return newErrors;
}

export const validateRegister = (form) => {
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

export const validateEmail = (form) => {
  const newErrors = {};

  if (!form.email.trim()) {
    newErrors.email = "Email obligatorio";
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Email inválido";
  }

  return newErrors
} 

export const validateUpdatePassword = (form) => {
  const newErrors = {};

  if (!form.code) {
      newErrors.code = "El código es requerido";
    }

  if (!form.password || form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
  }

  return newErrors;
}
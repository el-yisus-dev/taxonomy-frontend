# 🌿 Taxonomy Frontend

Frontend for the **Taxonomy** platform — a web application focused on managing, exploring, and validating biological taxons.

Built with **React + Vite**, following a **feature-based architecture** to ensure scalability and maintainability.

---

## 🚀 Tech Stack

- React
- Vite
- React Router DOM
- Context API (state management)
- Axios (HTTP client)
- CSS (component-scoped styles)

---

## 🧠 Architecture

This project follows a **feature-based architecture**, organizing code by domain instead of technical type.

### 📂 Project Structure

```bash
    src/
│
├── auth/ # Authentication feature
│ ├── components/ # Feature-specific components (e.g. OTPInput)
│ ├── pages/ # Pages (Login, Register, Verify, etc.)
│ ├── services/ # API calls related to auth
│ └── utils/ # Validation and helpers
│
├── taxa/ # Taxa feature
│ ├── components/
│ └── pages/
│
├── shared/ # Reusable UI components
│ ├── Button/
│ ├── Input/
│ ├── FormRow/
│ ├── Card/
│ ├── SnackBar/
│ └── ProtectedRoute/
│
├── context/ # Global state (Auth, Snackbar)
│
├── services/ # API base configuration (axios instance)
│
├── config/ # App configuration
│
├── router.jsx # Routes definition
├── main.jsx # Entry point
└── index.css # Global styles
```

---

## 🔐 Authentication

Includes a complete authentication flow:

- User registration
- Login
- Email verification
- Resend verification email
- Password recovery (OTP + reset)

Error handling follows a consistent pattern:

- Local validation
- API error handling
- Global feedback via Snackbar

---

## 📡 API Communication

Uses a centralized Axios instance (`services/api.js`).

Example:

```js
api.post("auth/login", data);
```
## 🎨 UI & UX
- Reusable UI components (shared/)
- Consistent form error handling
- Snackbar-based user feedback
- Step-based flows (e.g. verification, password reset)

## Clone the repository
```
git clone https://github.com/el-yisus-dev/taxonomy-frontend
```

## Install dependencies
``` npm install ```
## Run development server
``` npm run dev ```
import { createContext, useContext, useState } from "react";
import Snackbar from "../shared/SnackBar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
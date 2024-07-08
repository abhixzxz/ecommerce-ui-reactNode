import React, { createContext, useState, useContext, useCallback } from "react";
import "./snackbar.css";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    open: false,
  });

  const showSnackbar = useCallback((open, type, message) => {
    setSnackbar({ open, type, message });
    if (open) {
      setTimeout(
        () => setSnackbar({ open: false, type: "", message: "" }),
        3000
      );
    }
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackbar.open && (
        <div className={`snackbar snackbar-${snackbar.type}`}>
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

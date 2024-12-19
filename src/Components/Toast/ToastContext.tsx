// ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertColor } from '@mui/material';
import Toast from './Toast'; // Adjust import path as necessary

type ToastContextType = {
  showMessage: (message: string, type: AlertColor) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<AlertColor>('success');

  const showMessage = (message: string, type: AlertColor) => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const handleClose = () => setToastOpen(false);

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}
      <Toast
        open={toastOpen}
        message={toastMessage}
        type={toastType}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
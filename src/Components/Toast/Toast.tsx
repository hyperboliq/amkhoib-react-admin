// Toast.tsx

import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type ToastProps = {
  open: boolean;
  message: string;
  type: AlertColor; // 'success', 'error', 'info', 'warning'
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ open, message, type, onClose }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#39bc5e';
      case 'error':
        return '#f44336'; // Default red for errors
      case 'warning':
        return '#ff9800'; // Default yellow for warnings
      default:
        return undefined;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={type}
        icon={<CheckCircleIcon fontSize="inherit" sx={{ color: 'white' }} />} // White icon
        sx={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: getBackgroundColor(),
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
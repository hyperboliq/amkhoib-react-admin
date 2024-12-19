import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps, styled } from '@mui/material';
import { useInput } from 'react-admin'; // Importing necessary hooks from react-admin

interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  label: string;
  source: string; // Add the source prop to your custom TextField
  style?: React.CSSProperties; // Add a style prop
}

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#e8eff9', // Default background
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color']),
    '&:hover': {
      backgroundColor: theme.palette.grey[50], // Optional lighter background on hover
    },
    '&.Mui-focused': {
      backgroundColor: '#e8eff9', // Focused background color
      boxShadow: 'none', // No shadow on focus
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent', // Default border color
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent !important', // Force hover border to stay transparent
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent', // Focused state border color
  },
  '& .MuiInputLabel-outlined': {
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: theme.palette.text.secondary, // Keep label color consistent on focus
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1.5),
  },
}));

// Custom TextField that works with react-admin form
export const TextField: React.FC<TextFieldProps> = ({ label, source, style, ...props }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useInput({ source }); // Using react-admin's useInput hook to manage form state

  return (
    <StyledTextField
      label={label}
      variant="outlined"
      fullWidth
      value={value || ''}
      onChange={onChange}
      error={!!error}
      helperText={error?.message}
      style={style} // Apply the style prop
      {...props}
    />
  );
};
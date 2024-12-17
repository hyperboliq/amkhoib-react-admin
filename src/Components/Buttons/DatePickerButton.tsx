import React from 'react';
import { TextField, InputAdornment, styled } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#e8eff9',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color']),
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
    '&.Mui-focused': {
      backgroundColor: '#e8eff9',
      boxShadow: 'none',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent !important',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputLabel-outlined': {
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1.5),
  },
}));

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  return (
    <StyledTextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      InputProps={{
        // startAdornment: (
        //   <InputAdornment position="start">
        //     <CalendarToday />
        //   </InputAdornment>
        // ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DatePicker;
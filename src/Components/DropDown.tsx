import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, styled } from '@mui/material';

interface DropDownProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
  sx?: object; // Add the sx prop
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
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
  // Match the height and padding of the TextField
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1.5), // Match the padding of the TextField
  },
}));

const DropDown: React.FC<DropDownProps> = ({ label, value, onChange, options, sx }) => {
  return (
    <StyledFormControl fullWidth variant="outlined" sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default DropDown;
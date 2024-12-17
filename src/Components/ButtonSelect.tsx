import React, { ReactNode, useState } from 'react';
import { Box, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface ButtonSelectProps {
  options: { label: ReactNode; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

// Styled components (similar to TabBar)
const StyledButtonGroup = styled(Box)({
  display: 'flex',
  gap: '8px',
});

const StyledButton = styled(Box)(({ theme }) => ({
  padding: '5px 16px',
  borderRadius: '20px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  color: '#165685',
  backgroundColor: '#deeaf6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: '#e0effa',
  },
  '&.selected': {
    color: theme.palette.primary.main,
    backgroundColor: '#f5f9fa',
    border: '2px solid #b6d2e7',
  },
}));

const CheckIconWrapper = styled('span')({
  display: 'inline-flex',
  marginRight: '4px',
  alignItems: 'center',
});

export const ButtonSelect = ({ options, selectedValue, onChange }: ButtonSelectProps) => {
  return (
    <StyledButtonGroup>
      {options.map((option) => (
        <StyledButton
          key={option.value}
          className={selectedValue === option.value ? 'selected' : ''}
          onClick={() => onChange(option.value)}
        >
          {selectedValue === option.value && (
            <CheckIconWrapper>
              <CheckIcon sx={{ fontSize: 18 }} />
            </CheckIconWrapper>
          )}
          {option.label}
        </StyledButton>
      ))}
    </StyledButtonGroup>
  );
};
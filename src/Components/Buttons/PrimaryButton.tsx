import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  backgroundColor: '#005eb8',  // Similar to the blue in your image
  color: '#ffffff',  // White text
  borderRadius: '8px',  // Rounded corners
  padding: '8px 16px',
  textTransform: 'none',  // Normal case text
  '&:hover': {
    backgroundColor: '#004a99',  // Slightly darker on hover
  },
});

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick }) => (
  <StyledButton variant="contained" onClick={onClick}>
    {label}
  </StyledButton>
);

export default PrimaryButton;
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  borderColor: '#005eb8',  // Blue border
  color: '#005eb8',  // Blue text
  borderRadius: '8px',  // Rounded corners
  padding: '8px 16px',
  textTransform: 'none',  // Normal case text
  '&:hover': {
    borderColor: '#004a99',  // Slightly darker on hover
    backgroundColor: 'rgba(0, 94, 184, 0.1)',  // Light blue background on hover
  },
});

interface SecondaryButtonProps {
  label: string;
  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick }) => (
  <StyledButton variant="outlined" onClick={onClick}>
    {label}
  </StyledButton>
);

export default SecondaryButton;
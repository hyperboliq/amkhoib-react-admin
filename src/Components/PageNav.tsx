import React from 'react';
import { Box, Typography, IconButton, Button, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface PageNavProps {
  title: string;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
}

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 24px',
  backgroundColor: 'transparent',
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#111827',
  flex: 1,
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  color: '#111827',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const PageNav = ({ title, onBack, onNext, isNextDisabled = false }: PageNavProps) => {
  return (
    <NavContainer>
      <BackButton onClick={onBack} size="small">
        <ChevronLeftIcon sx={{ fontSize: '40px', color: '#b8bbc2' }} />
      </BackButton>
      <Title variant="h6">{title}</Title>
    </NavContainer>
  );
};

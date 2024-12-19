import React from 'react';
import { Box, Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

// Custom Connector Component
const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    display: 'none', // Hide the connector line
  },
}));

// Custom Step Icon Component
const QontoStepIconRoot = styled('div')(() => ({
  display: 'none', // Hide the step icons
}));

function QontoStepIcon() {
  return null;
}

interface StepperProps {
  activeStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ activeStep, steps }) => {
  return (
    <MuiStepper 
      activeStep={activeStep} 
      alternativeLabel 
      connector={<QontoConnector />}
      sx={{ 
        background: 'transparent', 
        '& .MuiStepLabel-label': { 
          color: 'transparent' 
        } 
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};

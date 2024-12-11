// CustomSaveButton.tsx
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { SaveButton, ButtonProps } from 'react-admin';

const CustomSaveButton: React.FC<ButtonProps> = (props) => (
    <SaveButton
        icon={<SaveIcon />}     // Custom icon
        color="primary"         // Color customization
        variant="contained"     // Custom variant
        fullWidth               // Makes the button take 100% width of the parent
        {...props}              // Spread other props to allow overrides
    />
);

export default CustomSaveButton;
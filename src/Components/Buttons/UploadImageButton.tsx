import React, { ChangeEvent } from 'react';
import { Button, styled } from '@mui/material';
import { FileUpload as UploadIcon } from '@mui/icons-material';

interface UploadImageProps {
  onImageUpload?: (file: File) => void;
}

const StyledButton = styled(Button)<{ component?: React.ElementType }>(({ theme }) => ({
  border: '1px solid #005c9e',
  borderRadius: '8px',
  color: '#005c9e',
  textTransform: 'none',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 500,
  '& .MuiButton-startIcon': {
    marginRight: '8px',
  },
}));

const HiddenInput = styled('input')({
  display: 'none',
});

export const UploadImageButton = ({ onImageUpload }: UploadImageProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <label htmlFor="upload-image">
      <HiddenInput
        accept="image/*"
        id="upload-image"
        type="file"
        onChange={handleFileChange}
      />
      <StyledButton
        variant="outlined"
        component="span"
        startIcon={<UploadIcon />}
      >
        Upload logo
      </StyledButton>
    </label>
  );
};


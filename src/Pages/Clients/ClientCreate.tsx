import React, { useState } from 'react';
import { Create, SimpleForm, ReferenceInput, SelectInput } from 'react-admin';
import { TextField } from '../../Components/TextField';
import { Tab, Box } from '@mui/material';
import { TabBar } from '../../Components/TabBar';
import { UploadImageButton } from '../../Components/Buttons/UploadImageButton';
import { PageNav } from '../../Components/PageNav';
import { useNavigate } from 'react-router-dom';

export const ClientCreate = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Add this
  
  const handleImageUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Create>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '24px',
          }}
        >
           <PageNav
              title="What are your client details?"
              onBack={handleBack}
            />
          <SimpleForm>
            <Box sx={{ width: '100%', marginBottom: '24px' }}>
              <TabBar value={value} onChange={handleChange}>
                <Tab label="Principal Contractor" />
                <Tab label="Contractor" />
              </TabBar>
            </Box>

            {value === 0 && (
              <>
                <TextField source="name" label="Company legal name" />
                <TextField source="physical_address" label="Street" />
                <TextField source="suburb" label="Suburb" />
                <TextField source="city" label="City" />
                <TextField source="province" label="Province" sx={{ width: '50%' }} />
                {/* <TextField source="logo_url" label="Logo URL" /> */}
                <Box sx={{ marginTop: '16px' }}>
                  <UploadImageButton onImageUpload={handleImageUpload} />
                </Box>
              </>
            )}

            {value === 1 && (
              <>
                <TextField source="contact_number" label="Contact Number" />
                <ReferenceInput source="client_representative_id" reference="users" label="Client Representative">
                  <SelectInput optionText={(record: any) => `${record.first_name} ${record.last_name}`} />
                </ReferenceInput>
              </>
            )}
          </SimpleForm>
        </Box>
      </Box>
    </Create>
  );
};


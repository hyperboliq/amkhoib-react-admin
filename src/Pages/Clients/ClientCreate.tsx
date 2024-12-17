import React, { useState } from 'react';
import { Create, SimpleForm } from 'react-admin';
import { TextField } from '../../Components/TextField';
import { Box } from '@mui/material';
import { ButtonRadioSelect } from '../../Components/ButtonRadioSelect';
import { UploadImageButton } from '../../Components/Buttons/UploadImageButton';
import { PageNav } from '../../Components/PageNav';
import { useNavigate } from 'react-router-dom';
import { MainPopup } from '../../Components/MainPopup';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import supabaseClient from '../../supabaseClient'; // Ensure this is imported

export const ClientCreate = () => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [clientTypeId, setClientTypeId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [physicalAddress, setPhysicalAddress] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');

  const handleImageUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handleOnSave = async () => {
    // Save client data to the database
    const { error } = await supabaseClient.from('clients').insert({
      client_type_id: clientTypeId,
      name,
      physical_address: physicalAddress,
      suburb,
      city,
      province,
    });

    if (error) {
      console.error('Error saving client:', error);
    } else {
      console.log('Client saved successfully');
      setPopupOpen(true); // Show popup when save is successful
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    // Optionally navigate somewhere if needed
  };

  const handleCreateProject = () => {
    // Navigate to the project create page
    navigate('/projects/create');
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
            onSave={handleOnSave}
          />
          <SimpleForm toolbar={false}>
          <ButtonRadioSelect
            source="client_type_id"
            reference="client_types"
            value={clientTypeId}
            onChange={(newValue) => setClientTypeId(newValue)}
          />
            <TextField
              source="name"
              label="Company legal name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              source="physical_address"
              label="Street"
              value={physicalAddress}
              onChange={(e) => setPhysicalAddress(e.target.value)}
            />
            <TextField
              source="suburb"
              label="Suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />
            <TextField
              source="city"
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              source="province"
              label="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              sx={{ width: '50%' }}
            />

            <Box sx={{ marginTop: '16px' }}>
              <UploadImageButton onImageUpload={handleImageUpload} />
            </Box>
          </SimpleForm>
        </Box>
      </Box>

      {/* MainPopup to confirm project creation */}
      <MainPopup
        open={popupOpen}
        onClose={handlePopupClose}
        title="Save Successful"
        subtitle="Would you like to Create A Project?"
      >
        <Box
          display="flex"
          justifyContent="center"
          gap={2} // Adds spacing between the buttons
          mt={2} // Margin top
        >
          <SecondaryButton label="No, skip" onClick={handlePopupClose} />
          <PrimaryButton label="Add Project" onClick={handleCreateProject} />
        </Box>
      </MainPopup>
    </Create>
  );
};

export default ClientCreate;
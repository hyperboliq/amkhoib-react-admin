// ClientCreate.tsx
import React, { useEffect, useState } from 'react';
import { Create, SimpleForm } from 'react-admin';
import { TextField } from '../../Components/TextField';
import { Box } from '@mui/material';
import { ButtonRadioSelect } from '../../Components/Buttons/ButtonRadioSelect';
import { UploadImageButton } from '../../Components/Buttons/UploadImageButton';
import { PageNav } from '../../Components/PageNav';
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../supabaseClient'; 
import { useToast } from '../../Components/Toast/ToastContext';
import DropDown from '../../Components/DropDown';

interface Province {
  id: string;
  province_name: string;
}


const ClientCreate = () => {
  const navigate = useNavigate();
  const { showMessage } = useToast(); // Use the context

  const [clientTypeId, setClientTypeId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [physicalAddress, setPhysicalAddress] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);

  const handleImageUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

  const handleBack = () => {
    navigate(-1); 
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const { data, error } = await supabaseClient.from('provinces').select('id, province_name');

      if (error) {
        console.error('Error fetching provinces:', error);
        return;
      }

      setProvinces(data); // Set the provinces data
    };

    fetchProvinces();
  }, []);

  const handleOnSave = async () => {
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
      showMessage('Your client has been added successfully', 'success'); // Use the context to show the message
      navigate('/clients');
    }
  };

  return (
    <Create resource="clients">
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
            saveButtonText="Add client"
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
            <DropDown
                label="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                options={provinces.map((p) => ({ value: p.id, label: p.province_name }))}
                sx={{ width: '50%' }}
              />

            <Box sx={{ marginTop: '16px' }}>
              <UploadImageButton onImageUpload={handleImageUpload} />
            </Box>
          </SimpleForm>
        </Box>
      </Box>
    </Create>
  );
};

export default ClientCreate;
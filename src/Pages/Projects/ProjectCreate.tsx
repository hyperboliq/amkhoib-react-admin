import React, { useState, useEffect } from 'react';
import { Create, SimpleForm } from 'react-admin';
import { Box, Button } from '@mui/material';
import { TextField } from '../../Components/TextField'; // Custom TextField component
import { PageNav } from '../../Components/PageNav'; // Page navigation component
import { useNavigate } from 'react-router-dom';
import DatePicker from '../../Components/Buttons/DatePickerButton'; // Custom DatePicker
import DropDown from '../../Components/DropDown';
import supabaseClient from '../../supabaseClient';

export const ProjectCreate = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [clients, setClients] = useState<{ value: string; label: string }[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabaseClient
        .from('clients')
        .select('id, name');

      if (error) {
        console.error('Error fetching clients:', error);
        return;
      }

      setClients(data.map((client: any) => ({
        value: client.id,
        label: client.name,
      })));
    };

    fetchClients();
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handleOnSave = async () => {
    const { error } = await supabaseClient
      .from('projects')
      .insert({
        name: projectName,
        assigned_client_id: selectedClient,
        planned_start_date: startDate,
        planned_end_date: endDate,
        location,
        street,
        suburb,
        city,
        province,
      });

    if (error) {
      console.error('Error saving project:', error);
      return;
    }

    console.log('Form Saved');
    navigate(-1); // Redirect after saving
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
            title="What are your project details?"
            onBack={handleBack}
            onSave={handleOnSave}
          />
          <SimpleForm toolbar={false}>
            <TextField
              source="name"
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <DropDown
              label="Project Owner"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              options={clients}
            />
            <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
              <DatePicker
                label="Planned start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <DatePicker
                label="Planned end date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
            <TextField
              source="location"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              source="street"
              label="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
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
            />
            {/* <Button onClick={handleOnSave} variant="contained" color="primary">
              Save Project
            </Button> */}
          </SimpleForm>
        </Box>
      </Box>
    </Create>
  );
};

export default ProjectCreate;
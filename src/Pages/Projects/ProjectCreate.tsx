import React, { useState, useEffect } from 'react';
import { Create, SimpleForm } from 'react-admin';
import { Box, Grid, CircularProgress } from '@mui/material';
import { TextField } from '../../Components/TextField';
import { PageNav } from '../../Components/PageNav';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../../Components/Buttons/DatePickerButton';
import DropDown from '../../Components/DropDown';
import supabaseClient from '../../supabaseClient';
import { useToast } from '../../Components/Toast/ToastContext';
import { Stepper } from '../../Components/Stepper';
import { SearchBox } from '../../Components/SearchBox';
import { ProjectClientListCard } from '../../Components/ProjectClientListCard';

// Steps for the stepper
const steps = ['Are any of these your client?', 'What are your project details?'];

interface Client {
  value: string;
  label: string;
  logo_url: string | null;
}

export const ProjectCreate = () => {
  const navigate = useNavigate();
  const { showMessage } = useToast();

  const [activeStep, setActiveStep] = useState(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [projectOwner, setProjectOwner] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabaseClient.from('clients').select('id, name, logo_url');

      if (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
        return;
      }

      const clientsData = data.map((client: any) => ({
        value: client.id,
        label: client.name,
        logo_url: client.logo_url,
      }));
      setClients(clientsData);
      setFilteredClients(clientsData);
      setLoading(false);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) =>
      client.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOnSave = async () => {
    const { error } = await supabaseClient.from('projects').insert({
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
    } else {
      console.log('Project saved successfully');
      showMessage('Your project has been added successfully', 'success');
      navigate('/projects');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Wrap the SearchBox in a Box for centering and padding */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0 16px', // Add padding to prevent stretching to the ends
              }}
            >
              <SearchBox
                placeholder="Search clients"
                fullWidth
                onSearch={(query) => setSearchTerm(query)}
                sx={{ maxWidth: '500px' }} // Limit the width of the SearchBox
              />
            </Box>
            <Grid container spacing={2}>
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '200px',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                filteredClients.map((client) => (
                  <Grid item xs={12} sm={6} md={4} key={client.value}>
                    <ProjectClientListCard
                      title={client.label}
                      subtitle=""
                      imageUrl={client.logo_url || 'https://via.placeholder.com/80'}
                      onClick={() => {
                        setSelectedClient(client.value);
                        handleNext();
                      }}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                        border:
                          selectedClient === client.value
                            ? '2px solid #015fa4'
                            : '1px solid #e0e0e0',
                      }}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        );
      case 1:
        return (
          <>
            <TextField
              source="name"
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <TextField
              source="project_owner"
              label="Project Owner"
              value={projectOwner}
              onChange={(e) => setProjectOwner(e.target.value)}
            />
            <TextField
              source="client"
              label="Selected Client"
              value={clients.find((c) => c.value === selectedClient)?.label || ''}
              disabled
              style={{ display: 'none' }} // Hide the field
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
              sx={{ width: '50%' }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Create resource="projects">
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
            title={steps[activeStep]}
            onBack={handleBack}
            onSave={activeStep === steps.length - 1 ? handleOnSave : undefined}
            saveButtonText={activeStep === steps.length - 1 ? 'Add project' : undefined}
          />
          <Stepper activeStep={activeStep} steps={steps} />
          <SimpleForm toolbar={false}>
            {renderStepContent(activeStep)}
          </SimpleForm>
        </Box>
      </Box>
    </Create>
  );
};

export default ProjectCreate;
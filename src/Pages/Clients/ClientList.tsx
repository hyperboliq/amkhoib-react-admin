import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { ClientListCard } from '../../Components/ClientListCard';
import supabase from '../../supabaseClient';
import { SearchBox } from '../../Components/SearchBox';
import { AddButton } from '../../Components/Buttons/AddButton';
import { useNavigate } from 'react-router-dom';

// Define client
interface Client {
  name: string;
  client_representative_id: string | null;
  logo_url: string | null;
  client_representative?: {
    first_name: string;
    last_name: string;
  };
}

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]); // Use the Client type here
  const [loading, setLoading] = useState(true);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [openPopup, setOpenPopup] = useState(false); // State to control popup visibility
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetch clients data without the representative details
        const { data: clientsData, error: clientsError } = await supabase
          .from('clients')
          .select('name, client_representative_id, logo_url');
        
        if (clientsError) throw clientsError;

        // Now, fetch the user details based on the client_representative_id
        const clientIds = clientsData?.map(client => client.client_representative_id).filter(id => id !== null) as string[];

        if (clientIds.length > 0) {
          const { data: usersData, error: usersError } = await supabase
            .from('users')
            .select('id, first_name, last_name')
            .in('id', clientIds);

          if (usersError) throw usersError;

          // Merge client data with their representative's data
          const clientsWithRepresentatives = clientsData?.map(client => {
            const representative = usersData?.find(user => user.id === client.client_representative_id);
            return {
              ...client,
              client_representative: representative || { first_name: '', last_name: '' }
            };
          });

          setClients(clientsWithRepresentatives || []);
          setFilteredClients(clientsWithRepresentatives || []);
        } else {
          setClients(clientsData || []);
          setFilteredClients(clientsData || []);
        }
      } catch (err) {
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Handle search query and filter clients
  const handleSearch = (query: string) => {
    if (query) {
      const filtered = clients.filter(client =>
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        (client.client_representative?.first_name + ' ' + client.client_representative?.last_name)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  };


  // Handle the "Add New Client" button click
  const handleAddClientButtonClick = () => {
    // Navigate to the '/clients/create' route
    navigate('/clients/create');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        {/* Clients header on the left */}
        <Typography variant="h6">
          Clients
        </Typography>

        {/* SearchBox and AddButton on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchBox onSearch={handleSearch} placeholder="Search" fullWidth={false} />
            {/* Add margin-left to create space between SearchBox and AddButton */}
            <Box sx={{ marginLeft: 2 }}>
                <AddButton onClick={handleAddClientButtonClick} />
            </Box>
        </Box>
    </Box>

      <Grid container spacing={1}>
        {filteredClients.map((client, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ClientListCard 
              title={client.name} 
              subtitle={client.client_representative 
                ? `${client.client_representative.first_name} ${client.client_representative.last_name}` 
                : 'No representative'} 
              imageUrl={client.logo_url || 'https://via.placeholder.com/80'} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

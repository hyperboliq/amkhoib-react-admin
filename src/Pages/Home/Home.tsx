import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { MiniCard } from '../../Components/MiniCard';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import supabaseClient from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchClientsCount = async () => {
      const { count, error } = await supabaseClient
        .from('clients')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching clients count:', error);
      } else {
        setClientsCount(count || 0);
      }
    };

    fetchClientsCount();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      {/* MiniCard for Clients */}
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        onClick={() => navigate('/clients')} // Handle routing when clicked
        sx={{
          cursor: 'pointer', // Make it look clickable
        }}
      >
        <MiniCard
          title="Clients"
          value={clientsCount}
          icon={<CorporateFareRoundedIcon />}
        />
      </Grid>
    </Grid>
  );
};

export default Home;

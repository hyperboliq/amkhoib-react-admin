import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { MiniCard } from '../../Components/MiniCard';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import supabaseClient from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '../../Components/SearchBox'; // Import the SearchBox component
import { AddButton } from '../../Components/Buttons/AddButton'; // Import the AddButton component
import { MainPopup } from '../../Components/MainPopup'; // Import the MainPopup component
import { PopupButton } from '../../Components/Buttons/PopupButton';

const Home = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false); // State to manage popup visibility
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

  // Open the popup
  const handleAddButtonClick = () => {
    setOpenPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handlePopupButtonClick = () => {
    // Navigate to the '/clients/create' route
    navigate('/clients/create');
  };

  // Handle search query and filter clients
  const handleSearch = (query: string) => {
    // You can add your search functionality here
  };

  return (
    <Box sx={{ padding: 3, position: 'relative' }}>
      {/* Header section with "Home" title on the left */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h6">Home</Typography> {/* "Home" text at the left */}
        
        {/* Header section with SearchBox and AddButton aligned to the top-right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchBox onSearch={handleSearch} placeholder="Search" fullWidth={false} />
          <Box sx={{ marginLeft: 2 }}>
            <AddButton onClick={handleAddButtonClick} />
          </Box>
        </Box>
      </Box>

      {/* Grid layout for MiniCards */}
      <Grid
        container
        spacing={3}
        sx={{
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

      {/* MainPopup for adding a new client */}
      <MainPopup
        open={openPopup}
        onClose={handleClosePopup}
        title="What would you like to add?"
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PopupButton
              onClick={handlePopupButtonClick} // This will now navigate to '/clients/create'
              text="New Client"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <PopupButton
              onClick={handlePopupButtonClick} // This will now navigate to '/clients/create'
              text="New Project"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <PopupButton
              onClick={handlePopupButtonClick} // This will now navigate to '/clients/create'
              text="New Person"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <PopupButton
              onClick={handlePopupButtonClick} // This will now navigate to '/clients/create'
              text="New Contractor"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <PopupButton
              onClick={handlePopupButtonClick} // This will now navigate to '/clients/create'
              text="New Master Safety Folder"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <PopupButton
              onClick={handlePopupButtonClick} // This will now navigate to '/clients/create'
              text="New Master Safety File"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </MainPopup>
    </Box>
  );
};

export default Home;

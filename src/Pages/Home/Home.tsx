import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { MiniCard } from '../../Components/MiniCard';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import supabaseClient from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '../../Components/SearchBox';
import { AddButton } from '../../Components/Buttons/AddButton';
import { MainPopup } from '../../Components/MainPopup';
import { EmbeddedComponentPopup } from '../../Components/EmbeddedComponentPopup';
import { PopupButton } from '../../Components/Buttons/PopupButton';
import ClientCreate from '../Clients/ClientCreate';
import ProjectCreate from '../Projects/ProjectCreate'; // Import ProjectCreate
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Home = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setprojectsCount] = useState(0);
  const [usersCount, setusersCount] = useState(0);
  const [documentsCount, setdocumentsCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openClientCreatePopup, setOpenClientCreatePopup] = useState(false);
  const [openProjectCreatePopup, setOpenProjectCreatePopup] = useState(false); // State for ProjectCreate popup
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProjectsCount = async () => {
      const { count, error } = await supabaseClient
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching projects count:', error);
      } else {
        setprojectsCount(count || 0);
      }
    };

    fetchProjectsCount();
  }, []);

  useEffect(() => {
    const fetchUsersCount = async () => {
      const { count, error } = await supabaseClient
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching projects count:', error);
      } else {
        setusersCount(count || 0);
      }
    };

    fetchUsersCount();
  }, []);

  useEffect(() => {
    const fetchDocumentsCount = async () => {
      const { count, error } = await supabaseClient
        .from('documents')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching projects count:', error);
      } else {
        setdocumentsCount(count || 0);
      }
    };

    fetchDocumentsCount();
  }, []);

  const handleAddButtonClick = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSearch = (query: string) => {
    // Add search functionality here if needed
  };

  const handleOpenClientCreate = () => {
    setOpenPopup(false);
    setOpenClientCreatePopup(true);
  };

  const handleCloseClientCreatePopup = () => {
    setOpenClientCreatePopup(false);
  };

  const handleOpenProjectCreate = () => {
    setOpenPopup(false);
    setOpenProjectCreatePopup(true); // Open the ProjectCreate popup
  };

  const handleCloseProjectCreatePopup = () => {
    setOpenProjectCreatePopup(false);
  };

  return (
    <Box sx={{ padding: 3, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h6">Home</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchBox onSearch={handleSearch} placeholder="Search" fullWidth={false} />
          <Box sx={{ marginLeft: 2 }}>
            <AddButton onClick={handleAddButtonClick} />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={1}>
          <MiniCard
            title="Clients"
            value={clientsCount}
            icon={<CorporateFareRoundedIcon />}
            onClick={() => navigate('/clients')}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <MiniCard
            title="Projects"
            value={projectsCount}
            icon={<AssignmentIcon />}
            onClick={() => navigate('/projects')}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <MiniCard
            title="People"
            value={usersCount}
            icon={<PeopleIcon />}
            onClick={() => navigate('/users')}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <MiniCard
            title="Master Files"
            value={documentsCount}
            icon={<InsertDriveFileIcon />}
            onClick={() => navigate('/documents')}
          />
        </Grid>
      </Grid>
      
      <MainPopup open={openPopup} onClose={handleClosePopup} title="What would you like to add?">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PopupButton
              text="New Client"
              fullWidth={true}
              onClick={handleOpenClientCreate}
            />
          </Grid>
          <Grid item xs={12}>
            <PopupButton
              text="New Project"
              fullWidth={true}
              onClick={handleOpenProjectCreate} // Open ProjectCreate popup on click
            />
          </Grid>
        </Grid>
      </MainPopup>
      
      {/* Popup for ClientCreate */}
      <EmbeddedComponentPopup open={openClientCreatePopup} onClose={handleCloseClientCreatePopup} title="">
        <ClientCreate />
      </EmbeddedComponentPopup>

      {/* Popup for ProjectCreate */}
      <EmbeddedComponentPopup open={openProjectCreatePopup} onClose={handleCloseProjectCreatePopup} title="">
        <ProjectCreate />
      </EmbeddedComponentPopup>
    </Box>
  );
};

export default Home;
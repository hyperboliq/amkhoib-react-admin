import React, { useState } from 'react';
import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  DateField,
  Filter,
  SearchInput,
  TopToolbar,
  CreateButton,
  useNotify,
  useRedirect,
  ImageField 
} from 'react-admin';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material';
import { SearchBox } from '../Components/SearchBox'; // Custom component
import { AddButton } from '../Components/Buttons/AddButton'; // Custom component

// Filters component
const ProjectFilters = ({ onTabChange }: { onTabChange: (tab: 'open' | 'archived') => void }) => {
  const [activeTab, setActiveTab] = useState<'open' | 'archived'>('open');

  const handleTabChange = (tab: 'open' | 'archived') => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Button
        onClick={() => handleTabChange('open')}
        sx={{
          width: 148,
          height: 33,
          borderRadius: '32px',
          backgroundColor: '#2593D10D',
          border: activeTab === 'open' ? '2px solid #025EA340' : 'none',
          color: '#025EA3',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {activeTab === 'open' && '✔'} Open
      </Button>
      <Box sx={{ marginLeft: 2 }}>
        <Button
          onClick={() => handleTabChange('archived')}
          sx={{
            width: 148,
            height: 33,
            borderRadius: '32px',
            backgroundColor: '#2593D10D',
            border: activeTab === 'archived' ? '2px solid #025EA340' : 'none',
            color: '#025EA3',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {activeTab === 'archived' && '✔'} Archived
        </Button>
      </Box>
    </Box>
  );
};

// Custom DataGrid to show project data
const CustomDatagrid = () => (
  <Datagrid
    bulkActionButtons={false}
    rowClick="edit"
    sx={{
      '& .RaDatagrid-headerCell': {
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold',
      },
      '& .RaDatagrid-row': {
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
      backgroundColor: 'transparent', // Set the table background to transparent
      border: 'none', // Remove table border
      boxShadow: 'none', // Remove table shadow
    }}
  >
    {/* Project Logo column: Displayed as a rounded image */}
    <ImageField
      source="project_logo"
      label={false}  // No label for the image column
      sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain', borderRadius: '50%' } }}
    />
    
    {/* Project Name */}
    <TextField source="name" label="Project Name" />
    
    {/* Client */}
    <ReferenceField source="assigned_client_id" reference="clients" label="Client">
      <TextField source="name" />
    </ReferenceField>
    
    {/* Location */}
    <TextField source="location" label="Location" />
    
    {/* Sub-contractors */}
    <TextField source="sub_contractors" label="Sub-contractors" />
    
    {/* Disciplines */}
    <TextField source="disciplines" label="Disciplines" />
    
    {/* Files Completed */}
    <TextField source="files_completed" label="Files Completed" />
  </Datagrid>
);



// Project List component
export const ProjectList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabFilter, setTabFilter] = useState('Open');
  const notify = useNotify();
  const redirect = useRedirect();

  // Handle search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle tab change (for "Open" and "Archived" projects)
  const handleTabChange = (tab: 'Open' | 'Archived') => {
    setTabFilter(tab);
  };

  const handleAddProject = () => {
    redirect('/projects/create');
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Breadcrumbs and Actions Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Breadcrumbs separator=">" aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              redirect('/');
            }}
          >
            Home
          </Link>
          <Typography color="text.primary">Projects</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchBox onSearch={handleSearch} placeholder="Search Projects" fullWidth={false} />
          <Box sx={{ marginLeft: 2 }}>
            <AddButton onClick={handleAddProject} />
          </Box>
        </Box>
      </Box>

      {/* Projects Table */}
      <Card elevation={0} sx={{ backgroundColor: 'transparent' }}> {/* Remove Card shadow */}
        <CardContent>
          {/* Filters aligned to the right */}
          <ProjectFilters onTabChange={handleTabChange} />
          <List
            basePath="/projects"
            resource="projects"
            filters={null}
            filter={{ status: tabFilter }}
            sx={{
              '& .RaList-main': {
                margin: 0,
                padding: 0,
                boxShadow: 'none', // Remove box shadow from List
              },
            }}
          >
            <CustomDatagrid />
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

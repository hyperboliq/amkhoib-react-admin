import { useState } from 'react';
import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  useNotify,
  useRedirect,
  useGetOne,
  useFieldValue
} from 'react-admin';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Button,
  Avatar
} from '@mui/material';
import { SearchBox } from '../../Components/SearchBox'; // Custom component
import { AddButton } from '../../Components/Buttons/AddButton'; // Custom component

// Filters component
export const CustomerAvatar = ({ id }: { id: string }) => {
  const { data } = useGetOne('project', { id });
  const logo = useFieldValue({ source: 'project_logo', record: data });
  const name = useFieldValue({ source: 'name', record: data });
  return (<Avatar
    src={logo}  // Set the image URL
    alt={name}  // Set alt text as the project name
    sx={{
      width: 50,
      height: 50,
      objectFit: 'cover',
      borderRadius: '50%',  // Make the image round
      backgroundColor: '#2593D1',  // Use a color as fallback background
      color: 'white',  // Text color for fallback
      fontSize: 20,  // Text size for fallback
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {!logo && name?.[0]}  
  </Avatar> );
};
const ProjectFilters = ({ onTabChange }: { onTabChange: (tab: 'Open' | 'Archived') => void }) => {
  const [activeTab, setActiveTab] = useState<'Open' | 'Archived'>('Open');

  const handleTabChange = (tab: 'Open' | 'Archived') => {
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
        onClick={() => handleTabChange('Open')}
        sx={{
          width: 148,
          height: 33,
          borderRadius: '32px',
          backgroundColor: '#2593D10D',
          border: activeTab === 'Open' ? '2px solid #025EA340' : 'none',
          color: '#025EA3',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {activeTab === 'Open' && '✔'} Open
      </Button>
      <Box sx={{ marginLeft: 2 }}>
        <Button
          onClick={() => handleTabChange('Archived')}
          sx={{
            width: 148,
            height: 33,
            borderRadius: '32px',
            backgroundColor: '#2593D10D',
            border: activeTab === 'Archived' ? '2px solid #025EA340' : 'none',
            color: '#025EA3',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {activeTab === 'Archived' && '✔'} Archived
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
        backgroundColor: 'transparent',
        color: '#05051780',
        fontWeight: 'bold',
        padding: '10px 16px',
      },
      '& .RaDatagrid-row': {
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    }}
  >
    {/* Project Logo column: Using MUI Avatar with fallback */}
   < CustomerAvatar source=""/>
      
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

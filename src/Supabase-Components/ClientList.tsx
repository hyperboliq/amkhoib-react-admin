import {
  List,
  TextField,
  TextInput,
  ReferenceField,
  CreateButton,
  FilterButton,
  TopToolbar,
  useListContext,
  Create,
  SimpleForm,
  ReferenceInput,
  DateInput,
} from 'react-admin';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton
      sx={{
        backgroundColor: '#2563eb',
        '&:hover': {
          backgroundColor: '#1d4ed8',
        },
      }}
      label="New client"
    />
  </TopToolbar>
);

const filters = [
  <TextInput source="q" label="Search" alwaysOn />,
];

const ClientGrid = () => {
  const { data, isLoading } = useListContext();
  
  if (isLoading) return null;

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {data.map(record => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={record.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'visible',
              '&:hover': {
                '& .edit-icon': {
                  opacity: 1,
                },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 'bold',
                    mb: 1 
                  }}>
                    {record.name}
                  </Typography>
                  
                  <ReferenceField
                    record={record}
                    source="client_representative"
                    reference="users"
                    link={false}
                  >
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '1.25rem'
                      }}
                    >
                      <TextField source="name" />
                    </Typography>
                  </ReferenceField>
                </Box>

                <Box sx={{ 
                  position: 'relative',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <Avatar
                    src={record.logo_url}
                    alt={record.name}
                    sx={{ 
                      width: 60,
                      height: 60,
                    }}
                  />
                </Box>
              </Box>

              <IconButton 
                size="small"
                href={`/clients/${record.id}`}
                className="edit-icon"
                sx={{ 
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: '#2563eb',
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': { 
                    backgroundColor: 'white',
                    color: '#1d4ed8'
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: '#93c5fd',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export const ClientList = () => (
  <List
    actions={<ListActions />}
    filters={filters}
    pagination={false}
    component="div"
    sx={{
      '& .RaList-main': {
        margin: 0,
        padding: 0,
        boxShadow: 'none',
      },
    }}
  >
    <ClientGrid />
  </List>
);

export const ClientCreate = () => (
  <Create>
      <SimpleForm>
          <TextInput source="name" />
          <TextInput source="contact_number" />
          <TextInput source="physical_address" />
          <TextInput source="logo_url" />
          <ReferenceInput source="client_representative_id" reference="users" />
          <DateInput source="created_at" />
          <DateInput source="updated_at" />
      </SimpleForm>
  </Create>
);


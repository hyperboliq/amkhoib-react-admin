// import { Datagrid, DateField, DateInput, List, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin';

// const filters = [
//     <TextInput source="id" />,
//     <TextInput source="name" />,
//     <ReferenceInput source="status_id" reference="statuses" />,
//     <ReferenceInput source="assigned_client_id" reference="clients" />,
//     <ReferenceInput source="assigned_consultant_id" reference="users" />,
//     <ReferenceInput source="assigned_contractor_id" reference="contractors" />,
//     <ReferenceInput source="assigned_admin_id" reference="users" />,
//     <DateInput source="created_at" />,
//     <DateInput source="updated_at" />
// ];

// export const ProjectList = () => (
//     <List filters={filters}>
//         <Datagrid>
//             <TextField source="id" />
//             <TextField source="name" />
//             <ReferenceField source="status_id" reference="statuses" />
//             <ReferenceField source="assigned_client_id" reference="clients" />
//             <ReferenceField source="assigned_consultant_id" reference="users" />
//             <ReferenceField source="assigned_contractor_id" reference="contractors" />
//             <ReferenceField source="assigned_admin_id" reference="users" />
//             <DateField source="created_at" />
//             <DateField source="updated_at" />
//         </Datagrid>
//     </List>
// );

// import {
//     Datagrid,
//     DateField,
//     DateInput,
//     List,
//     ReferenceField,
//     ReferenceInput,
//     TextField,
//     TextInput,
//     CreateButton,
//     FilterButton,
//     TopToolbar,
//     SelectInput,
//   } from 'react-admin';
//   import { Card, CardContent, Box, Typography, Tabs, Tab } from '@mui/material';
  
//   const ListActions = () => (
//     <TopToolbar>
//       <FilterButton />
//       <CreateButton
//         sx={{
//           backgroundColor: '#2563eb',
//           '&:hover': {
//             backgroundColor: '#1d4ed8',
//           },
//         }}
//         label="New project"
//       />
//     </TopToolbar>
//   );
  
//   const filters = [
//     <TextInput source="q" label="Search" alwaysOn />,
//     <ReferenceInput source="status_id" reference="statuses" />,
//     <ReferenceInput source="assigned_client_id" reference="clients" />,
//     <ReferenceInput source="assigned_consultant_id" reference="users" />,
//     <ReferenceInput source="assigned_contractor_id" reference="contractors" />,
//     <ReferenceInput source="assigned_admin_id" reference="users" />,
//     <DateInput source="created_at" />,
//     <DateInput source="updated_at" />
//   ];
  
//   const ProjectFilters = () => (
//     <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//       <Tabs value={0}>
//         <Tab label="Open projects" />
//         <Tab label="Archived projects" />
//       </Tabs>
//     </Box>
//   );
  
//   const CustomDatagrid = () => (
//     <Datagrid bulkActionButtons={false} sx={{
//       '& .RaDatagrid-headerCell': {
//         backgroundColor: '#f8fafc',
//       },
//       '& .RaDatagrid-row': {
//         '&:hover': {
//           backgroundColor: '#f1f5f9',
//         },
//       },
//     }}>
//       <ReferenceField
//         source="assigned_client_id"
//         reference="clients"
//         link={false}
//         sortable={false}
//       >
//         <TextField source="logo" />
//       </ReferenceField>
//       <TextField 
//         source="name" 
//         label="Project name"
//         sx={{ fontWeight: 'medium' }}
//       />
//       <TextField 
//         source="location" 
//         label="Location"
//         sx={{ color: 'text.secondary' }}
//       />
//     </Datagrid>
//   );
  
//   export const ProjectList = () => (
//     <List
//       actions={<ListActions />}
//       filters={filters}
//       filterDefaultValues={{ status: 'open' }}
//       sx={{
//         '& .RaList-main': {
//           margin: 0,
//           padding: 0,
//           boxShadow: 'none',
//         },
//       }}
//     >
//       <Card>
//         <CardContent>
//           <ProjectFilters />
//           <CustomDatagrid />
//         </CardContent>
//       </Card>
//     </List>
//   );
  
  
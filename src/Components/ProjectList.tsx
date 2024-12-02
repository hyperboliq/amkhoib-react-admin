import { Datagrid, DateField, DateInput, List, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />,
    <ReferenceInput source="status_id" reference="statuses" />,
    <ReferenceInput source="assigned_client_id" reference="clients" />,
    <ReferenceInput source="assigned_consultant_id" reference="users" />,
    <ReferenceInput source="assigned_contractor_id" reference="contractors" />,
    <ReferenceInput source="assigned_admin_id" reference="users" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const ProjectList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="status_id" reference="statuses" />
            <ReferenceField source="assigned_client_id" reference="clients" />
            <ReferenceField source="assigned_consultant_id" reference="users" />
            <ReferenceField source="assigned_contractor_id" reference="contractors" />
            <ReferenceField source="assigned_admin_id" reference="users" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
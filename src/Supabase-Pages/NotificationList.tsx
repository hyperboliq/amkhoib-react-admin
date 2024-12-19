import { BooleanField, BooleanInput, Datagrid, DateField, DateInput, List, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="type" />,
    <ReferenceInput source="assigned_user" reference="users" />,
    <ReferenceInput source="assigned_project" reference="projects" />,
    <ReferenceInput source="assigned_client" reference="clients" />,
    <TextInput source="message" />,
    <BooleanInput source="read" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const NotificationList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="type" />
            <ReferenceField source="assigned_user" reference="users" />
            <ReferenceField source="assigned_project" reference="projects" />
            <ReferenceField source="assigned_client" reference="clients" />
            <TextField source="message" />
            <BooleanField source="read" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
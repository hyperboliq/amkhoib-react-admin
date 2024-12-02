import { Datagrid, DateField, DateInput, List, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />,
    <TextInput source="contact_number" />,
    <TextInput source="physical_address" />,
    <TextInput source="logo_url" />,
    <ReferenceInput source="client_representative" reference="users" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const ClientList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="contact_number" />
            <TextField source="physical_address" />
            <TextField source="logo_url" />
            <ReferenceField source="client_representative" reference="users" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
import { Datagrid, DateField, DateInput, EmailField, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="email" />,
    <TextInput source="first_name" />,
    <TextInput source="last_name" />,
    <TextInput source="contact_number" />,
    <TextInput source="user_role" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />,
    <TextInput source="supervision_level" />,
    <TextInput source="nickname" />
];

export const UserList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="contact_number" />
            <TextField source="user_role" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <TextField source="supervision_level" />
            <TextField source="nickname" />
        </Datagrid>
    </List>
);
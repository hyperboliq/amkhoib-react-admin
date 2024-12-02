import { Datagrid, DateField, DateInput, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="role_name" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const User_roleList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="role_name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
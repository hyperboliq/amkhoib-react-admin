import { Datagrid, DateField, DateInput, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />,
    <TextInput source="description" />,
    <TextInput source="color" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const StatusList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="color" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
import { Datagrid, DateField, DateInput, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <DateInput source="created_at" />,
    <TextInput source="name" />
];

export const CategoryList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <DateField source="created_at" />
            <TextField source="name" />
        </Datagrid>
    </List>
);
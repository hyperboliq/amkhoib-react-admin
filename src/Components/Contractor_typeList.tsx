import { Datagrid, DateField, DateInput, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const Contractor_typeList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
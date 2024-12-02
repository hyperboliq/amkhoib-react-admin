import { Datagrid, DateField, DateInput, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="filename" />,
    <TextInput source="form_name" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const Zzz_documentList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="filename" />
            <TextField source="form_name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </Datagrid>
    </List>
);
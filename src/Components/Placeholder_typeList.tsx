import { Datagrid, List, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />
];

export const Placeholder_typeList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);
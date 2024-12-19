import { Datagrid, DateField, DateInput, EditButton, List, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />,
    <ReferenceInput source="contractor_type_id" reference="contractor_types" />,
    <ReferenceInput source="contractor_representative" reference="users" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />
];

export const ContractorList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="contractor_type_id" reference="contractor_types" />
            <ReferenceField source="contractor_representative" reference="users" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
        </Datagrid>
    </List>
);
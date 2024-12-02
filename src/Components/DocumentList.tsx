import { BooleanField, BooleanInput, Datagrid, DateField, DateInput, List, NumberField, NumberInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="file_name" />,
    <TextInput source="title" />,
    <TextInput source="code" />,
    <NumberInput source="revision_number" />,
    <DateInput source="revision_date" />,
    <NumberInput source="order" />,
    <TextInput source="watermark" />,
    <BooleanInput source="has_header" />,
    <BooleanInput source="has_watermark" />
];

export const DocumentList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="file_name" />
            <TextField source="title" />
            <TextField source="code" />
            <NumberField source="revision_number" />
            <DateField source="revision_date" />
            <NumberField source="order" />
            <TextField source="watermark" />
            <BooleanField source="has_header" />
            <BooleanField source="has_watermark" />
        </Datagrid>
    </List>
);
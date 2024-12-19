import { Datagrid, List, NumberField, NumberInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="doc_json" />,
    <NumberInput source="project_id" />,
    <NumberInput source="document_id" />,
    <TextInput source="document_url" />
];

export const Project_documentList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="doc_json" />
            <NumberField source="project_id" />
            <NumberField source="document_id" />
            <TextField source="document_url" />
        </Datagrid>
    </List>
);
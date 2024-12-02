import { Datagrid, List, NumberField, NumberInput, TextField, TextInput } from 'react-admin';

const filters = [
    <TextInput source="id" />,
    <TextInput source="name" />,
    <TextInput source="tag_name" />,
    <TextInput source="parent_tag_name" />,
    <TextInput source="full_tag_name" />,
    <TextInput source="placeholder_text" />,
    <NumberInput source="placeholder_type_id" />,
    <NumberInput source="field_type_id" />,
    <TextInput source="linked_table_name" />,
    <TextInput source="linked_column_name" />
];

export const PlaceholderList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="tag_name" />
            <TextField source="parent_tag_name" />
            <TextField source="full_tag_name" />
            <TextField source="placeholder_text" />
            <NumberField source="placeholder_type_id" />
            <NumberField source="field_type_id" />
            <TextField source="linked_table_name" />
            <TextField source="linked_column_name" />
        </Datagrid>
    </List>
);
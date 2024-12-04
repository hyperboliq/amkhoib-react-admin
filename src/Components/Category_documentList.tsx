import { Datagrid, DateField, DateInput, List, NumberField, NumberInput } from 'react-admin';

const filters = [
    <DateInput source="created_at" />,
    <NumberInput source="category_id" />,
    <NumberInput source="document_id" />
];

// This is my List
export const Category_documentList = () => (
    <List filters={filters}>
        <Datagrid>
            <DateField source="created_at" />
            <NumberField source="category_id" />
            <NumberField source="document_id" />
        </Datagrid>
    </List>
);
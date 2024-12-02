import { Datagrid, List, NumberField, NumberInput } from 'react-admin';

const filters = [
    <NumberInput source="document_id" />,
    <NumberInput source="placeholder_id" />
];

export const Document_placeholderList = () => (
    <List filters={filters}>
        <Datagrid>
            <NumberField source="document_id" />
            <NumberField source="placeholder_id" />
        </Datagrid>
    </List>
);
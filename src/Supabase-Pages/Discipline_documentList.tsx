import { Datagrid, DateField, DateInput, List, NumberField, NumberInput } from 'react-admin';

const filters = [
    <DateInput source="created_at" />,
    <NumberInput source="discipline_id" />,
    <NumberInput source="document_id" />
];

export const Discipline_documentList = () => (
    <List filters={filters}>
        <Datagrid>
            <DateField source="created_at" />
            <NumberField source="discipline_id" />
            <NumberField source="document_id" />
        </Datagrid>
    </List>
);
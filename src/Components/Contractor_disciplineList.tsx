import { Datagrid, DateField, DateInput, List, NumberField, NumberInput } from 'react-admin';

const filters = [
    <DateInput source="created_at" />,
    <NumberInput source="contractor_id" />,
    <NumberInput source="discipline_id" />
];

export const Contractor_disciplineList = () => (
    <List filters={filters}>
        <Datagrid>
            <DateField source="created_at" />
            <NumberField source="contractor_id" />
            <NumberField source="discipline_id" />
        </Datagrid>
    </List>
);
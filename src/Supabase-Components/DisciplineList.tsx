// DisciplineList.tsx

import { List, Datagrid, TextField, NumberField, DateField, TextInput, DateInput, NumberInput, SimpleForm, Show, SimpleShowLayout, Edit } from 'react-admin';


// interface Choice {
//     id: any;
//     name: any;
// }

type Choice = {
    id: any;
    name: any;
};

const filters = [
    <TextInput source="id" />,
    <DateInput source="created_at" />,
    <NumberField source="parent_id" />,
    <TextInput source="name" />
];

// This is my list
export const DisciplineList = () => (
    <List filters={filters}>
        <Datagrid>
            <TextField source="id" />
            <DateField source="created_at" />
            <NumberField source="parent_id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);

// This is My show
export const DisciplineShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <DateField source="created_at" />
            <NumberField source="parent_id" />
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
);
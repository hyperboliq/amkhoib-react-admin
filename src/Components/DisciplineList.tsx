// DisciplineList.tsx
import React, { useEffect, useState } from 'react';
import { List, Datagrid, TextField, NumberField, DateField, TextInput, DateInput, NumberInput, Create, SimpleForm, SelectInput } from 'react-admin';
import supabaseClient from '../supabaseClient'; 

interface Choice {
    id: any;
    name: any;
}

const filters = [
    <TextInput source="id" />,
    <DateInput source="created_at" />,
    <NumberField source="parent_id" />,
    <TextInput source="name" />
];

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

export const DisciplineCreate = () => {
    const [choices, setChoices] = useState<Choice[]>([]);
    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const { data: discipline, error } = await supabaseClient
                    .from('disciplines')
                    .select('parent_id, name');

                if (error) throw error;

                const transformedChoices = discipline
                    .filter(disciplines => disciplines.parent_id === 0) // Filter by parent_id === 0
                    .map(discipline => ({
                        id: discipline.parent_id,
                        name: discipline.name,
                    }));

                setChoices(transformedChoices);
            } catch (err) {
                console.error('Error fetching choices:', err);
            }
        };
        fetchChoices();
    }, []);

    return (
        <Create>
            <SimpleForm>
                <DateInput source="created_at" />
                <SelectInput source="parent_id" choices={choices} optionText="name" optionValue="id" />
                <TextInput source="name" />
            </SimpleForm>
        </Create>
    );
};

// export const DisciplineCreate = () => (
//     <Create>
//         <SimpleForm>
//             <DateInput source="created_at" />
//             <NumberInput source="parent_id" />
//             <TextInput source="name" />
//         </SimpleForm>
//     </Create>
// );

// export const DisciplineCreate = () => (
//     <Create>
//         <SimpleForm>
//             <DateInput source="created_at" />
//             <NumberInput source="parent_id" />
//             <TextInput source="name" />
//         </SimpleForm>
//     </Create>
// );
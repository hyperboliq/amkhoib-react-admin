// DisciplineList.tsx
import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { List, Datagrid, TextField, NumberField, DateField, TextInput, DateInput, NumberInput, Create, SimpleForm, SelectInput, Show, SimpleShowLayout, Edit, Form, Toolbar } from 'react-admin';
import supabaseClient from '../supabaseClient'; 
import CustomSaveButton from '../Buttons/CustomSaveButton';

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

// // This is my Create/insert
// export const DisciplineCreate = () => {
//     const [choices, setChoices] = useState<Choice[]>([]);
//     useEffect(() => {
//         const fetchChoices = async () => {
//             try {
//                 const { data: discipline, error } = await supabaseClient
//                     .from('disciplines')
//                     .select('id, parent_id, name');

//                 if (error) throw error;

//                 const transformedChoices = discipline
//                     .filter(disciplines => disciplines.parent_id != disciplines.id) 
//                     .map(discipline => ({
//                         id: discipline.parent_id,
//                         name: discipline.name,
//                     }));

//                 setChoices(transformedChoices);
//             } catch (err) {
//                 console.error('Error fetching choices:', err);
//             }
//         };
//         fetchChoices();
//     }, []);

//     return (
//         <Create>
//             <Form>
//                 <Paper elevation={3} sx={{ padding: 1, borderRadius: 0 }}>
//                     <Grid container spacing={0} sx={{ padding: 3 }}>
//                         <Grid item xs={12}>
//                             <DateInput source="created_at" />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <SelectInput source="parent_id" choices={choices} optionText="name" optionValue="id" label="Select Discipline"/>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextInput source="name" />
//                         </Grid>
//                     </Grid>
//                     <Toolbar sx={{ justifyContent: 'center' }}>
//                         <CustomSaveButton label="Save Discipline" />
//                     </Toolbar>
//                 </Paper>
//             </Form>
//         </Create>
//     );
// };

export const DisciplineCreate = () => {
    const [choices, setChoices] = useState<Choice[]>([]);
    const [formState, setFormState] = useState({
        created_at: '',
        parent_id: '',
        name: ''
    });

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const { data: disciplines, error } = await supabaseClient
                    .from('disciplines')
                    .select('id, parent_id, name');

                if (error) throw error;

                const transformedChoices: Choice[] = disciplines
                    .filter(discipline => discipline.parent_id !== discipline.id)
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { parent_id, name, created_at } = formState;

        // Use the current entry ID if no parent is selected
        const entryParentId = parent_id || formState.id; // Assume `formState.id` is your generated ID logic

        try {
            const { error } = await supabaseClient
                .from('disciplines')
                .insert([{ name, created_at, parent_id: entryParentId }]);

            if (error) throw error;

            // Handle successful save (e.g., display a notification)
        } catch (err) {
            console.error('Error saving discipline:', err);
        }
    };

    return (
        <Create>
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} sx={{ padding: 1, borderRadius: 0 }}>
                    <Grid container spacing={0} sx={{ padding: 3 }}>
                        <Grid item xs={12}>
                            <input
                                type="date"
                                name="created_at"
                                value={formState.created_at}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <select
                                name="parent_id"
                                value={formState.parent_id}
                                onChange={handleChange}>
                                <option value="">Select Discipline</option>
                                {choices.map(choice => (
                                    <option key={choice.id} value={choice.id}>
                                        {choice.name}
                                    </option>
                                ))}
                            </select>
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <button type="submit">
                            Save Discipline
                        </button>
                    </Toolbar>
                </Paper>
            </form>
        </Create>
    );
};

    // This is my Edit
    export const DisciplineEdit = () => (
        <Edit>
            <SimpleForm>
                <DateInput source="created_at" />
                <NumberInput source="parent_id" />
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
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
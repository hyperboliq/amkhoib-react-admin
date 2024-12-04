import { BooleanField, BooleanInput, Create, Datagrid, DateField, DateInput, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SimpleForm, TextField, TextInput, Toolbar, SaveButton, Form, ReferenceManyField, Show, SimpleShowLayout, TabbedShowLayout, SelectInput, AutocompleteArrayInput } from 'react-admin';
import { Grid, Paper } from '@mui/material';
import CustomSaveButton from '../Buttons/CustomSaveButton';
import supabaseClient from '../supabaseClient';
import { useEffect, useState } from 'react';


interface Choice {
    id: any;
    name: any;
}

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
    <BooleanInput source="has_watermark" />,
    <ReferenceInput source="categorie_id" reference="categories" />
];

// This is my List
export const DocumentList = () => (
    <List filters={filters} sort={{ field: 'revision_date', order: 'DESC' }}>
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

// This is my Create/Insert
export const DocumentCreate = () => {
    const [choices, setChoices] = useState<Choice[]>([]);
    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const { data: categories, error } = await supabaseClient
                    .from('categories')
                    .select('id, name');

                if (error) throw error;

                setChoices(categories);
            } catch (err) {
                console.error('Error fetching choices:', err);
            }
        };
        fetchChoices();
    }, []);
    
    return (
        <Create>
            <Form>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 0 }}>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={6}>
                            <TextInput source="file_name" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="title" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="code" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <NumberInput source="revision_number" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <DateInput source="revision_date" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <NumberInput source="order" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="watermark" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <BooleanInput source="has_header" />
                        </Grid>
                        <Grid item xs={3}>
                            <BooleanInput source="has_watermark" />
                        </Grid>
                        {/* <Grid item xs={3}>
                            <ReferenceManyToManyInput
                                reference="venues"
                                through="performances"
                                using="band_id,venue_id"
                            >
                                <AutocompleteArrayInput
                                    label="Performances"
                                    optionText="name"
                                />
                            </ReferenceManyToManyInput>
                        </Grid> */}
                        <Grid item xs={3}>
                            <SelectInput source="categories" choices={choices} optionText="name" optionValue="id" label="Select Category"/>
                        </Grid>
                    </Grid>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <CustomSaveButton label="Save Document" />
                    </Toolbar>
                </Paper>
            </Form>
        </Create>
    );
};

// // This is my show
// export const DocumentShow = () => (
//     <Show>
//         <SimpleShowLayout>
//             <TextField source="file_name" />
//             <TextField source="title" />
//             <TextField source="code" />
//             <NumberField source="revision_number" />
//             <DateField source="revision_date" />
//             <NumberField source="order" />
//             <TextField source="watermark" />
//             <BooleanField source="has_header" />
//             <BooleanField source="has_watermark" />
//             <TextField source="id" />
//         </SimpleShowLayout>
//     </Show>
// );

export const DocumentShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="General Information">
                <TextField source="file_name" label="File Name" />
                <TextField source="title" label="Title" />
                <TextField source="code" label="Code" />
                <BooleanField source="has_header" label="Has Header" />
                <BooleanField source="has_watermark" label="Has Watermark" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Technical Details" path="technical">
                <NumberField source="revision_number" label="Revision Number" />
                <DateField source="revision_date" label="Revision Date" />
                <NumberField source="order" label="Order" />
                <TextField source="watermark" label="Watermark" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Identifiers" path="identifiers">
                <TextField source="id" label="ID" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);
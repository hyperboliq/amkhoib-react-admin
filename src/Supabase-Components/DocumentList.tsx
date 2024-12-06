import { required, BooleanField, BooleanInput, Create, Datagrid, DateField, DateInput, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SimpleForm, TextField, TextInput, Toolbar, SaveButton, Form, ReferenceManyField, Show, SimpleShowLayout, TabbedShowLayout, SelectInput, AutocompleteArrayInput, SearchInput, FilterLiveSearch, Edit, ChipField } from 'react-admin';
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import CustomSaveButton from '../Buttons/CustomSaveButton';
import supabaseClient from '../supabaseClient';
import { useEffect, useState } from 'react';
import { useCreate } from 'react-admin';


interface Choice {
    id: any;
    name: any;
}

const filters = [
    <FilterLiveSearch source="title" placeholder="Search by File Name" alwaysOn />,
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
    <ReferenceInput source="categories_id" reference="category_documents" />
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
            <ReferenceField source="categories_id" reference="category_documents" />
        </Datagrid>
    </List>
);

// This is my show
export const DocumentShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="General Information">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">File Name</Typography>
                    <ChipField source="file_name" />
                    {/* <TextField source="file_name" label="File Name" /> */}
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Title</Typography>
                    <ChipField source="title" />
                    {/* <TextField source="title" label="Title" /> */}
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Code</Typography>
                    <ChipField source="code" />
                    {/* <TextField source="code" label="Code" /> */}
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Has Header</Typography>
                    {/* <ChipField source="has_header" /> */}
                    <BooleanField source="has_header" label="Has Header" />
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Has Watermark</Typography>
                    {/* <ChipField source="has_watermark" /> */}
                    <BooleanField source="has_watermark" label="Has Watermark" />
                </CardContent>
            </Card>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Technical Details" path="technical">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Revision Number</Typography>
                    <ChipField source="revision_number" />
                    {/* <NumberField source="revision_number" label="Revision Number" /> */}
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Revision Date</Typography>
                    <ChipField source="revision_date" />
                    {/* <DateField source="revision_date" label="Revision Date" /> */}
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Order</Typography>
                    <ChipField source="revision_date" />
                    {/* <NumberField source="order" label="Order" /> */}
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Watermark</Typography>
                    {/* <ChipField source="watermark" /> */}
                    <TextField source="watermark" label="Watermark" />
                </CardContent>
            </Card>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Identifiers" path="identifiers">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">ID</Typography>
                    <ChipField source="id" />
                    {/* <TextField source="id" label="ID" /> */}
                </CardContent>
            </Card>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
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

    // const [create, {loading}] = useCreate

    return (
        <Create>
            <Form>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 0 }}>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={6}>
                            <TextInput source="file_name" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="title" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="code" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <NumberInput source="revision_number" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <DateInput source="revision_date" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <NumberInput source="order" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="watermark" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectInput
                                source="categorie_id" // Make sure to use the correct source
                                choices={choices}
                                optionText="name"
                                optionValue="id"
                                label="Select Category"
                                fullWidth
                                validate={required()}
                            />
                        </Grid>
                        <ReferenceInput source="categories_id" reference="category_documents" />
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">Has Header</Typography>
                                    <BooleanInput source="has_header" fullWidth />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">Has Watermark</Typography>
                                    <BooleanInput source="has_watermark" fullWidth />
                                </CardContent>
                            </Card>
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

// this is my edit
export const DocumentEdit = () => {
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
        <Edit>
        <Form>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 0 }}>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={6}>
                            <TextInput source="file_name" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="title" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="code" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <NumberInput source="revision_number" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <DateInput source="revision_date" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <NumberInput source="order" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="watermark" fullWidth validate={required()} />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectInput
                                source="categorie_id" // Make sure to use the correct source
                                choices={choices}
                                optionText="name"
                                optionValue="id"
                                label="Select Category"
                                fullWidth
                                validate={required()}
                            />
                        </Grid>
                    <ReferenceInput source="categories_id" reference="category_documents" />
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">Has Header</Typography>
                                    <BooleanInput source="has_header" fullWidth />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">Has Watermark</Typography>
                                    <BooleanInput source="has_watermark" fullWidth />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <CustomSaveButton label="Save Document" />
                    </Toolbar>
                </Paper>
            </Form>
        </Edit>
    );

};

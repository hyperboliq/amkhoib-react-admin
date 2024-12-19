// DisciplineList.tsx
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import { Create, Toolbar, useNotify } from 'react-admin';
import supabaseClient from '../../supabaseClient';

type Choice = {
    id: string;
    name: string;
};

export const DisciplineCreate = () => {
    const [choices, setChoices] = useState<Choice[]>([]);
    const [formState, setFormState] = useState({
        created_at: '',
        parent_id: '',
        name: ''
    });

    const notify = useNotify();

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const { data: disciplines, error } = await supabaseClient
                    .from('disciplines')
                    .select('id, parent_id, name');

                if (error) throw error;

                const transformedChoices: Choice[] = disciplines
                    .filter(discipline => discipline.parent_id === discipline.id)
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

    const handleChange = (e: React.ChangeEvent<{ name: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value as string
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { parent_id, name, created_at } = formState;
        const entryParentId = parent_id || formState.id;

        try {
            const { error } = await supabaseClient
                .from('disciplines')
                .insert([{ name, created_at, parent_id: entryParentId }]);

            if (error) throw error;

            notify('Discipline created successfully');
        } catch (err) {
            console.error('Error saving discipline:', err);
            notify('Error saving discipline', { type: 'error' });
        }
    };

    return (
        <Create>
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                        Create New Discipline
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Created At"
                                    type="date"
                                    name="created_at"
                                    value={formState.created_at}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Parent Discipline</InputLabel>
                                <Select
                                    name="parent_id"
                                    value={formState.parent_id}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                    </MenuItem>
                                    {choices.map(choice => (
                                        <MenuItem key={choice.id} value={choice.id}>
                                            {choice.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Toolbar sx={{ justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save Discipline
                        </Button>
                    </Toolbar>
                </Paper>
            </form>
        </Create>
    );
};
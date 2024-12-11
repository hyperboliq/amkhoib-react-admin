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
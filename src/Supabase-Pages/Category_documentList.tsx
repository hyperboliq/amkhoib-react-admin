import { Create, Datagrid, DateField, DateInput, List, NumberField, NumberInput, ReferenceInput, SimpleForm } from 'react-admin';

const filters = [
    <DateInput source="created_at" />,
    <NumberInput source="category_id" />,
    <NumberInput source="document_id" />
];

// This is my List
export const Category_documentList = () => (
    <List filters={filters}>
        <Datagrid>
            <DateField source="created_at" />
            <NumberField source="category_id" />
            <NumberField source="document_id" />
        </Datagrid>
    </List>
);

export const Category_documentCreate = () => (
    <Create>
        <SimpleForm>
            <DateInput source="created_at" />
            <ReferenceInput source="category_id" reference="categories" />
            <ReferenceInput source="document_id" reference="documents" />
        </SimpleForm>
    </Create>
);
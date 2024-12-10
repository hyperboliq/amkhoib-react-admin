import React, { useEffect, useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  useNotify,
  Toolbar,
} from 'react-admin';
import Button from '@mui/material/Button';
import supabaseClient from '../supabaseClient';

interface Category {
    id: string;
    name: string;
}

interface Document {
  id: string;
}

const TestCreate: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const notify = useNotify();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabaseClient
        .from<Category>('categories')
        .select('id, name');

      if (error) {
        notify('Error fetching categories', { type: 'warning' });
      } else if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, [notify]);

  const handleClick = async (data: any) => {
    try {
      const { name, title, categories_id } = data;

      const { data: documentData, error: documentError } = await supabaseClient
        .from<Document>('documents') // Provide type here for row
        .insert([{ name, title }])
        .single();

      if (documentError) throw documentError;

      const { error: associationError } = await supabaseClient
        .from('category_documents')
        .insert([{ document_id: (documentData as Document)?.id, category_id: categories_id }]);

      if (associationError) throw associationError;

      notify('Document created successfully', { type: 'success' });
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: 'error' });
    }
  };

  const CustomToolbar: React.FC = () => (
    <Toolbar>
      <Button
        onClick={() => {
          const form = document.getElementById('create-form') as HTMLFormElement;
          if (form) {
            const formData = new FormData(form);
            const data = {
              file_name: formData.get('file_name') as string,
              title: formData.get('title') as string,
              categories_id: formData.get('categories_id') as string,
            };
            handleClick(data);
          }
        }}
      >
        Save
      </Button>
    </Toolbar>
  );

  return (
    <Create>
      <SimpleForm toolbar={<CustomToolbar />} id="create-form">
        <TextInput source="file_name" label="File Name" />
        <TextInput source="title" label="Title" />
        <SelectInput
          source="categories_id"
          label="Category"
          choices={categories}
          optionText="name"
          optionValue="id"
        />
      </SimpleForm>
    </Create>
  );
};

export default TestCreate;
import React, { useState, useEffect } from 'react';
import { Button, useNotify, useRedirect } from 'react-admin';
import { TextField, Checkbox, FormControlLabel, MenuItem, Select, FormControl, Box, Typography } from '@mui/material';
import supabaseClient from '../supabaseClient';
import { SelectChangeEvent } from '@mui/material/Select';

type Category = {
  id: string;
  name: string;
};

type Discipline = {
  id: string;
  name: string;
  parent_id: string;
};

const DocumentListCreate = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    file_name: '',
    code: '',
    revision_number: '',
    revision_date: '',
    order: '',
    watermark: '',
    has_header: false,
    has_watermark: false,
    category_id: [] as string[],
    discipline_id: [] as string[]
  });

  const notify = useNotify();
  const redirect = useRedirect();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabaseClient.from('categories').select('id, name');
      if (!error && data) {
        setCategories(data.map(({ id, name }) => ({ id, name })));
      }
    };

    const fetchDisciplines = async () => {
      const { data, error } = await supabaseClient.from('disciplines').select('id, name, parent_id');
      if (!error && data) {
        const filteredDisciplines = data.filter(discipline => discipline.parent_id !== discipline.id);
        setDisciplines(filteredDisciplines.map(({ id, name }) => ({ id, name, parent_id: id })));
      }
    };

    fetchCategories();
    fetchDisciplines();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMultipleSelectChange = (e: SelectChangeEvent<typeof formData.category_id>, type: 'category' | 'discipline') => {
    const {
      target: { value },
    } = e;
    setFormData({
      ...formData,
      [type === 'category' ? 'category_id' : 'discipline_id']: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSave = async () => {
    const { title, file_name, code, revision_number, revision_date, order, watermark, has_header, has_watermark, category_id, discipline_id } = formData;

    const { data: docData, error: docError } = await supabaseClient
      .from('documents')
      .insert([{ title, file_name, code, revision_number, revision_date, order, watermark, has_header, has_watermark }])
      .select();

    if (!docError && docData) {
      const document_id = docData[0].id;
      
      const categoryPromises = category_id.map(catId =>
        supabaseClient.from('category_documents').insert([{ document_id, category_id: catId }])
      );

      const disciplinePromises = discipline_id.map(dId =>
        supabaseClient.from('discipline_documents').insert([{ document_id, discipline_id: dId }])
      );

      const results = await Promise.all([...categoryPromises, ...disciplinePromises]);
      const hasErrors = results.some(({ error }) => error !== null);

      if (!hasErrors) {
        notify('Document created successfully');
        redirect('/documents');
      } else {
        notify('Error linking document to category or discipline', { type: 'error' });
      }
    } else {
      notify('Error creating document', { type: 'error' });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create New Document
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="File Name"
        name="file_name"
        value={formData.file_name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Code"
        name="code"
        value={formData.code}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Revision Number"
        name="revision_number"
        type="number"
        value={formData.revision_number}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Revision Date"
        name="revision_date"
        type="date"
        value={formData.revision_date}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        label="Order"
        name="order"
        type="number"
        value={formData.order}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Watermark"
        name="watermark"
        value={formData.watermark}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.has_header}
            onChange={handleInputChange}
            name="has_header"
          />
        }
        label="Has Header"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.has_watermark}
            onChange={handleInputChange}
            name="has_watermark"
          />
        }
        label="Has Watermark"
      />

      <FormControl fullWidth margin="normal">
        <Select
          multiple
          name="category_id"
          value={formData.category_id}
          onChange={(e) => handleMultipleSelectChange(e, 'category')}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select a category</em>;
            }
            return categories
              .filter(category => selected.includes(category.id))
              .map(category => category.name)
              .join(', ');
          }}
        >
          <MenuItem disabled value="">
            <em>Select a category</em>
          </MenuItem>
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Select
          multiple
          name="discipline_id"
          value={formData.discipline_id}
          onChange={(e) => handleMultipleSelectChange(e, 'discipline')}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select a discipline</em>;
            }
            return disciplines
              .filter(discipline => selected.includes(discipline.id))
              .map(discipline => discipline.name)
              .join(', ');
          }}
        >
          <MenuItem disabled value="">
            <em>Select a discipline</em>
          </MenuItem>
          {disciplines.map(discipline => (
            <MenuItem key={discipline.id} value={discipline.id}>
              {discipline.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button label="Save" onClick={handleSave} />
    </Box>
  );
};

export default DocumentListCreate;
import React, { useState, useEffect } from 'react';
import {
  useNotify,
  useRedirect,
  useRecordContext,
  Edit,
  EditProps
} from 'react-admin';
import { TextField as MuiTextField, Checkbox, FormControlLabel, MenuItem, Select, FormControl, Box, Typography } from '@mui/material';
import { Button } from '@mui/material';
import supabaseClient from '../../supabaseClient';
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

const DocumentEditInner = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<string[]>([]);
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
  });

  useEffect(() => {
    if (record) {
      setFormData({
        title: record.title || '',
        file_name: record.file_name || '',
        code: record.code || '',
        revision_number: record.revision_number || '',
        revision_date: record.revision_date ? new Date(record.revision_date).toISOString().split('T')[0] : '',
        order: record.order || '',
        watermark: record.watermark || '',
        has_header: record.has_header || false,
        has_watermark: record.has_watermark || false,
      });
    }

    const fetchCategoriesAndSelections = async () => {
      const { data: categoriesData, error: categoriesError } = await supabaseClient.from('categories').select('id, name');
      if (!categoriesError && categoriesData) {
        setCategories(categoriesData);
      }

      const { data: selectedCategoriesData, error: selectedCategoriesError } = await supabaseClient
        .from('category_documents')
        .select('category_id')
        .eq('document_id', record.id);

      if (!selectedCategoriesError && selectedCategoriesData) {
        setSelectedCategoryIds(selectedCategoriesData.map(item => item.category_id));
      }
    };

    const fetchDisciplinesAndSelections = async () => {
      const { data: disciplinesData, error: disciplinesError } = await supabaseClient.from('disciplines').select('id, name, parent_id');
      if (!disciplinesError && disciplinesData) {
        setDisciplines(disciplinesData.map(({ id, name, parent_id }) => ({ id, name, parent_id })));
      }

      const { data: selectedDisciplinesData, error: selectedDisciplinesError } = await supabaseClient
        .from('discipline_documents')
        .select('discipline_id')
        .eq('document_id', record.id);

      if (!selectedDisciplinesError && selectedDisciplinesData) {
        setSelectedDisciplineIds(selectedDisciplinesData.map(item => item.discipline_id));
      }
    };

    fetchCategoriesAndSelections();
    fetchDisciplinesAndSelections();
  }, [record]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMultipleSelectChange = (e: SelectChangeEvent<string[]>, type: 'category' | 'discipline') => {
    const { target: { value } } = e;

    if (type === 'category') {
      setSelectedCategoryIds(typeof value === 'string' ? value.split(',') : value);
    } else {
      setSelectedDisciplineIds(typeof value === 'string' ? value.split(',') : value);
    }
  };

  const handleSave = async () => {
    if (!record?.id) return;

    const {
      title, file_name, code, revision_number, revision_date, order,
      watermark, has_header, has_watermark
    } = formData;

    const recordId = String(record.id);

    const { error } = await supabaseClient
      .from('documents')
      .update({ title, file_name, code, revision_number, revision_date, order, watermark, has_header, has_watermark })
      .eq('id', recordId);

    if (!error) {
      await updateRelatedEntries(recordId, selectedCategoryIds, selectedDisciplineIds);
      notify('Document updated successfully');
      redirect('/documents');
    } else {
      notify('Error updating document', { type: 'error' });
    }
  };

  const updateRelatedEntries = async (document_id: string, category_id: string[], discipline_id: string[]) => {
    try {
      await supabaseClient.from('category_documents').delete().eq('document_id', document_id);
      await supabaseClient.from('discipline_documents').delete().eq('document_id', document_id);

      const categoryPromises = category_id.map(catId =>
        supabaseClient.from('category_documents').insert([{ document_id, category_id: catId }])
      );

      const disciplinePromises = discipline_id.map(dId =>
        supabaseClient.from('discipline_documents').insert([{ document_id, discipline_id: dId }])
      );

      await Promise.all([...categoryPromises, ...disciplinePromises]);
    } catch {
      notify('Error updating categories or disciplines', { type: 'error' });
    }
  };

  const handleBack = () => {
    redirect('/documents');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Document
      </Typography>

      <MuiTextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <MuiTextField
        label="File Name"
        name="file_name"
        value={formData.file_name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <MuiTextField
        label="Code"
        name="code"
        value={formData.code}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <MuiTextField
        label="Revision Number"
        name="revision_number"
        type="number"
        value={formData.revision_number}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <MuiTextField
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

      <MuiTextField
        label="Order"
        name="order"
        type="number"
        value={formData.order}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <MuiTextField
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
          value={selectedCategoryIds}
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
            value={selectedDisciplineIds}
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
            {disciplines
            .filter(discipline => discipline.parent_id !== discipline.id) // Added filter
            .map(discipline => (
                <MenuItem key={discipline.id} value={discipline.id}>
                {discipline.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const DocumentEdit = (props: EditProps) => (
  <Edit {...props}>
    <DocumentEditInner />
  </Edit>
);

export default DocumentEdit;
import React, { useState, useEffect } from 'react';
import {
  useNotify,
  useRedirect,
  useRecordContext,
  Edit,
  EditProps
} from 'react-admin';
import { TextField as MuiTextField, MenuItem, Select, FormControl, Box, Typography } from '@mui/material';
import { Button } from '@mui/material';
import supabaseClient from '../../supabaseClient';
import { SelectChangeEvent } from '@mui/material/Select';

type Discipline = {
  id: string;
  name: string;
  parent_id: string;
};

type ContractorType = {
  id: string;
  name: string;
};

type User = {
    id: string;
    first_name: string;
    last_name: string;
  };

const ContractorEditInner = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [contractorTypes, setContractorTypes] = useState<ContractorType[]>([]);
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    contractor_representative_id: '',
    contractor_type_id: '', 
  });

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name || '',
        contractor_representative_id: record.contractor_representative_id || '',
        contractor_type_id: record.contractor_type_id || '',
      });
    }

    const fetchDisciplinesAndSelections = async () => {
      const { data: disciplinesData, error: disciplinesError } = await supabaseClient.from('disciplines').select('id, name, parent_id');
      if (!disciplinesError && disciplinesData) {
        const filteredDisciplines = disciplinesData.filter(discipline => discipline.parent_id !== discipline.id);
        setDisciplines(filteredDisciplines.map(({ id, name, parent_id }) => ({ id, name, parent_id })));
      }

      const { data: selectedDisciplinesData, error: selectedDisciplinesError } = await supabaseClient
        .from('contractor_disciplines')
        .select('discipline_id')
        .eq('contractor_id', record.id);

      if (!selectedDisciplinesError && selectedDisciplinesData) {
        setSelectedDisciplineIds(selectedDisciplinesData.map(item => item.discipline_id));
      }
    };

    const fetchContractorTypes = async () => {
      const { data: contractorTypesData, error: contractorTypesError } = await supabaseClient.from('contractor_types').select('id, name');
      if (!contractorTypesError && contractorTypesData) {
        setContractorTypes(contractorTypesData);
      }
    };

    const fetchUsers = async () => {
      const { data: usersData, error: usersError } = await supabaseClient.from('users').select('id, first_name, last_name');
      if (!usersError && usersData) {
        setUsers(usersData);
      }
    };

    fetchDisciplinesAndSelections();
    fetchContractorTypes();
    fetchUsers(); // Fetch users for the representative dropdown
  }, [record]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultipleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const { target: { value } } = e;
    setSelectedDisciplineIds(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, contractor_representative_id: e.target.value });
  };

  const handleSave = async () => {
    if (!record?.id) return;

    const { name, contractor_representative_id, contractor_type_id } = formData;
    const recordId = String(record.id);

    const { error } = await supabaseClient
      .from('contractors')
      .update({ name, contractor_representative_id, contractor_type_id })
      .eq('id', recordId);

    if (!error) {
      notify('Contractor updated successfully');
      redirect('/contractors');
    } else {
      notify('Error updating contractor', { type: 'error' });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Contractor
      </Typography>

      <MuiTextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      {/* Dropdown for Contractor Representative */}
      <FormControl fullWidth margin="normal">
        <Select
          name="contractor_representative_id"
          value={formData.contractor_representative_id}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>Select a representative</em>
          </MenuItem>
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {`${user.first_name} ${user.last_name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Dropdown for Contractor Type */}
      <FormControl fullWidth margin="normal">
        <Select
          name="contractor_type_id"
          value={formData.contractor_type_id}
          onChange={(e) => setFormData({ ...formData, contractor_type_id: e.target.value })}
        >
          <MenuItem value="">
            <em>Select a Contractor Type</em>
          </MenuItem>
          {contractorTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

       {/* Discipline select */}
       <FormControl fullWidth margin="normal">
        <Select
          multiple
          name="discipline_id"
          value={selectedDisciplineIds}
          onChange={handleMultipleSelectChange}
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => redirect('/contractors')}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const ContractorEdit = (props: EditProps) => (
  <Edit {...props}>
    <ContractorEditInner />
  </Edit>
);

export default ContractorEdit;
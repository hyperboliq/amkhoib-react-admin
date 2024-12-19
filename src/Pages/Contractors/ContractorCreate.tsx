import React, { useState, useEffect } from 'react';
import { Button, useNotify, useRedirect } from 'react-admin';
import { TextField, MenuItem, Select, FormControl, Box, Typography } from '@mui/material';
import supabaseClient from '../../supabaseClient';
import { SelectChangeEvent } from '@mui/material/Select';

type Discipline = {
  id: string;
  name: string;
  parent_id: string;
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
};

type ContractorType = {
  id: string;
  name: string;
};

const ContractorCreate = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [contractorTypes, setContractorTypes] = useState<ContractorType[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    contractor_representative_id: '',
    contractor_type_id: '',
    discipline_ids: [] as string[],
  });

  const notify = useNotify();
  const redirect = useRedirect();

  useEffect(() => {
    const fetchDisciplines = async () => {
      const { data, error } = await supabaseClient.from('disciplines').select('id, name, parent_id');
      if (!error && data) {
        const filteredDisciplines = data.filter(discipline => discipline.parent_id !== discipline.id);
        setDisciplines(filteredDisciplines);
      }
    };

    const fetchUsers = async () => {
      const { data, error } = await supabaseClient.from('users').select('id, first_name, last_name');
      if (!error && data) {
        setUsers(data);
      }
    };

    const fetchContractorTypes = async () => {
      const { data, error } = await supabaseClient.from('contractor_types').select('id, name');
      if (!error && data) {
        setContractorTypes(data);
      }
    };

    fetchDisciplines();
    fetchUsers();
    fetchContractorTypes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultipleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    setFormData({
      ...formData,
      discipline_ids: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSave = async () => {
    const { name, contractor_representative_id, contractor_type_id, discipline_ids } = formData;

    const { data: contractorData, error: contractorError } = await supabaseClient
      .from('contractors')
      .insert([{ name, contractor_representative_id, contractor_type_id }])
      .select();

    if (!contractorError && contractorData) {
      const contractor_id = contractorData[0].id;

      const disciplinePromises = discipline_ids.map(discipline_id =>
        supabaseClient.from('contractor_disciplines').insert([{ contractor_id, discipline_id }])
      );

      const results = await Promise.all(disciplinePromises);
      const hasErrors = results.some(({ error }) => error !== null);

      if (!hasErrors) {
        notify('Contractor created successfully');
        redirect('/contractors');
      } else {
        notify('Error linking contractor to disciplines', { type: 'error' });
      }
    } else {
      notify('Error creating contractor', { type: 'error' });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create New Contractor
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </FormControl>

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

      <FormControl fullWidth margin="normal">
        <Select
          name="contractor_type_id"
          value={formData.contractor_type_id}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>Select a contractor type</em>
          </MenuItem>
          {contractorTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Select
          multiple
          name="discipline_ids"
          value={formData.discipline_ids}
          onChange={handleMultipleSelectChange}
          displayEmpty
          renderValue={selected => {
            if (selected.length === 0) {
              return <em>Select disciplines</em>;
            }
            return disciplines
              .filter(discipline => selected.includes(discipline.id))
              .map(discipline => discipline.name)
              .join(', ');
          }}
        >
          <MenuItem disabled value="">
            <em>Select disciplines</em>
          </MenuItem>
          {disciplines.map(discipline => (
            <MenuItem key={discipline.id} value={discipline.id}>
              {discipline.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button label="Save" onClick={handleSave}></Button>
    </Box>
  );
};

export default ContractorCreate;
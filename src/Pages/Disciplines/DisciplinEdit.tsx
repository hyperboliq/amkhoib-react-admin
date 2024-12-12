import { useEffect, useState } from 'react';
import {
  Edit,
  SimpleForm,
  DateInput,
  TextInput,
  SelectInput,
  EditProps,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import supabaseClient from '../../supabaseClient';

// Define types for Discipline and Parent Options
interface Discipline {
  id: string;
  name: string;
  parent_id: string | null;
  created_at?: string;
}

interface ParentOption {
  id: string;
  name: string;
}

export const DisciplineEdit: React.FC<EditProps> = (props) => {
  const { id } = useParams<{ id: string }>(); // Extract 'id' from URL params
  const [parentOptions, setParentOptions] = useState<ParentOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [record, setRecord] = useState<Discipline | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        // Fetch the current record
        const { data: currentRecord, error: recordError } = await supabaseClient
          .from('disciplines')
          .select('*')
          .eq('id', id)
          .single();

        if (recordError) {
          console.error('Error fetching record:', recordError);
          return;
        }
        setRecord(currentRecord);

        // Fetch all disciplines for parent options
        const { data: disciplines, error: optionsError } = await supabaseClient
          .from('disciplines')
          .select('id, name, parent_id');

        if (optionsError) {
          console.error('Error fetching disciplines:', optionsError);
          return;
        }

        // Filter out the current record from parent options
        const filteredOptions = (disciplines || []).filter(
          (discipline) => discipline.id !== currentRecord.id
        );

        setParentOptions(filteredOptions);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Edit {...props}>
      <SimpleForm>
        <DateInput source="created_at" label="Created At" />
        <TextInput source="name" label="Discipline Name" />
        <SelectInput
          source="parent_id"
          label="Parent Discipline"
          choices={parentOptions}
          optionValue="id"
          optionText="name"
          emptyText="No parent"
          disabled={record?.id === record?.parent_id} // Prevent self-selection
        />
      </SimpleForm>
    </Edit>
  );
};

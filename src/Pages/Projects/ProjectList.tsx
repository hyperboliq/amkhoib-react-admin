import React from 'react';
import { useListController, useRecordContext, useRedirect, useNotify, useDelete } from 'react-admin';
import { Box, Button } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DynamicTable from '../../Components/DynamicTable';
import { TextInput, ReferenceInput, DateInput } from 'react-admin';

// Define the Row interface
interface Row {
    id: string | number;
    name?: string;
    assigned_consultant_id?: string | number;
    assigned_admin_id?: string | number;
    created_at?: string;
    updated_at?: string;
    status_id?: string | number;
    assigned_client_id?: string | number;
    assigned_contractor_id?: string | number;
    location?: string;
    street?: string;
    suburb?: string;
    province?: string;
    planned_start_date?: string;
    planned_end_date?: string;
    city?: string;
    project_logo?: string;
    project_owner?: string;
    [key: string]: any; // Allow for any additional properties
}

const filters = [
    <TextInput source="name" />,
    <ReferenceInput source="assigned_consultant_id" reference="users" />,
    <ReferenceInput source="assigned_admin_id" reference="users" />,
    <DateInput source="created_at" />,
    <DateInput source="updated_at" />,
    <TextInput source="id" />,
    <TextInput source="status_id" />,
    <ReferenceInput source="assigned_client_id" reference="clients" />,
    <TextInput source="assigned_contractor_id" />,
    <TextInput source="location" />,
    <TextInput source="street" />,
    <TextInput source="suburb" />,
    <TextInput source="province" />,
    <TextInput source="planned_start_date" />,
    <TextInput source="planned_end_date" />,
    <TextInput source="city" />,
    <TextInput source="project_logo" />,
    <TextInput source="project_owner" />
];

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'assigned_consultant_id', label: 'Assigned Consultant', minWidth: 150 },
    { id: 'assigned_admin_id', label: 'Assigned Admin', minWidth: 150 },
    { id: 'created_at', label: 'Created At', minWidth: 120 },
    { id: 'updated_at', label: 'Updated At', minWidth: 120 },
    { id: 'status_id', label: 'Status', minWidth: 100 },
    { id: 'assigned_client_id', label: 'Assigned Client', minWidth: 150 },
    { id: 'assigned_contractor_id', label: 'Assigned Contractor', minWidth: 150 },
    { id: 'location', label: 'Location', minWidth: 100 },
    { id: 'street', label: 'Street', minWidth: 150 },
    { id: 'suburb', label: 'Suburb', minWidth: 100 },
    { id: 'province', label: 'Province', minWidth: 100 },
    { id: 'planned_start_date', label: 'Planned Start Date', minWidth: 120 },
    { id: 'planned_end_date', label: 'Planned End Date', minWidth: 120 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'project_logo', label: 'Project Logo', minWidth: 100 },
    { id: 'project_owner', label: 'Project Owner', minWidth: 150 },
];

const ProjectList = () => {
    const listContext = useListController();
    const { data, isLoading, page, perPage, setPage, setPerPage, total } = listContext;

    const redirect = useRedirect();
    const notify = useNotify();
    const [deleteOne] = useDelete();

    const handleEdit = (id: string | number) => {
        redirect('edit', 'projects', id);
    };

    const handleDelete = (id: string | number) => {
        deleteOne('projects', { id: id })
            .then(() => {
                notify('Project deleted successfully', { type: 'success' });
            })
            .catch((error) => {
                notify(`Error: ${error.message}`, { type: 'warning' });
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Ensure data is not undefined and matches the Row type
    const tableData: Row[] = data ? data.map((item: any) => ({
        id: item.id,
        project_logo: item.project_logo,
        name: item.name,
        // assigned_consultant_id: item.assigned_consultant_id,
        // assigned_admin_id: item.assigned_admin_id,
        // created_at: item.created_at,
        // updated_at: item.updated_at,
        // status_id: item.status_id,
        assigned_client_id: item.assigned_client_id,
        assigned_contractor_id: item.assigned_contractor_id,
        // location: item.location,
        // street: item.street,
        // suburb: item.suburb,
        // province: item.province,
        // planned_start_date: item.planned_start_date,
        // planned_end_date: item.planned_end_date,
        // city: item.city,
        project_owner: item.project_owner,
    })) : [];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    onClick={() => {/* Open filter dialog */}}
                >
                    Filter
                </Button>
            </Box>
            <DynamicTable
                columns={columns}
                rows={tableData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export default ProjectList;


// Dashboard.tsx
import React from 'react';
import { Card, CardContent, Typography, Grid, Box, SvgIconProps } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';
import { useAuthenticated } from 'react-admin';

interface DashboardCardProps {
    icon: React.ElementType<SvgIconProps>;
    title: string;
    action: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, action }) => (
    <Card
        onClick={action}
        sx={{
            borderRadius: 2,
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            position: 'relative',
            width: '100%',
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light hover effect
            }
        }}
    >
        <ArrowOutwardIcon
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: 20,
                color: 'primary.main',
            }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Icon sx={{ fontSize: 40, color: 'text.secondary', alignSelf: 'flex-start', marginBottom: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginTop: 'auto' }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

export const Dashboard: React.FC = () => {
    useAuthenticated();
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 10 }}>
            <Typography variant="h4" gutterBottom>
                What would you like to do?
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <DashboardCard
                        icon={PersonIcon}
                        title="Add Clients"
                        action={() => navigate('/clients')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DashboardCard
                        icon={BusinessCenterIcon}
                        title="Manage Projects"
                        action={() => navigate('/projects')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DashboardCard
                        icon={GroupIcon}
                        title="Organise People"
                        action={() => navigate('/people')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DashboardCard
                        icon={AssignmentIcon}
                        title="View Contractors"
                        action={() => navigate('/contractors')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DashboardCard
                        icon={AssignmentIcon}
                        title="Upload & Edit Master Safety Files"
                        action={() => navigate('/safety-files')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DashboardCard
                        icon={FolderIcon}
                        title="Assign Files to Discipline Folders"
                        action={() => navigate('/disciplines')}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;



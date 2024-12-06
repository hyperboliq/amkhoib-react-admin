// Settings.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Title, useAuthenticated } from 'react-admin';

const Settings: React.FC = () => {
    useAuthenticated();
    return (
        <Box sx={{ padding: 2 }}>
            <Card>
            <Title title="Settings"/>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Settings
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Here you can adjust your settings for the application.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Settings;
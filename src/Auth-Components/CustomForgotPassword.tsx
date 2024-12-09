// CustomForgotPasswordPage.tsx
import * as React from 'react';
import { Container, Box, Typography } from '@mui/material'; // Import required components
import { ForgotPasswordForm } from 'ra-supabase';
import logo from '../media/A-icon.png'; // Include the logo

export const CustomForgotPasswordPage = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#071135',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* LOGO HERE */}
                        <img src={logo} alt="Logo" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '50px' }} />
                    </Box>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Reset Your Password
                    </Typography>
                    <Box sx={{ mt: 1, width: '100%' }}>
                        <ForgotPasswordForm />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

CustomForgotPasswordPage.path = '/forgot-password';
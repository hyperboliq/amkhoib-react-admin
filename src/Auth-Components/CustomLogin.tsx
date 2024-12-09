import React, { useState } from 'react';
import { useLogin } from 'react-admin';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import logo from '../media/A-icon.png';

const CustomLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const login = useLogin();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password }).catch((error) => {
            const errorDescription = error?.response?.data?.error_description || 'Your password is incorrect. Please try again.';
            setErrorMessage(errorDescription);
            console.error('Login failed', error);
        });
    };

    const handleForgotPasswordClick = () => {
        navigate('/forgot-password');
    };

    return (
        <Box
            sx={{ minHeight: '100vh', backgroundColor: '#071135',
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
                        <img src={logo} alt="Logo" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '50px' }} />
                    </Box>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Log into Amkhoib's Admin Portal
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            error={Boolean(errorMessage)} // Highlight the field on error
                            helperText={errorMessage} // Display the error message
                            FormHelperTextProps={{ sx: { color: 'error.main' } }}
                            InputProps={{ sx: { '& fieldset': { borderColor: errorMessage ? 'error.main' : 'rgba(0, 0, 0, 0.23)' } } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ color: '#348dc3', cursor: 'pointer' }}
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot Password
                    </Typography>
                    <br />
                    <Typography sx={{ color: '#9199b3', fontSize: 'h5' }}>
                        Trouble Logging in? Please contact support at
                    </Typography>
                    <Typography sx={{ color: '#348dc3', fontSize: 'h5' }}>
                        support@amkhoib.co.za
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default CustomLogin;
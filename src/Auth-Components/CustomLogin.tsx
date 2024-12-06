import React, { useState } from 'react';
import { useLogin } from 'react-admin';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

// Import the logo image
import logo from '../media/A-icon.png';

const CustomLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password }).catch(() => {
            console.error('Login failed');
        });
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
                        {/* LOGO HERE */}
                        <img src={logo} alt="Logo" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '50px' }} />
                    </Box>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Log Into Amkhoib's Admin Portal
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email Address"
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
                </Box>
            </Container>
        </Box>
    );
};

export default CustomLogin;
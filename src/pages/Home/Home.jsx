import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Bem-vindo ao Sistema de Turismo
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
                Esta é a tela inicial (Home). Você está logado!
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Home;

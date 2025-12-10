import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'flex' }, flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => navigate('/')}
                    >
                        Turismo App
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" onClick={() => navigate('/')}>
                            Home
                        </Button>

                        {isAuthenticated && (
                            <>
                                <Button color="inherit" onClick={() => navigate('/pontos/novo')}>
                                    Criar Ponto
                                </Button>
                                <Button color="inherit" onClick={() => navigate('/admin/integracao')}>
                                    Painel de Dados
                                </Button>
                            </>
                        )}

                        {isAuthenticated ? (
                            <Button color="inherit" onClick={handleLogout} variant="outlined" sx={{ ml: 2, borderColor: 'rgba(255,255,255,0.5)' }}>
                                Logout
                            </Button>
                        ) : (
                            <Button color="inherit" onClick={() => navigate('/login')} variant="outlined" sx={{ ml: 2, borderColor: 'rgba(255,255,255,0.5)' }}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;

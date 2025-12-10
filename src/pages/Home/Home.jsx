import React, { useState } from 'react';
import { Container, Grid, TextField, Box, FormControl, InputLabel, Select, MenuItem, Pagination, Typography, Paper, Stack } from '@mui/material';
import Navbar from '../../components/Layout/Navbar';
import PointCard from '../../components/Shared/PointCard';
import { mockPoints } from '../../components/Shared/mockData';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    // Derive unique cities and categories for filters
    const cities = [...new Set(mockPoints.map(p => p.city))];
    const categories = [...new Set(mockPoints.map(p => p.category))];

    // Filter logic
    const filteredPoints = mockPoints.filter(point => {
        const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            point.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = cityFilter ? point.city === cityFilter : true;
        const matchesRating = ratingFilter ? point.rating >= Number(ratingFilter) : true;
        const matchesCategory = categoryFilter ? point.category === categoryFilter : true;

        return matchesSearch && matchesCity && matchesRating && matchesCategory;
    });

    // Pagination logic
    const count = Math.ceil(filteredPoints.length / itemsPerPage);
    const displayedPoints = filteredPoints.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <Navbar />

            {/* Hero / Search Section */}
            <Box sx={{ bgcolor: 'white', py: 6, mb: 4, boxShadow: 1 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold" color="primary">
                        Explore o Brasil
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Descubra os melhores destinos turísticos, avaliados por quem já foi.
                    </Typography>

                    <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center' }}>
                        <TextField
                            label="Pesquisar destinos..."
                            variant="outlined"
                            fullWidth
                            sx={{ maxWidth: 500 }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mb: 8 }}>
                {/* Filters Top Bar */}
                <Paper sx={{ p: 2, mb: 4 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                        <Typography variant="h6" sx={{ minWidth: 'fit-content', mr: 2 }}>Filtros:</Typography>

                        <FormControl fullWidth size="small">
                            <InputLabel>Cidade</InputLabel>
                            <Select
                                value={cityFilter}
                                label="Cidade"
                                onChange={(e) => setCityFilter(e.target.value)}
                            >
                                <MenuItem value="">Todas</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={categoryFilter}
                                label="Categoria"
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <MenuItem value="">Todas</MenuItem>
                                {categories.map(cat => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                            <InputLabel>Nota Mínima</InputLabel>
                            <Select
                                value={ratingFilter}
                                label="Nota Mínima"
                                onChange={(e) => setRatingFilter(e.target.value)}
                            >
                                <MenuItem value="">Todas</MenuItem>
                                <MenuItem value="4.5">4.5+</MenuItem>
                                <MenuItem value="4.0">4.0+</MenuItem>
                                <MenuItem value="3.0">3.0+</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>

                {/* Results Grid */}
                <Grid container spacing={3}>
                    {displayedPoints.map(point => (
                        <Grid item key={point.id} xs={12} sm={6} md={4}>
                            <PointCard point={point} />
                        </Grid>
                    ))}

                    {displayedPoints.length === 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" color="text.secondary" sx={{ py: 8 }}>
                                Nenhum ponto turístico encontrado com esses filtros.
                            </Typography>
                        </Grid>
                    )}
                </Grid>

                {/* Pagination Component */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination count={count} page={page} onChange={handlePageChange} color="primary" />
                </Box>
            </Container>
        </Box>
    );
};

export default Home;

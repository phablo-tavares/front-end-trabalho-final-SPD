import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Grid,
    Alert,
    Snackbar,
    Divider,
    Stack
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import TableViewIcon from '@mui/icons-material/TableView';
import CodeIcon from '@mui/icons-material/Code';

const IntegrationPanel = () => {
    const [file, setFile] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleExport = (format) => {
        // Mock export functionality
        const mockData = {
            points: [
                { id: 1, name: 'Cristo Redentor', city: 'Rio de Janeiro' },
                { id: 2, name: 'Pelourinho', city: 'Salvador' }
            ]
        };

        let content = '';
        let mimeType = '';
        let extension = '';

        switch (format) {
            case 'JSON':
                content = JSON.stringify(mockData, null, 2);
                mimeType = 'application/json';
                extension = 'json';
                break;
            case 'CSV':
                content = 'id,name,city\n1,Cristo Redentor,Rio de Janeiro\n2,Pelourinho,Salvador';
                mimeType = 'text/csv;charset=utf-8;';
                extension = 'csv';
                break;
            case 'XML':
                content = '<points><point><id>1</id><name>Cristo Redentor</name><city>Rio de Janeiro</city></point></points>';
                mimeType = 'application/xml';
                extension = 'xml';
                break;
            default:
                return;
        }

        // Create download link
        const fileName = `pontos_turisticos_export.${extension}`;
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', fileName);
        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        // Cleanup after a small delay to ensure the download triggers
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        setNotification({
            open: true,
            message: `Exportação para ${format} realizada com sucesso!`,
            severity: 'success'
        });
    };

    const handleImport = () => {
        if (!file) {
            setNotification({
                open: true,
                message: 'Por favor, selecione um arquivo para importar.',
                severity: 'warning'
            });
            return;
        }

        // Mock import processing
        setTimeout(() => {
            setNotification({
                open: true,
                message: `Arquivo "${file.name}" importado com sucesso! 2 registros processados.`,
                severity: 'success'
            });
            setFile(null); // Reset file input
        }, 1000);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e', mb: 4 }}>
                Painel de Integração
            </Typography>

            <Grid container spacing={4}>
                {/* Export Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <FileDownloadIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                                Exportar Dados
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                            Selecione o formato desejado para exportar a lista completa de pontos turísticos e hospedagens.
                        </Typography>

                        <Stack spacing={2} sx={{ mt: 'auto' }}>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<CodeIcon />}
                                onClick={() => handleExport('JSON')}
                                fullWidth
                                sx={{ justifyContent: 'flex-start', py: 1.5 }}
                            >
                                Exportar em JSON
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<TableViewIcon />}
                                onClick={() => handleExport('CSV')}
                                fullWidth
                                sx={{ justifyContent: 'flex-start', py: 1.5 }}
                            >
                                Exportar em CSV
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<DescriptionIcon />}
                                onClick={() => handleExport('XML')}
                                fullWidth
                                sx={{ justifyContent: 'flex-start', py: 1.5 }}
                            >
                                Exportar em XML
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Import Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <FileUploadIcon sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                                Importar Dados
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                            Faça upload de arquivos JSON ou XML para atualização em lote. O arquivo deve seguir o esquema padrão.
                        </Typography>

                        <Box
                            sx={{
                                border: '2px dashed #ccc',
                                borderRadius: 2,
                                p: 4,
                                textAlign: 'center',
                                bgcolor: '#fafafa',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: '#f0f0f0', borderColor: '#2e7d32' },
                                mb: 3
                            }}
                            component="label"
                        >
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept=".json,.csv,.xml"
                            />
                            <CloudUploadIcon sx={{ fontSize: 48, color: '#9e9e9e', mb: 1 }} />
                            <Typography variant="body1" color="text.secondary">
                                {file ? file.name : "Clique para selecionar ou arraste o arquivo aqui"}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 1 }}>
                                Suporta: JSON, CSV, XML
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<FileUploadIcon />}
                            onClick={handleImport}
                            disabled={!file}
                            color="success"
                            fullWidth
                            sx={{ mt: 'auto', py: 1.5 }}
                        >
                            Enviar Arquivo
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Notifications */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default IntegrationPanel;

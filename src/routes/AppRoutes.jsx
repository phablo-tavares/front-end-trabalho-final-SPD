import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import LoginRegister from '../pages/Auth/LoginRegister';

const AppRoutes = () => {
    // Basic protection logic placeholder
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRegister />} />
                {/* Public for now as requirement says "Redirecionar para a Home após sucesso", usually implies Home is protected or destination */}
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

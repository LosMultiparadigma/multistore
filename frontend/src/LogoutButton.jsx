import React from 'react';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default LogoutButton;

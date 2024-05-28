import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user);
                setMessage('Inicio de sesión exitoso');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error al iniciar sesión');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Inicio de Sesión</h2>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Iniciar Sesión</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default LoginForm;

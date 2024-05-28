import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user);
                setMessage('Registro exitoso');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error al registrar');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Registrar</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterForm;

// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast'; // <-- Importar el hook

export default function Login() {
    const [username, setUsername] = useState('paciente1'); 
    const [password, setPassword] = useState('1234');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast(); // <-- Usar el hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            showToast('Inicio de sesión exitoso', 'success'); // <-- Éxito
            navigate('/');
        } else {
            showToast('Credenciales inválidas. Intente de nuevo.', 'error'); // <-- Error con Toast
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* ... Tu formulario Tailwind (ahora usando CDN) ... */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Clínica Dental Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}
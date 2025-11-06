// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { auth, logout } = useAuth();

    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-xl font-bold">
                    <Link to="/">Clínica Dental</Link>
                </div>
                <nav>
                    {auth.isLoggedIn ? (
                        <div className="flex space-x-4 items-center">
                            <Link to="/citas" className="hover:text-blue-200">Citas</Link>
                            <span className="text-blue-200">|</span>
                            <span className="text-sm font-semibold">Hola, {auth.username}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-blue-200">Iniciar Sesión</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
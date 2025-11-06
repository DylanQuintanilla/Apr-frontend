// src/auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8080/auth'; 

const AuthContext = createContext();

const decodeJwt = (token) => {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Error decodificando token:", error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        username: null,
        permissions: new Set(),
        accessToken: null,
        refreshToken: null
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const username = localStorage.getItem('username');

        if (accessToken && refreshToken && username) {
            const decoded = decodeJwt(accessToken);
            if (decoded && decoded.authorities) {
                setAuth({
                    isLoggedIn: true,
                    username,
                    permissions: new Set(decoded.authorities.split(',')),
                    accessToken,
                    refreshToken
                });
            }
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/log-in`, { username, password });
            
            const { accessToken, refreshToken, username: user, status } = response.data;
            
            if (status) {
                const decoded = decodeJwt(accessToken);
                const permissionsArray = decoded.authorities ? decoded.authorities.split(',') : [];

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('username', user);

                setAuth({
                    isLoggedIn: true,
                    username: user,
                    permissions: new Set(permissionsArray),
                    accessToken,
                    refreshToken
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error en login:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.clear();
        setAuth({
            isLoggedIn: false,
            username: null,
            permissions: new Set(),
            accessToken: null,
            refreshToken: null
        });
    };

    const hasPermission = (permission) => auth.permissions.has(permission) || auth.permissions.has('ADMIN'); 

    return (
        <AuthContext.Provider value={{ auth, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
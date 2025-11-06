// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'; // Nota: uso de .jsx explícito
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CitasPage from './pages/CitasPage'; 

// Componente para proteger rutas (PrivateRoutes)
const PrivateRoute = ({ element: Element }) => {
    const { auth } = useAuth();
    return auth.isLoggedIn ? <Element /> : <Navigate to="/login" />;
};

function AppRoutes() {
    return (
        <Routes>
            {/* Ruta Pública */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas Privadas */}
            <Route path="/" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/citas" element={<PrivateRoute element={CitasPage} />} />

            {/* Redirección para cualquier otra ruta no definida */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}
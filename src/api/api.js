import axios from 'axios';

// 1. Crear la instancia base de Axios
const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. CONFIGURAR INTERCEPTOR DE PETICIONES
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        
        // Si existe un token, lo adjuntamos a todas las peticiones
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// NOTA: Aquí iría la lógica avanzada de Interceptor de Respuestas (para el Refresh Token)
// La implementaremos más tarde si el 401 es un problema.
// Por ahora, este interceptor se asegura de que el token vaya en cada request.

export default api;
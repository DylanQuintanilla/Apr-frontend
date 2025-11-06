// src/hooks/useToast.js

// Hook para mostrar notificaciones Toast usando la librería Toastify (CDN)
// Asumimos que la librería está cargada globalmente por el CDN (window.Toastify)

export const useToast = () => {
    // La función Toastify se carga en el objeto global 'window'
    const Toastify = window.Toastify;

    const showToast = (message, type = 'success') => {
        if (!Toastify) {
            console.error("Toastify no cargado. Revisa la CDN en index.html");
            return;
        }

        let backgroundColor = '';
        switch (type) {
            case 'success':
                backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)"; // Verde
                break;
            case 'error':
                backgroundColor = "linear-gradient(to right, #ff5f6d, #ffc371)"; // Rojo/Naranja
                break;
            case 'info':
                backgroundColor = "linear-gradient(to right, #4facfe, #00f2fe)"; // Azul
                break;
            default:
                backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)";
        }

        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            style: {
                background: backgroundColor,
            },
            onClick: function(){} // Callback after click
        }).showToast();
    };

    return { showToast };
};
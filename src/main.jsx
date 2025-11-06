import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <-- Importa tu componente principal
import './index.css' // <-- Importa tu CSS (donde está el CDN de Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
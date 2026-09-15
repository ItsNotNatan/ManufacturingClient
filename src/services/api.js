// src/services/api.js
import axios from 'axios';

// Criamos uma "ferramenta de envio" configurada com as tuas chaves do .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // O link do teu Supabase
    headers: {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_API_KEY || '', // A tua chave
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY || ''}`
    }
});

// Interceptor: ajuda a mostrar na consola se houver algum erro de comunicação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro de comunicação com a Base de Dados:", error);
        return Promise.reject(error);
    }
);

export default api;
// src/services/api.js
import axios from 'axios';

// 1. Criamos a ferramenta de envio apontando para o nosso Back-end (localhost:3000/api)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
        // Removemos o 'apikey' e 'Authorization' daqui!
    }
});

// 2. Interceptor: Ajuda a mostrar na consola se houver algum erro de comunicação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro de comunicação com o Back-end:", error);
        return Promise.reject(error);
    }
);

export default api;
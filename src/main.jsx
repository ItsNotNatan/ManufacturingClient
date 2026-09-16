// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // Ferramenta que ativa as rotas

import { rotas } from './routes/routes.jsx'; // O mapa que acabámos de criar
import './index.css'; // Os teus estilos globais

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Removemos o antigo <App /> e colocamos o fornecedor de rotas */}
    <RouterProvider router={rotas} />
  </StrictMode>,
);
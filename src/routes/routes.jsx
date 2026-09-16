// src/routes/routes.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Acompanhamento from '../pages/Acompanhamento/Acompanhamento';
import Aprovacoes from '../pages/Aprovacoes/Aprovacoes';

export const rotas = createBrowserRouter([
    {
        path: '/login',
        element: (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Página de Login</h1>
                <p>Em breve configuraremos esta tela.</p>
            </div>
        )
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                // Redireciona a tela inicial diretamente para as aprovações
                index: true,
                element: <Navigate to="/aprovacoes" replace />
            },
            {
                path: 'acompanhamento',
                element: <Acompanhamento />
            },
            {
                path: 'aprovacoes',
                element: <Aprovacoes />
            }
        ]
    }
]);
// FILE: src/routes/routes.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Acompanhamento from '../pages/Acompanhamento/Acompanhamento';
import Formulario from '../pages/Formulario/Formulario';

// Fases Temporárias (Até criarmos o código CSS puro para elas)
const Placeholder = ({ titulo }) => <div style={{ padding: '2rem' }}><h1>{titulo}</h1></div>;

export const rotas = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to="/acompanhamento" replace /> },
            { path: 'acompanhamento', element: <Acompanhamento /> },
            { path: 'formulario', element: <Formulario /> },
            { path: 'fase1', element: <Placeholder titulo="Fase 1 do Cliente" /> },
            { path: 'fase2', element: <Placeholder titulo="Fase 2 do Cliente" /> },
            { path: 'fase3', element: <Placeholder titulo="Fase 3 do Cliente" /> }
        ]
    }
]);
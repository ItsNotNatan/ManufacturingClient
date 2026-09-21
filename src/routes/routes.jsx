// src/routes/routes.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Importação dos nossos componentes estruturais e páginas
import Layout from '../components/Layout/Layout';
import Formulario from '../pages/Formulario/Formulario';
// 1. Importamos a nossa nova tela de Acompanhamento
import Acompanhamento from '../pages/Acompanhamento/Acompanhamento';

// Criação do mapa de navegação do site
export const rotas = createBrowserRouter([
    {
        // Rota Principal (Mãe)
        // Sempre que o utilizador aceder a qualquer caminho a partir da raiz ('/'),
        // o React vai carregar primeiro o Layout (que tem a Navbar).
        path: '/',
        element: <Layout />,

        // Rotas Filhas (Children)
        // Estas páginas vão aparecer dentro do <Outlet /> do Layout.
        children: [
            {
                // Redirecionamento automático: se o utilizador digitar apenas "localhost:5173/", 
                // ele é atirado automaticamente para a página do formulário.
                index: true,
                element: <Navigate to="/formulario" replace />
            },
            {
                // Quando o URL for /formulario, injeta o componente Formulario
                path: 'formulario',
                element: <Formulario />
            },
            {
                // 2. Rota atualizada para a nossa nova tela!
                // Quando o URL for /acompanhamento, mostra a tabela de transportes
                path: 'acompanhamento',
                element: <Acompanhamento />
            }
        ]
    },
    {
        // Exemplo de uma rota FORA do Layout (não terá a Navbar no topo).
        // Ideal para a futura página de Login.
        path: '/login',
        element: <div><h1>Página de Login Isolada</h1></div>
    }
]);
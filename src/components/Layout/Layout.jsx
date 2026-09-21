// FILE: src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'; // Alterado de Navbar para Sidebar
import './Layout.css';

export default function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
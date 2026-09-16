// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

// Corrigido para "Navbar" minúsculo para não quebrar no Render/Vercel
import Navbar from '../Navbar/Navbar';
import './Layout.css';

export default function Layout() {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
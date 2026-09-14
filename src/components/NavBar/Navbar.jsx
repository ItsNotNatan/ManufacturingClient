// src/components/Navbar/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Truck, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import './Navbar.css'; // Criaremos este CSS a seguir (opcional se usares Tailwind depois)

export default function Navbar() {
    return (
        <header className="app-header">
            {/* Logotipo / Nome do App */}
            <div className="logo-container">
                <Truck className="text-primary" size={28} />
                <span>Nexus<span className="text-primary">Log</span></span>
                <span className="badge-role">Admin</span>
            </div>

            {/* Links de Navegação */}
            <nav className="nav-links">
                {/* O NavLink adiciona a classe 'active' automaticamente quando a URL bate certo */}
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <LayoutDashboard size={18} /> Dashboard
                </NavLink>

                <NavLink to="/formulario" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <FileText size={18} /> Nova Solicitação
                </NavLink>
            </nav>

            {/* Perfil do Utilizador */}
            <div className="user-profile">
                <div className="user-info">
                    <span>Programador</span>
                    <button className="btn-logout">
                        <LogOut size={16} /> Sair
                    </button>
                </div>
                <div className="avatar">P</div>
            </div>
        </header>
    );
}
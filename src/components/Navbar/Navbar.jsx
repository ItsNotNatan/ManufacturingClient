// src/components/Navbar/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Factory, ListTree, ClipboardCheck, LogOut } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const lidarComLogout = () => {
        if (window.confirm("Desejas realmente sair do sistema?")) {
            console.log("Utilizador fez logout.");
        }
    };

    return (
        <header className="app-header">
            <div className="logo-container">
                <Factory className="text-primary" size={28} />
                <span>Nexus<span className="text-primary">Factory</span></span>
                <span className="badge-role">Logística</span>
            </div>

            <nav className="nav-links">
                <NavLink
                    to="/acompanhamento"
                    className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                    <ListTree size={18} /> Acompanhamento
                </NavLink>

                <NavLink
                    to="/aprovacoes"
                    className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                    <ClipboardCheck size={18} /> Aprovações
                </NavLink>
            </nav>

            <div className="user-profile">
                <div className="user-info">
                    <span>Equipe Logística</span>
                    <button className="btn-logout" onClick={lidarComLogout}>
                        <LogOut size={14} /> Sair do Sistema
                    </button>
                </div>
                <div className="avatar">
                    LG
                </div>
            </div>
        </header>
    );
}
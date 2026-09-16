// src/pages/Acompanhamento/Acompanhamento.jsx
import React from 'react';
import { ListTree } from 'lucide-react';

export default function Acompanhamento() {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.4s ease-in-out' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ListTree size={28} color="#2563eb" />
                    Acompanhamento Logístico
                </h2>
                <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
                    Visão geral de todos os projetos e solicitações em andamento.
                </p>
            </div>

            <div style={{ background: 'white', padding: '3rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280' }}>
                A interface de acompanhamento será construída aqui.
            </div>
        </div>
    );
}
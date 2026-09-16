// src/pages/Aprovacoes/Aprovacoes.jsx
import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle, XCircle, Clock } from 'lucide-react';
import './Aprovacoes.css';

export default function Aprovacoes() {
    // 1. ESTADO: Lista de solicitações pendentes (Mock Data)
    const [pendentes, setPendentes] = useState([
        {
            id: 'PRJ-2026-A',
            solicitante: 'João Silva',
            setor: 'Soldagem (Body Shop)',
            equipamento: 'Mesa Giratória 180°',
            prioridade: 'Alta',
            data: '14/09/2026'
        },
        {
            id: 'PRJ-2026-D',
            solicitante: 'Ana Costa',
            setor: 'Montagem Final',
            equipamento: 'Pinça de Solda X-Type',
            prioridade: 'Crítica',
            data: '14/09/2026'
        },
        {
            id: 'PRJ-2026-E',
            solicitante: 'Carlos Souza',
            setor: 'Engenharia de Processos',
            equipamento: 'Computador de Mesa (Avançado)',
            prioridade: 'Média',
            data: '13/09/2026'
        }
    ]);

    // 2. FUNÇÕES DE AÇÃO
    // Função para aprovar: Remove o item da lista de pendentes
    const handleAprovar = (id) => {
        // Num cenário real, aqui faríamos um api.put(`/solicitacoes/${id}`, { status: 'aprovado' })
        if (window.confirm(`Tens a certeza que queres APROVAR a solicitação ${id}?`)) {
            // Filtra a lista, mantendo apenas os itens com ID diferente do aprovado
            setPendentes(pendentes.filter(item => item.id !== id));
            alert(`Solicitação ${id} aprovada com sucesso!`);
        }
    };

    // Função para rejeitar: Remove o item da lista de pendentes
    const handleRejeitar = (id) => {
        // Num cenário real, aqui faríamos um api.put(`/solicitacoes/${id}`, { status: 'rejeitado' })
        if (window.confirm(`Tens a certeza que queres REJEITAR a solicitação ${id}?`)) {
            setPendentes(pendentes.filter(item => item.id !== id));
            alert(`Solicitação ${id} rejeitada.`);
        }
    };

    // 3. RENDERIZAÇÃO DA INTERFACE
    return (
        <div className="aprovacoes-container">
            <div className="aprovacoes-header">
                <h2 className="aprovacoes-title">
                    <ClipboardCheck size={28} color="#2563eb" />
                    Central de Aprovações
                </h2>
                <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
                    Gere as solicitações de equipamentos pendentes de autorização.
                </p>
            </div>

            <div className="table-container">
                <table className="aprovacoes-table">
                    <thead>
                        <tr>
                            <th>Cód. Projeto</th>
                            <th>Solicitante / Setor</th>
                            <th>Equipamento</th>
                            <th>Prioridade</th>
                            <th>Data</th>
                            <th style={{ textAlign: 'center' }}>Ação Gestor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendentes.length > 0 ? (
                            pendentes.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: '700', color: '#1f2937' }}>{item.id}</td>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{item.solicitante}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{item.setor}</div>
                                    </td>
                                    <td>{item.equipamento}</td>
                                    <td>
                                        <span style={{
                                            color: item.prioridade === 'Crítica' ? '#dc2626' : '#d97706',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            {item.prioridade === 'Crítica' && <Clock size={14} />}
                                            {item.prioridade}
                                        </span>
                                    </td>
                                    <td>{item.data}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-aprovar"
                                                onClick={() => handleAprovar(item.id)}
                                                title="Aprovar Solicitação"
                                            >
                                                <CheckCircle size={16} /> Aprovar
                                            </button>
                                            <button
                                                className="btn-rejeitar"
                                                onClick={() => handleRejeitar(item.id)}
                                                title="Rejeitar Solicitação"
                                            >
                                                <XCircle size={16} /> Rejeitar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty-state">
                                    <ClipboardCheck size={48} color="#d1d5db" style={{ marginBottom: '1rem' }} />
                                    <h3>Tudo em dia!</h3>
                                    <p>Não há mais solicitações pendentes de aprovação.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
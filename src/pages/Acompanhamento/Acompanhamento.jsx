// src/pages/Acompanhamento/Acompanhamento.jsx
import React, { useState } from 'react';
import { Search, Filter, Eye, Truck } from 'lucide-react';
import './Acompanhamento.css';

export default function Acompanhamento() {
    const [pesquisa, setPesquisa] = useState('');

    // Dados simulados para visualizares a tabela
    const [solicitacoes] = useState([
        { id: 'ATM-1023', solicitante: 'João Silva', veiculo: 'Fiorino', destino: 'São Paulo/SP', data: '14/09/2026', status: 'pendente' },
        { id: 'ATM-1024', solicitante: 'Maria Costa', veiculo: 'Caminhão 3/4', destino: 'Belo Horizonte/MG', data: '15/09/2026', status: 'transito' },
        { id: 'ATM-1025', solicitante: 'Carlos Souza', veiculo: 'Van', destino: 'Rio de Janeiro/RJ', data: '12/09/2026', status: 'concluido' },
    ]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'pendente': return 'status-pendente';
            case 'transito': return 'status-transito';
            case 'concluido': return 'status-concluido';
            default: return 'status-pendente';
        }
    };

    const formatarStatus = (status) => {
        if (status === 'transito') return 'Em Trânsito';
        return status;
    };

    const solicitacoesFiltradas = solicitacoes.filter(item =>
        item.id.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.solicitante.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className="acompanhamento-container">
            <div className="acompanhamento-header">
                <h2 className="acompanhamento-title">Acompanhamento de Transportes</h2>
            </div>

            <div className="acompanhamento-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar por nº do ATM ou Solicitante..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline">
                    <Filter size={18} /> Filtrar
                </button>
            </div>

            <div className="table-container">
                <table className="tracking-table">
                    <thead>
                        <tr>
                            <th>Nº Pedido</th>
                            <th>Solicitante</th>
                            <th>Veículo</th>
                            <th>Destino</th>
                            <th>Data Prevista</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoesFiltradas.length > 0 ? (
                            solicitacoesFiltradas.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: '600' }}>{item.id}</td>
                                    <td>{item.solicitante}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Truck size={14} color="#6b7280" /> {item.veiculo}
                                        </div>
                                    </td>
                                    <td>{item.destino}</td>
                                    <td>{item.data}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(item.status)}`}>
                                            {formatarStatus(item.status)}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="btn-icon" title="Ver Detalhes">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                    Nenhuma solicitação encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
// src/pages/Acompanhamento/Acompanhamento.jsx
import React, { useState } from 'react';
import { Search, Filter, Truck } from 'lucide-react';

// Importamos o componente do Modal
import ModalDetalhes from '../../components/ModalDetalhes/ModalDetalhes';

import './Acompanhamento.css';

export default function Acompanhamento() {
    const [pesquisa, setPesquisa] = useState('');

    // ESTADO DO MODAL: Guarda a solicitação clicada
    const [itemSelecionado, setItemSelecionado] = useState(null);

    // Dados de exemplo
    const [solicitacoes] = useState([
        { id: 'ATM-1023', solicitante: 'João Silva', veiculo: 'Fiorino', destino: 'São Paulo/SP', data: '14/09/2026', status: 'pendente', faseAtual: 1 },
        { id: 'ATM-1024', solicitante: 'Maria Costa', veiculo: 'Caminhão 3/4', destino: 'Belo Horizonte/MG', data: '15/09/2026', status: 'transito', faseAtual: 2 },
        { id: 'ATM-1025', solicitante: 'Carlos Souza', veiculo: 'Van', destino: 'Rio de Janeiro/RJ', data: '12/09/2026', status: 'concluido', faseAtual: 3 },
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
        if (status === 'transito') return 'Em Planejamento';
        if (status === 'pendente') return 'Em Orçamento';
        if (status === 'concluido') return 'Em Manufatura';
        return status;
    };

    const solicitacoesFiltradas = solicitacoes.filter(item =>
        item.id.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.solicitante.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className="acompanhamento-container">
            <div className="acompanhamento-header">
                <div>
                    <h2 className="acompanhamento-title">Acompanhamento de Solicitações</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Dá um duplo clique sobre um pedido para veres os detalhes.
                    </p>
                </div>
            </div>

            <div className="acompanhamento-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar por nº do Projeto ou Solicitante..."
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
                            <th>Status Geral</th>
                            <th style={{ textAlign: 'center' }}>Fase Atual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoesFiltradas.length > 0 ? (
                            solicitacoesFiltradas.map((item) => (
                                <tr
                                    key={item.id}
                                    className="linha-clicavel"
                                    onDoubleClick={() => setItemSelecionado(item)}
                                    title="Dá um duplo clique para abrir"
                                >
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
                                        <span className="badge-fase">
                                            Fase {item.faseAtual}
                                        </span>
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

            {itemSelecionado && (
                <ModalDetalhes
                    item={itemSelecionado}
                    aoFechar={() => setItemSelecionado(null)}
                />
            )}

        </div>
    );
}
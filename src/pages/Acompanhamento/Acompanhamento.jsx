// =================================================================
// ARQUIVO: src/pages/Acompanhamento/Acompanhamento.jsx
// DESCRIÇÃO: Painel de acompanhamento com visual Premium e terminologia atualizada (Transmissões)
// =================================================================
import React, { useState } from 'react';
import {
    Search, Filter, Briefcase, LayoutDashboard,
    TrendingUp, CheckCircle2, Clock, Activity, Factory
} from 'lucide-react';

import ModalDetalhes from '../../components/ModalDetalhes/ModalDetalhes';
import './Acompanhamento.css';

export default function Acompanhamento() {
    const [pesquisa, setPesquisa] = useState('');
    const [itemSelecionado, setItemSelecionado] = useState(null);

    // MOCK DATA: IDs atualizados para refletir Códigos de Transmissão reais da fábrica
    const [solicitacoes] = useState([
        { id: 'VW427-PATAGONIA-0041-2025', scl: 'João Silva', centroCusto: 'BRBCBBA47', nomeCentroCusto: 'GM_SPIN_MCM2_CLOSURES', status: 'pendente', faseAtual: 1, progresso: 25 },
        { id: 'BB37-VW-ANCH-UB2-0003-2025', scl: 'Maria Costa', centroCusto: 'BRBCBBA48', nomeCentroCusto: 'SHUTTLE MODELO X1H', status: 'transito', faseAtual: 2, progresso: 65 },
        { id: 'VW-B38-ANCHIETA-0006-2025', scl: 'Carlos Souza', centroCusto: 'BRBCBBA49', nomeCentroCusto: 'RETOOLING JEEP SUSP 291', status: 'concluido', faseAtual: 3, progresso: 80 },
        { id: 'EV1322-SUPORTE-SENSOR-V2', scl: 'Ana Costa', centroCusto: 'BRBCBBA51', nomeCentroCusto: 'GM GMI MCM - Closures', status: 'pendente', faseAtual: 1, progresso: 10 },
    ]);

    // Lógicas de formatação de cores e ícones consoante o status
    const getStatusInfo = (status) => {
        if (status === 'pendente') return { classe: 'status-pendente', texto: 'Em Orçamento', icone: <Clock size={14} /> };
        if (status === 'transito') return { classe: 'status-transito', texto: 'Em Planejamento', icone: <Activity size={14} /> };
        if (status === 'concluido') return { classe: 'status-concluido', texto: 'Em Manufatura', icone: <CheckCircle2 size={14} /> };
        return { classe: 'status-pendente', texto: 'Pendente', icone: <Clock size={14} /> };
    };

    // Traduz o número da fase para o seu nome amigável
    const getNomeDaFase = (fase) => {
        if (fase === 1) return 'Orçamento';
        if (fase === 2) return 'Planejamento';
        if (fase === 3) return 'Manufatura';
        return 'Geral';
    };

    // Filtra a lista com base no input do utilizador
    const solicitacoesFiltradas = solicitacoes.filter(item =>
        item.id.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.scl.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.centroCusto.toLowerCase().includes(pesquisa.toLowerCase())
    );

    // Cálculos para os cartões de resumo (KPIs)
    const totalPedidos = solicitacoes.length;
    const emProgresso = solicitacoes.filter(s => s.faseAtual < 3).length;
    const emManufatura = solicitacoes.filter(s => s.faseAtual === 3).length;

    return (
        <div className="acompanhamento-container">
            {/* CABEÇALHO */}
            <div className="acompanhamento-header">
                <div>
                    <h2 className="acompanhamento-title">
                        <LayoutDashboard color="#2563eb" size={28} />
                        Acompanhamento de Projetos
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        Dê um duplo clique numa linha para abrir os detalhes da transmissão e interagir com o fluxo.
                    </p>
                </div>
            </div>

            {/* CARTÕES DE RESUMO (KPIs) */}
            <div className="kpi-wrapper">
                <div className="kpi-card">
                    <div className="kpi-icon-box" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                        <Briefcase size={24} />
                    </div>
                    <div className="kpi-details">
                        <h4>Total de Projetos</h4>
                        <span>{totalPedidos}</span>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-icon-box" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className="kpi-details">
                        <h4>Em Preparação (Fase 1 e 2)</h4>
                        <span>{emProgresso}</span>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                        <Factory size={24} />
                    </div>
                    <div className="kpi-details">
                        <h4>Em Manufatura (Fase 3)</h4>
                        <span>{emManufatura}</span>
                    </div>
                </div>
            </div>

            {/* BARRA DE PESQUISA */}
            <div className="acompanhamento-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar por Transmissão, SCL ou Centro de Custo..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid #cbd5e1', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}>
                    <Filter size={18} /> Filtrar
                </button>
            </div>

            {/* TABELA DE DADOS */}
            <div className="table-container">
                <table className="tracking-table">
                    <thead>
                        <tr>
                            {/* Título alterado de "Nº Pedido" para "Transmissão / Eventual" */}
                            <th>Transmissão / Eventual</th>
                            <th>SCL / Responsável</th>
                            <th>Centro de Custo</th>
                            <th>Status Geral</th>
                            <th style={{ width: '220px' }}>Progresso da Fase Atual</th>
                            <th style={{ textAlign: 'center' }}>Fase Atual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoesFiltradas.length > 0 ? (
                            solicitacoesFiltradas.map((item) => {
                                const statusInfo = getStatusInfo(item.status);

                                return (
                                    <tr
                                        key={item.id}
                                        className="linha-clicavel"
                                        onDoubleClick={() => setItemSelecionado(item)}
                                        title="Abrir detalhes do projeto"
                                    >
                                        <td style={{ fontWeight: '800', color: '#2563eb' }}>{item.id}</td>

                                        <td style={{ fontWeight: '600' }}>{item.scl}</td>

                                        <td>
                                            <div style={{ fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Briefcase size={14} color="#64748b" /> {item.centroCusto}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                                                {item.nomeCentroCusto}
                                            </div>
                                        </td>

                                        <td>
                                            <span className={`status-badge ${statusInfo.classe}`}>
                                                {statusInfo.icone} {statusInfo.texto}
                                            </span>
                                        </td>

                                        {/* BARRA DE PROGRESSO PREMIUM */}
                                        <td>
                                            <div className="progress-wrapper">
                                                <div className="progress-labels">
                                                    <span className="progress-percentage">{item.progresso}% Concluído</span>
                                                    <span className="progress-phase-name">{getNomeDaFase(item.faseAtual)}</span>
                                                </div>
                                                <div className="progress-track">
                                                    <div
                                                        className="progress-fill"
                                                        style={{
                                                            width: `${item.progresso}%`,
                                                            backgroundColor: item.progresso === 100 ? '#10b981' : '#3b82f6'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>

                                        <td style={{ textAlign: 'center' }}>
                                            <span className="badge-fase">
                                                Fase {item.faseAtual}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                                    <Search size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                                    Nenhuma transmissão encontrada com os filtros atuais.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {itemSelecionado && (
                <ModalDetalhes
                    item={itemSelecionado}
                    aoFechar={() => setItemSelecionado(null)}
                />
            )}
        </div>
    );
}
// =================================================================
// ARQUIVO: src/pages/Acompanhamento/Acompanhamento.jsx
// DESCRIÇÃO: Painel de acompanhamento com Barra de Progresso Segmentada e Global
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

    // MOCK DATA: 'progresso' representa a % dentro da faseAtual
    const [solicitacoes] = useState([
        { id: 'VW427-PATAGONIA-0041-2025', scl: 'João Silva', centroCusto: 'BRBCBBA47', nomeCentroCusto: 'GM_SPIN_MCM2_CLOSURES', status: 'pendente', faseAtual: 1, progresso: 50 },
        { id: 'BB37-VW-ANCH-UB2-0003-2025', scl: 'Maria Costa', centroCusto: 'BRBCBBA48', nomeCentroCusto: 'SHUTTLE MODELO X1H', status: 'transito', faseAtual: 2, progresso: 30 },
        { id: 'VW-B38-ANCHIETA-0006-2025', scl: 'Carlos Souza', centroCusto: 'BRBCBBA49', nomeCentroCusto: 'RETOOLING JEEP SUSP 291', status: 'concluido', faseAtual: 3, progresso: 80 },
        { id: 'EV1322-SUPORTE-SENSOR-V2', scl: 'Ana Costa', centroCusto: 'BRBCBBA51', nomeCentroCusto: 'GM GMI MCM - Closures', status: 'concluido', faseAtual: 3, progresso: 100 },
    ]);

    const getStatusInfo = (status) => {
        if (status === 'pendente') return { classe: 'status-pendente', texto: 'Em Orçamento', icone: <Clock size={14} /> };
        if (status === 'transito') return { classe: 'status-transito', texto: 'Em Planejamento', icone: <Activity size={14} /> };
        if (status === 'concluido') return { classe: 'status-concluido', texto: 'Em Manufatura', icone: <CheckCircle2 size={14} /> };
        return { classe: 'status-pendente', texto: 'Pendente', icone: <Clock size={14} /> };
    };

    const getNomeDaFase = (fase) => {
        if (fase === 1) return 'Orçamento';
        if (fase === 2) return 'Planejamento';
        if (fase === 3) return 'Manufatura';
        return 'Concluído';
    };

    // ✨ LÓGICA MATEMÁTICA: Calcula se o segmento atual deve estar a 100%, 0% ou no valor do progresso
    const getProgressoSegmento = (faseDoSegmento, faseAtual, progressoNaFaseAtual) => {
        if (faseAtual > faseDoSegmento) return 100; // Fase já concluída
        if (faseAtual === faseDoSegmento) return progressoNaFaseAtual; // Fase em andamento
        return 0; // Fase futura
    };

    // ✨ LÓGICA MATEMÁTICA: Calcula o avanço global (1/3 por cada fase completa)
    const calcularProgressoGlobal = (faseAtual, progressoAtual) => {
        const progressoTotal = ((faseAtual - 1) * 100 + progressoAtual) / 3;
        return Math.round(progressoTotal);
    };

    const solicitacoesFiltradas = solicitacoes.filter(item =>
        item.id.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.scl.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.centroCusto.toLowerCase().includes(pesquisa.toLowerCase())
    );

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
                            <th>Transmissão / Eventual</th>
                            <th>SCL / Responsável</th>
                            <th>Centro de Custo</th>
                            <th>Status Geral</th>
                            <th style={{ width: '250px' }}>Evolução do Projeto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoesFiltradas.length > 0 ? (
                            solicitacoesFiltradas.map((item) => {
                                const statusInfo = getStatusInfo(item.status);
                                const progressoGlobal = calcularProgressoGlobal(item.faseAtual, item.progresso);

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

                                        {/* BARRA DE PROGRESSO SEGMENTADA E GLOBAL */}
                                        <td>
                                            <div className="progress-wrapper">
                                                <div className="progress-labels">
                                                    <span className="progress-percentage">{item.progresso}% da Fase {item.faseAtual}</span>
                                                    <span className="progress-phase-name" style={{ color: '#2563eb' }}>Global: {progressoGlobal}%</span>
                                                </div>

                                                <div className="multi-progress-wrapper">
                                                    {/* Fase 1: Orçamento (Azul) */}
                                                    <div className="multi-progress-segment" title="Orçamento">
                                                        <div className="multi-progress-fill" style={{ width: `${getProgressoSegmento(1, item.faseAtual, item.progresso)}%`, backgroundColor: '#3b82f6' }}></div>
                                                    </div>
                                                    {/* Fase 2: Planejamento (Laranja) */}
                                                    <div className="multi-progress-segment" title="Planejamento">
                                                        <div className="multi-progress-fill" style={{ width: `${getProgressoSegmento(2, item.faseAtual, item.progresso)}%`, backgroundColor: '#f59e0b' }}></div>
                                                    </div>
                                                    {/* Fase 3: Manufatura (Verde) */}
                                                    <div className="multi-progress-segment" title="Manufatura">
                                                        <div className="multi-progress-fill" style={{ width: `${getProgressoSegmento(3, item.faseAtual, item.progresso)}%`, backgroundColor: '#10b981' }}></div>
                                                    </div>
                                                </div>

                                                <div className="multi-progress-legends">
                                                    <span style={{ color: item.faseAtual >= 1 ? '#3b82f6' : '#cbd5e1' }}>Orç.</span>
                                                    <span style={{ color: item.faseAtual >= 2 ? '#f59e0b' : '#cbd5e1' }}>Plan.</span>
                                                    <span style={{ color: item.faseAtual >= 3 ? '#10b981' : '#cbd5e1' }}>Fab.</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                                    <Search size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                                    Nenhuma transmissão encontrada com os filtros atuais.
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
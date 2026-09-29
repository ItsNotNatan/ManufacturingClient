// =================================================================
// ARQUIVO: src/pages/Acompanhamento/Acompanhamento.jsx
// DESCRIÇÃO: Painel de acompanhamento com Paginação, Projetos Cancelados e Barra Dinâmica
// =================================================================
import React, { useState, useEffect } from 'react';
import {
    Search, Filter, Briefcase, LayoutDashboard,
    TrendingUp, CheckCircle2, Factory, Calculator, CalendarCheck, XCircle,
    ChevronLeft, ChevronRight // Ícones novos para a paginação
} from 'lucide-react';

import ModalDetalhes from '../../components/ModalDetalhes/ModalDetalhes';
import './Acompanhamento.css';

export default function Acompanhamento() {
    const [pesquisa, setPesquisa] = useState('');
    const [itemSelecionado, setItemSelecionado] = useState(null);

    // ✨ ESTADOS DE PAGINAÇÃO
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4; // Número de projetos exibidos por cada página

    const [solicitacoes] = useState([
        { id: 'VW427-PATAGONIA-0041-2025', scl: 'João Silva', centroCusto: 'BRBCBBA47', nomeCentroCusto: 'GM_SPIN_MCM2_CLOSURES', status: 'pendente', faseAtual: 1, progresso: 50 },
        { id: 'BB37-VW-ANCH-UB2-0003-2025', scl: 'Maria Costa', centroCusto: 'BRBCBBA48', nomeCentroCusto: 'SHUTTLE MODELO X1H', status: 'transito', faseAtual: 2, progresso: 30 },
        { id: 'VW-B38-ANCHIETA-0006-2025', scl: 'Carlos Souza', centroCusto: 'BRBCBBA49', nomeCentroCusto: 'RETOOLING JEEP SUSP 291', status: 'concluido', faseAtual: 3, progresso: 80 },
        { id: 'EV1322-SUPORTE-SENSOR-V2', scl: 'Ana Costa', centroCusto: 'BRBCBBA51', nomeCentroCusto: 'GM GMI MCM - Closures', status: 'concluido', faseAtual: 3, progresso: 100 },
        { id: 'EV1400-ESTRUTURA-BASE-A', scl: 'Tiago Mendes', centroCusto: 'BRBCBBA60', nomeCentroCusto: 'NOVO CHASSI JEEP', status: 'cancelado', faseAtual: 1, progresso: 15 },
        { id: 'VW200-PORTA-TRAS-0021-2026', scl: 'Luísa Marques', centroCusto: 'BRBCBBA61', nomeCentroCusto: 'VW POLO PORTAS', status: 'cancelado', faseAtual: 2, progresso: 40 },
    ]);

    // ✨ EFEITO: Sempre que o utilizador faz uma nova pesquisa, voltamos à página 1
    useEffect(() => {
        setPaginaAtual(1);
    }, [pesquisa]);

    const getStatusInfo = (faseAtual, progresso, statusGeral) => {
        if (statusGeral === 'cancelado') {
            return { classe: 'status-cancelado', texto: 'Cancelado', icone: <XCircle size={14} /> };
        }
        if (faseAtual === 3 && progresso === 100) {
            return { classe: 'status-concluido', texto: 'Projeto Concluído', icone: <CheckCircle2 size={14} /> };
        }
        if (faseAtual === 1) return { classe: 'status-pendente', texto: 'Em Orçamento', icone: <Calculator size={14} /> };
        if (faseAtual === 2) return { classe: 'status-transito', texto: 'Em Planejamento', icone: <CalendarCheck size={14} /> };
        if (faseAtual === 3) return { classe: 'status-concluido', texto: 'Em Manufatura', icone: <Factory size={14} /> };

        return { classe: 'status-pendente', texto: 'Desconhecido', icone: <Briefcase size={14} /> };
    };

    const getNomeDaFase = (fase) => {
        if (fase === 1) return 'Orçamento';
        if (fase === 2) return 'Planejamento';
        if (fase === 3) return 'Manufatura';
        return 'Concluído';
    };

    const getProgressoSegmento = (faseDoSegmento, faseAtual, progressoNaFaseAtual) => {
        if (faseAtual > faseDoSegmento) return 100;
        if (faseAtual === faseDoSegmento) return progressoNaFaseAtual;
        return 0;
    };

    const getCorSegmento = (faseDoSegmento, item) => {
        if (item.status === 'cancelado' && item.faseAtual === faseDoSegmento) return '#ef4444';
        if (faseDoSegmento === 1) return '#3b82f6';
        if (faseDoSegmento === 2) return '#f59e0b';
        if (faseDoSegmento === 3) return '#10b981';
        return '#cbd5e1';
    };

    const calcularProgressoGlobal = (faseAtual, progressoAtual) => {
        const progressoTotal = ((faseAtual - 1) * 100 + progressoAtual) / 3;
        return Math.round(progressoTotal);
    };

    // 1. Filtramos todos os dados com base na pesquisa
    const solicitacoesFiltradas = solicitacoes.filter(item =>
        item.id.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.scl.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.centroCusto.toLowerCase().includes(pesquisa.toLowerCase())
    );

    // ✨ 2. CÁLCULOS DE PAGINAÇÃO
    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;

    // Extrai apenas os itens que pertencem à página atual
    const itensAtuais = solicitacoesFiltradas.slice(indicePrimeiroItem, indiceUltimoItem);

    // Calcula o total de páginas
    const totalPaginas = Math.ceil(solicitacoesFiltradas.length / itensPorPagina);

    // Função para mudar de página
    const mudarPagina = (numeroPagina) => {
        if (numeroPagina > 0 && numeroPagina <= totalPaginas) {
            setPaginaAtual(numeroPagina);
        }
    };

    const totalPedidos = solicitacoes.length;
    const emProgresso = solicitacoes.filter(s => s.faseAtual < 3 && s.status !== 'cancelado').length;
    const emManufatura = solicitacoes.filter(s => s.faseAtual === 3 && s.status !== 'cancelado').length;

    return (
        <div className="acompanhamento-container">
            <div className="acompanhamento-header">
                <div>
                    <h2 className="acompanhamento-title">
                        <LayoutDashboard color="#2563eb" size={28} />
                        Acompanhamento de Processos
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        Dê um duplo clique numa linha para abrir os detalhes da transmissão e interagir com o fluxo.
                    </p>
                </div>
            </div>

            {/* CARTÕES DE RESUMO */}
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
                        <h4>Em Preparação (Ativos)</h4>
                        <span>{emProgresso}</span>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                        <Factory size={24} />
                    </div>
                    <div className="kpi-details">
                        <h4>Em Manufatura (Ativos)</h4>
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
                        {/* ITERAMOS SOBRE 'itensAtuais' E NÃO SOBRE TODOS */}
                        {itensAtuais.length > 0 ? (
                            itensAtuais.map((item) => {
                                const statusInfo = getStatusInfo(item.faseAtual, item.progresso, item.status);
                                const progressoGlobal = calcularProgressoGlobal(item.faseAtual, item.progresso);
                                const foiCancelado = item.status === 'cancelado';

                                return (
                                    <tr
                                        key={item.id}
                                        className="linha-clicavel"
                                        onDoubleClick={() => setItemSelecionado(item)}
                                        title="Abrir detalhes do projeto"
                                    >
                                        <td style={{ fontWeight: '800', color: foiCancelado ? '#94a3b8' : '#2563eb' }}>
                                            <span style={{ textDecoration: foiCancelado ? 'line-through' : 'none' }}>
                                                {item.id}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '600', color: foiCancelado ? '#94a3b8' : 'inherit' }}>{item.scl}</td>
                                        <td>
                                            <div style={{ fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: foiCancelado ? 0.6 : 1 }}>
                                                <Briefcase size={14} color="#64748b" /> {item.centroCusto}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', opacity: foiCancelado ? 0.6 : 1 }}>
                                                {item.nomeCentroCusto}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${statusInfo.classe}`}>
                                                {statusInfo.icone} {statusInfo.texto}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress-wrapper">
                                                <div className="progress-labels">
                                                    {foiCancelado ? (
                                                        <span className="progress-percentage" style={{ color: '#e11d48' }}>
                                                            Cancelado na Fase {item.faseAtual}
                                                        </span>
                                                    ) : (
                                                        <span className="progress-percentage">
                                                            {item.progresso}% da Fase {item.faseAtual}
                                                        </span>
                                                    )}
                                                    <span className="progress-phase-name" style={{ color: foiCancelado ? '#ef4444' : '#2563eb' }}>
                                                        Global: {progressoGlobal}%
                                                    </span>
                                                </div>

                                                <div className="multi-progress-wrapper" style={{ opacity: foiCancelado ? 0.8 : 1 }}>
                                                    <div className="multi-progress-segment" title="Orçamento">
                                                        <div className="multi-progress-fill" style={{ width: `${getProgressoSegmento(1, item.faseAtual, item.progresso)}%`, backgroundColor: getCorSegmento(1, item) }}></div>
                                                    </div>
                                                    <div className="multi-progress-segment" title="Planejamento">
                                                        <div className="multi-progress-fill" style={{ width: `${getProgressoSegmento(2, item.faseAtual, item.progresso)}%`, backgroundColor: getCorSegmento(2, item) }}></div>
                                                    </div>
                                                    <div className="multi-progress-segment" title="Manufatura">
                                                        <div className="multi-progress-fill" style={{ width: `${getProgressoSegmento(3, item.faseAtual, item.progresso)}%`, backgroundColor: getCorSegmento(3, item) }}></div>
                                                    </div>
                                                </div>

                                                <div className="multi-progress-legends">
                                                    <span style={{ color: item.faseAtual >= 1 ? (foiCancelado && item.faseAtual === 1 ? '#ef4444' : '#3b82f6') : '#cbd5e1' }}>Orç.</span>
                                                    <span style={{ color: item.faseAtual >= 2 ? (foiCancelado && item.faseAtual === 2 ? '#ef4444' : '#f59e0b') : '#cbd5e1' }}>Plan.</span>
                                                    <span style={{ color: item.faseAtual >= 3 ? (foiCancelado && item.faseAtual === 3 ? '#ef4444' : '#10b981') : '#cbd5e1' }}>Fab.</span>
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
                                    Nenhuma transmissão encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* ✨ CONTROLES DE PAGINAÇÃO NO RODAPÉ DA TABELA */}
                {totalPaginas > 1 && (
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Mostrando de <strong>{indicePrimeiroItem + 1}</strong> a <strong>{Math.min(indiceUltimoItem, solicitacoesFiltradas.length)}</strong> de <strong>{solicitacoesFiltradas.length}</strong> projetos
                        </div>
                        <div className="pagination-controls">
                            <button
                                className="btn-page"
                                onClick={() => mudarPagina(paginaAtual - 1)}
                                disabled={paginaAtual === 1}
                                title="Página Anterior"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {/* Gera os botões de número dinamicamente */}
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                                <button
                                    key={num}
                                    className={`btn-page ${paginaAtual === num ? 'active' : ''}`}
                                    onClick={() => mudarPagina(num)}
                                >
                                    {num}
                                </button>
                            ))}

                            <button
                                className="btn-page"
                                onClick={() => mudarPagina(paginaAtual + 1)}
                                disabled={paginaAtual === totalPaginas}
                                title="Próxima Página"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
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
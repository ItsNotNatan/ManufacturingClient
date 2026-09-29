// =================================================================
// ARQUIVO: src/components/MenuFiltros/MenuFiltros.jsx
// DESCRIÇÃO: Componente modular para gerir a caixa de filtros
// =================================================================
import React from 'react';
import FundoEscuro from '../FundoEscuro/FundoEscuro';
import './MenuFiltros.css';

/**
 * Recebe via "props" todas as funções e estados necessários da página pai
 */
export default function MenuFiltros({
    mostrar,
    aoFechar,
    filtroFase, setFiltroFase,
    filtroStatus, setFiltroStatus,
    filtroScl, setFiltroScl,
    filtroCc, setFiltroCc,
    responsaveisUnicos,
    centrosCustoUnicos,
    limparFiltros
}) {
    // Se o estado 'mostrar' for falso, o componente não desenha nada no ecrã
    if (!mostrar) return null;

    return (
        <>
            {/* 1. O nosso módulo de fundo escuro para tapar a página */}
            <FundoEscuro aoFechar={aoFechar} zIndex={40} opacidade={0.4} />

            {/* 2. A caixa de opções do filtro */}
            <div className="filter-dropdown">
                <div className="filter-group">
                    <label>Fase do Projeto</label>
                    <select className="filter-select" value={filtroFase} onChange={(e) => setFiltroFase(e.target.value)}>
                        <option value="todas">Todas as Fases</option>
                        <option value="1">Fase 1: Orçamento</option>
                        <option value="2">Fase 2: Planejamento</option>
                        <option value="3">Fase 3: Manufatura</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Status Geral</label>
                    <select className="filter-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                        <option value="todos">Todos os Status</option>
                        <option value="ativos">Apenas Ativos (Em Andamento)</option>
                        <option value="concluido">Apenas Concluídos (100%)</option>
                        <option value="cancelado">Apenas Cancelados</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Responsável (SCL)</label>
                    <select className="filter-select" value={filtroScl} onChange={(e) => setFiltroScl(e.target.value)}>
                        <option value="todos">Todos os SCLs</option>
                        {responsaveisUnicos.map((resp, index) => (
                            <option key={index} value={resp}>{resp}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Centro de Custo</label>
                    <select className="filter-select" value={filtroCc} onChange={(e) => setFiltroCc(e.target.value)}>
                        <option value="todos">Todos os Centros de Custo</option>
                        {centrosCustoUnicos.map((cc, index) => (
                            <option key={index} value={cc}>{cc}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-actions">
                    <button className="btn-limpar-filtros" onClick={limparFiltros}>
                        Limpar Filtros
                    </button>
                </div>
            </div>
        </>
    );
}
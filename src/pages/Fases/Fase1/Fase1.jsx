// src/pages/Fases/Fase1/Fase1.jsx
import React from 'react';
import { FileText, Clock, AlertCircle } from 'lucide-react';
import './Fase1.css';

export default function Fase1() {
    return (
        <div className="fase-container">
            <div className="fase-header">
                <h1 className="fase-title">Fase 1: Orçamento</h1>
                <p className="fase-subtitle">Visualização do status de engenharia e aprovação financeira.</p>
            </div>

            {/* STATUS DOS DESENHOS (APENAS LEITURA) */}
            <div className="fase-card">
                <div className="fase-flex-between">
                    <div>
                        <span className="badge-blue">Engenharia</span>
                        <h3 className="fase-item-title">Desenhos Técnicos (JZEP)</h3>
                    </div>
                    <span className="badge-amber">
                        <Clock size={16} /> Aguardando TL Eng
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', color: '#64748b' }}>
                    <FileText size={32} />
                    <p style={{ fontSize: '0.95rem' }}>
                        Os desenhos 2D/3D ainda não foram processados. A fábrica aguarda a documentação da engenharia para iniciar a composição dos custos.
                    </p>
                </div>
            </div>

            {/* STATUS DO ORÇAMENTO (APENAS LEITURA) */}
            <div className="fase-card">
                <div className="fase-flex-between">
                    <div>
                        <span className="badge-blue">Financeiro</span>
                        <h3 className="fase-item-title">Orçamento da Manufatura</h3>
                    </div>
                    <span className="badge-amber">
                        <AlertCircle size={16} /> Em Análise
                    </span>
                </div>

                <div className="budget-grid">
                    <div>
                        <div className="budget-label">Custo Estimado</div>
                        <div className="budget-value" style={{ color: '#94a3b8' }}>A calcular...</div>
                    </div>
                    <div>
                        <div className="budget-label">Decisão da Manufatura</div>
                        <div className="budget-value" style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Pendente</div>
                    </div>
                </div>

                <p style={{ color: '#64748b', marginTop: '1rem', fontSize: '0.9rem' }}>
                    O orçamento está a ser elaborado pela equipa de Logística. Assim que o processo for concluído, os valores e a decisão (Make/Buy) estarão disponíveis para visualização.
                </p>
            </div>
        </div>
    );
}
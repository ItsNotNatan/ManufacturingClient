// src/pages/Fases/Fase1.jsx
import React, { useState } from 'react';
import { UploadCloud, CheckCircle, MessageCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import './Fase1.css';

export default function Fase1() {
    const [mostrarTL, setMostrarTL] = useState(true);
    const [mostrarSCL, setMostrarSCL] = useState(true);

    return (
        <div className="fase-container">
            <div className="fase-header">
                <h1 className="fase-title">Fase 1: Orçamento</h1>
                <p className="fase-subtitle">Ações pendentes para o SCL e TL de Engenharia.</p>
            </div>

            {/* AÇÃO TL ENGENHARIA */}
            {mostrarTL && (
                <div className="fase-card">
                    <div className="fase-flex-between">
                        <div>
                            <span className="badge-blue">Transmissão REQ-2023-112</span>
                            <h3 className="fase-item-title">Estrutura Metálica Suporte Principal</h3>
                        </div>
                        <span className="badge-amber"><AlertCircle size={16} /> Ação: TL Eng</span>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Desenhos enviados!'); setMostrarTL(false); }}>
                        <div className="upload-box">
                            <UploadCloud size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                            <strong style={{ color: '#2563eb' }}>Anexar Desenhos 2D/3D (JZEP)</strong>
                            <input type="file" style={{ display: 'none' }} multiple />
                        </div>
                        <button type="submit" className="btn btn-success" style={{ width: 'auto' }}>
                            <FileText size={18} /> Enviar para Logística (Orçamento)
                        </button>
                    </form>
                </div>
            )}

            {/* AÇÃO SCL / PM (Aprovar Orçamento) */}
            {mostrarSCL && (
                <div className="fase-card">
                    <div className="fase-flex-between">
                        <div>
                            <span className="badge-blue">Transmissão REQ-2023-090</span>
                            <h3 className="fase-item-title">Substituição de Válvula Setor B</h3>
                        </div>
                        <span className="badge-amber"><AlertCircle size={16} /> Ação: SCL / PM</span>
                    </div>

                    <div className="budget-grid">
                        <div><div className="budget-label">Custo Total Calculado</div><div className="budget-value">R$ 5.500,00</div></div>
                        <div><div className="budget-label">Decisão da Manufatura</div><div className="budget-value" style={{ color: '#0f172a', fontSize: '1.2rem' }}>Make/Buy</div></div>
                    </div>

                    <p style={{ fontWeight: 'bold', color: '#334155' }}>Qual a sua decisão como Gestor?</p>
                    <div className="btn-group">
                        <button onClick={() => { alert('Aprovado!'); setMostrarSCL(false); }} className="btn btn-success">
                            <CheckCircle size={18} /> APROVAR
                        </button>
                        <button onClick={() => alert('Negociação iniciada com Orçamento.')} className="btn btn-outline">
                            <MessageCircle size={18} /> NEGOCIAR
                        </button>
                        <button onClick={() => { alert('Reprovado!'); setMostrarSCL(false); }} className="btn btn-danger">
                            <XCircle size={18} /> REPROVAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
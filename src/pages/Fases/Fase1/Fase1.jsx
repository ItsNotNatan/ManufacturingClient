// =================================================================
// ARQUIVO: src/pages/Fases/Fase1/Fase1.jsx
// DESCRIÇÃO: Fase 1 com controlo de datas específicas por sub-etapas
// =================================================================
import React, { useState } from 'react';
import {
    Clock, AlertCircle, UploadCloud, ArrowRight, Calculator,
    Send, CheckCircle, XCircle, Lock, Calendar
} from 'lucide-react';
import { useAuthStore } from '../../../contexts/authStore';
import './Fase1.css';

export default function Fase1() {
    const { usuario } = useAuthStore();

    // Regra de Permissão: Apenas área_id === 1 (Orçamento) pode editar
    const podeEditar = usuario?.area_id === 1;

    // Estados de visibilidade das secções
    const [mostrarTL, setMostrarTL] = useState(true);
    const [mostrarOrcamento, setMostrarOrcamento] = useState(true);
    const [mostrarSCL, setMostrarSCL] = useState(true);

    // ✨ Datas previstas para cada sub-etapa
    const [dataPrevistaJzep, setDataPrevistaJzep] = useState('2026-10-10');
    const [dataPrevistaOrcamento, setDataPrevistaOrcamento] = useState('2026-10-14');

    const lidarComAcao = (setEstado, mensagem) => {
        if (!podeEditar) {
            alert("Ação não permitida: Apenas a equipa de Orçamento pode alterar esta fase.");
            return;
        }
        alert(mensagem);
        setEstado(false);
    };

    return (
        <div className="fase-container fade-in">
            <div className="fase-header">
                <h1 className="fase-title">Fase 1: Orçamento</h1>
                <p className="fase-subtitle">Solicitação, Engenharia (JZEP) e Gestão de Custos.</p>
            </div>

            {/* AVISO DE MODO DE LEITURA */}
            {!podeEditar && (
                <div style={{
                    backgroundColor: '#fffbe3',
                    border: '1px solid #fde68a',
                    color: '#92400e',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}>
                    <Lock size={18} />
                    <span>Modo de Leitura: Apenas colaboradores da área de <strong>Orçamento</strong> podem preencher e aprovar esta fase.</span>
                </div>
            )}

            {/* ==========================================
                1. AÇÃO: TL Engenharia (Desenhos Técnicos)
                ========================================== */}
            {mostrarTL && (
                <div className="fase-card">
                    <div className="fase-flex-between">
                        <div>
                            <span className="badge-blue">Transmissão REQ-2023-112</span>
                            <h3 className="fase-item-title">Desenhos Técnicos (JZEP)</h3>

                            {/* INDICADOR DA DATA ESPECÍFICA */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3b82f6', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.4rem' }}>
                                <Calendar size={14} />
                                Prazo de Entrega dos Desenhos: {dataPrevistaJzep ? new Date(dataPrevistaJzep).toLocaleDateString('pt-PT') : 'Não definido'}
                            </div>
                        </div>
                        <span className="badge-amber">
                            <AlertCircle size={14} /> Ação Requerida (TL Eng)
                        </span>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); lidarComAcao(setMostrarTL, 'Informações JZEP enviadas.'); }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Tipo de Orçamento</label>
                                <select className="fase1-select" disabled={!podeEditar} required style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', border: '1px solid #cbd5e1' }}>
                                    <option value="">Selecione...</option>
                                    <option value="construtivos">Orçar Construtivos (Materiais)</option>
                                    <option value="servicos">Orçar Serviços de Manufatura</option>
                                </select>
                            </div>

                            {/* CAMPO PARA EDITAR A DATA DA SUB-ETAPA */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Atualizar Prazo (JZEP)</label>
                                <input
                                    type="date"
                                    disabled={!podeEditar}
                                    value={dataPrevistaJzep}
                                    onChange={(e) => setDataPrevistaJzep(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Anexar Desenhos (JZEP)</label>
                                <label className="upload-box" style={{ opacity: podeEditar ? 1 : 0.6, cursor: podeEditar ? 'pointer' : 'not-allowed', padding: '1rem', display: 'block', textAlign: 'center', border: '1px dashed #cbd5e1', borderRadius: '0.4rem' }}>
                                    <UploadCloud size={20} color="#94a3b8" style={{ margin: '0 auto' }} />
                                    <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '0.2rem' }}>Fazer upload de arquivos</span>
                                    <input type="file" style={{ display: 'none' }} disabled={!podeEditar} multiple />
                                </label>
                            </div>
                        </div>
                        {podeEditar && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ background: '#2563eb', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '0.4rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    Concluir Etapa de Desenhos <ArrowRight size={14} />
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            )}

            {/* ==========================================
                2. AÇÃO: Gestão de Orçamentos
                ========================================== */}
            {mostrarOrcamento && (
                <div className="fase-card">
                    <div className="fase-flex-between">
                        <div>
                            <span className="badge-blue">Financeiro</span>
                            <h3 className="fase-item-title">Orçamento da Manufatura</h3>

                            {/* INDICADOR DA DATA ESPECÍFICA */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.4rem' }}>
                                <Calendar size={14} />
                                Prazo de Fecho do Orçamento: {dataPrevistaOrcamento ? new Date(dataPrevistaOrcamento).toLocaleDateString('pt-PT') : 'Não definido'}
                            </div>
                        </div>
                        <span className="badge-amber">
                            <Calculator size={14} /> Ação Requerida (Orçamento)
                        </span>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Atualizar Prazo de Fecho</label>
                        <input
                            type="date"
                            disabled={!podeEditar}
                            value={dataPrevistaOrcamento}
                            onChange={(e) => setDataPrevistaOrcamento(e.target.value)}
                            style={{ width: '200px', padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div className="budget-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                        <div>
                            <div className="budget-label" style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Databook / Qualidade</div>
                            <div className="input-group">
                                <input type="number" defaultValue="500" disabled={!podeEditar} style={{ padding: '0.5rem', width: '100%', borderRadius: '0.3rem', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>
                        <div>
                            <div className="budget-label" style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Cotação Fornecedores</div>
                            <div className="input-group">
                                <input type="number" defaultValue="800" disabled={!podeEditar} style={{ padding: '0.5rem', width: '100%', borderRadius: '0.3rem', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#0f172a' }}>Total Calculado: <span style={{ color: '#1d4ed8' }}>R$ 1.300,00</span></div>
                        {podeEditar && (
                            <button onClick={() => lidarComAcao(setMostrarOrcamento, 'Enviado para SCL.')} className="btn btn-success" style={{ background: '#059669', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '0.4rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                Enviar para Avaliação Final <Send size={14} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* ==========================================
                3. AÇÃO: Decisão Final
                ========================================== */}
            {mostrarSCL && (
                <div className="fase-card">
                    <div className="fase-flex-between">
                        <div>
                            <h3 className="fase-item-title">Aprovação do Valor Final (PM/SCL)</h3>
                            <p style={{ margin: '0', fontSize: '0.85rem', color: '#64748b' }}>Avaliação do cálculo gerado pela equipa de Orçamento.</p>
                        </div>
                        <span className="badge-amber"><AlertCircle size={14} /> Avaliação</span>
                    </div>

                    <div className="btn-group" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button onClick={() => lidarComAcao(setMostrarSCL, 'Aprovado!')} disabled={!podeEditar} className="btn btn-success" style={{ opacity: podeEditar ? 1 : 0.5, cursor: podeEditar ? 'pointer' : 'not-allowed', background: '#10b981', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                            <CheckCircle size={18} /> APROVAR
                        </button>
                        <button onClick={() => lidarComAcao(setMostrarSCL, 'Reprovado.')} disabled={!podeEditar} className="btn btn-danger" style={{ opacity: podeEditar ? 1 : 0.5, cursor: podeEditar ? 'pointer' : 'not-allowed', background: '#f43f5e', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                            <XCircle size={18} /> REPROVAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
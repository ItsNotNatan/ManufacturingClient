// src/pages/Formulario/Formulario.jsx
import React, { useState } from 'react';
import { User, Wrench, Zap, Save, AlertTriangle } from 'lucide-react';
import './Formulario.css';

// Opções para os menus dropdown adaptadas para a Indústria Automóvel
const SETORES = ["Funilaria (Body Shop)", "Montagem Final", "Pintura", "Estamparia", "Manutenção", "Engenharia de Processos"];
const TIPOS_DISPOSITIVO = ["Mesa Giratória", "Dispositivo RM", "Prensa de Solda", "Pinça de Solda", "Esteira Transportadora", "Outro"];
const PRIORIDADES = [
    "Baixa (Melhoria Futura)",
    "Média (Projeto em Andamento)",
    "Alta (Risco de Parada de Linha)",
    "Crítica (Linha Parada / Segurança)"
];

export default function Formulario() {
    // 1. ESTADOS DO COMPONENTE (Variáveis de memória)
    const [carregando, setCarregando] = useState(false);

    // Dados do Solicitante e Projeto
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [projetoWbs, setProjetoWbs] = useState('');

    // Detalhes do Dispositivo Industrial
    const [tipoDispositivo, setTipoDispositivo] = useState('');
    const [estacaoLinha, setEstacaoLinha] = useState('');
    const [prioridade, setPrioridade] = useState('');

    // Requisitos Técnicos de Chão de Fábrica
    const [observacoes, setObservacoes] = useState('');
    const [requisitos, setRequisitos] = useState({
        eletrica220: false,
        eletrica440: false,
        arComprimido: false,
        hidraulica: false,
        integracaoCLP: false
    });

    // Função para atualizar os requisitos técnicos quando uma checkbox é clicada
    const handleRequisitosChange = (e) => {
        const { name, checked } = e.target;
        setRequisitos(prev => ({ ...prev, [name]: checked }));
    };

    // 2. FUNÇÃO DE SUBMISSÃO
    const handleSubmit = (e) => {
        e.preventDefault();
        setCarregando(true);

        // Agrupamos os dados para enviar à base de dados (PocketBase)
        const solicitacaoDeManufatura = {
            solicitante: { nome, setor, projetoWbs },
            dispositivo: { tipoDispositivo, estacaoLinha, prioridade },
            requisitosTecnicos: requisitos,
            especificacoesAdicionais: observacoes
        };

        console.log("Enviando ordem para o servidor:", solicitacaoDeManufatura);

        // Simulação do tempo de resposta da API
        setTimeout(() => {
            alert("Sucesso! A ordem de fabrico/solicitação do dispositivo foi registada.");
            setCarregando(false);
            // Aqui poderíamos limpar o formulário
        }, 1500);
    };

    // 3. RENDERIZAÇÃO DA INTERFACE VISUAL
    return (
        <div className="app-main">
            <section className="form-card fade-in">

                <div className="card-header">
                    <h3 className="card-title">Solicitação de Dispositivo Industrial</h3>
                    <div className="badge-info">
                        <Wrench size={16} style={{ display: 'inline', marginRight: '4px' }} />
                        Engenharia e Manufatura
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* BLOCO 1: DADOS DO SOLICITANTE E PROJETO */}
                    <h4 className="section-title"><User size={20} /> Informações do Projeto</h4>
                    <div className="form-grid-3">
                        <div className="input-group">
                            <label>Nome do Solicitante *</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                required
                                className="input-control"
                                placeholder="Nome completo"
                            />
                        </div>

                        <div className="input-group">
                            <label>Setor / Área *</label>
                            <select
                                value={setor}
                                onChange={e => setSetor(e.target.value)}
                                required
                                className="input-control"
                            >
                                <option value="" hidden>Selecione...</option>
                                {SETORES.map((s, i) => <option key={i} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Código do Projeto / WBS *</label>
                            <input
                                type="text"
                                value={projetoWbs}
                                onChange={e => setProjetoWbs(e.target.value)}
                                required
                                className="input-control"
                                placeholder="Ex: PRJ-2026-X"
                            />
                        </div>
                    </div>

                    {/* BLOCO 2: ESPECIFICAÇÕES DO DISPOSITIVO */}
                    <h4 className="section-title"><Wrench size={20} /> Especificações do Equipamento</h4>
                    <div className="box-highlight" style={{ marginBottom: '1.5rem' }}>
                        <div className="form-grid-3">
                            <div className="input-group">
                                <label>Tipo de Dispositivo *</label>
                                <select
                                    value={tipoDispositivo}
                                    onChange={e => setTipoDispositivo(e.target.value)}
                                    required
                                    className="input-control"
                                >
                                    <option value="" hidden>Selecione...</option>
                                    {TIPOS_DISPOSITIVO.map((tipo, i) => <option key={i} value={tipo}>{tipo}</option>)}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Linha / Estação de Aplicação *</label>
                                <input
                                    type="text"
                                    value={estacaoLinha}
                                    onChange={e => setEstacaoLinha(e.target.value)}
                                    required
                                    className="input-control"
                                    placeholder="Ex: OP-30 / Célula de Solda B"
                                />
                            </div>

                            <div className="input-group">
                                <label>Prioridade da Solicitação *</label>
                                <select
                                    value={prioridade}
                                    onChange={e => setPrioridade(e.target.value)}
                                    required
                                    className="input-control"
                                    style={{ borderColor: prioridade.includes('Crítica') ? '#ef4444' : '#d1d5db' }}
                                >
                                    <option value="" hidden>Selecione o impacto...</option>
                                    {PRIORIDADES.map((p, i) => <option key={i} value={p}>{p}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* BLOCO 3: REQUISITOS TÉCNICOS E ENERGIAS */}
                    <h4 className="section-title"><Zap size={20} /> Requisitos Técnicos e Alimentação</h4>
                    <div className="box-highlight" style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc' }}>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                            Selecione os recursos necessários para a operação do dispositivo na fábrica:
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                                <input type="checkbox" name="eletrica220" checked={requisitos.eletrica220} onChange={handleRequisitosChange} />
                                Elétrica (220V)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                                <input type="checkbox" name="eletrica440" checked={requisitos.eletrica440} onChange={handleRequisitosChange} />
                                Elétrica (440V / Trifásico)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                                <input type="checkbox" name="arComprimido" checked={requisitos.arComprimido} onChange={handleRequisitosChange} />
                                Rede de Ar Comprimido (Pneumática)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                                <input type="checkbox" name="hidraulica" checked={requisitos.hidraulica} onChange={handleRequisitosChange} />
                                Unidade Hidráulica
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500', color: '#0369a1' }}>
                                <input type="checkbox" name="integracaoCLP" checked={requisitos.integracaoCLP} onChange={handleRequisitosChange} />
                                Integração com CLP / Robô
                            </label>
                        </div>

                        <div className="input-group">
                            <label>Memorial Descritivo / Especificações Detalhadas</label>
                            <textarea
                                value={observacoes}
                                onChange={e => setObservacoes(e.target.value)}
                                rows="4"
                                className="input-control"
                                placeholder="Descreva medidas, capacidade de carga, tempo de ciclo esperado, normas de segurança específicas (ex: NR-12), ou referências de projetos 3D."
                            ></textarea>
                        </div>
                    </div>

                    {/* SECÇÃO: Ações */}
                    <div className="form-actions">
                        <button type="submit" disabled={carregando} className="btn btn-primary">
                            <Save size={18} /> {carregando ? 'A processar...' : 'Enviar Solicitação de Projeto'}
                        </button>
                    </div>

                </form>
            </section>
        </div>
    );
}
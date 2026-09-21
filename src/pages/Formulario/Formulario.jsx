// src/pages/Formulario/Formulario.jsx
import React, { useState } from 'react';
import { FilePlus, Send, LayoutTemplate, Settings, Users } from 'lucide-react';
import './Formulario.css';

export default function Formulario() {
    const [dados, setDados] = useState({
        tipoSolicitacao: 'eventual',
        projeto: '',
        linha: '',
        operacao: '',
        nomeDispositivo: '',
        tipoDispositivo: '',
        descricaoDispositivo: '',
        escopoDesejado: [],
        precoTarget: '',
        pm: '',
        planner: '',
        scl: '',
        tlMecanico: '',
        tlControls: '',
        siteManager: '',
        siteSupervisor: ''
    });

    const lidarComMudanca = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setDados(prev => {
                const novoEscopo = checked
                    ? [...prev.escopoDesejado, value]
                    : prev.escopoDesejado.filter(item => item !== value);
                return { ...prev, escopoDesejado: novoEscopo };
            });
        } else {
            setDados(prev => ({ ...prev, [name]: value }));
        }
    };

    const lidarComEnvio = (e) => {
        e.preventDefault();
        console.log("Dados da solicitação:", dados);
        alert('Solicitação criada com sucesso!');
        // Aqui você faria a chamada para a sua API / PocketBase
    };

    // Lista simulada de usuários para os campos dinâmicos
    const listaUsuarios = ["João Silva", "Maria Costa", "Carlos Souza", "Ana Oliveira"];

    return (
        <div className="formulario-container">
            <div className="formulario-header">
                <h2 className="formulario-title">
                    <FilePlus size={28} color="#2563eb" />
                    Nova Solicitação de Equipamento
                </h2>
                <p>Preencha os dados de entrada para notificar a engenharia.</p>
            </div>

            <form onSubmit={lidarComEnvio} className="formulario-card">

                {/* SEÇÃO 1: DADOS DO PROJETO */}
                <div className="form-section">
                    <h3 className="section-title"><LayoutTemplate size={20} /> Dados do Projeto</h3>

                    <div className="form-group full-width radio-container">
                        <label>Tipo de Solicitação</label>
                        <div className="radio-group">
                            <label><input type="radio" name="tipoSolicitacao" value="eventual" checked={dados.tipoSolicitacao === 'eventual'} onChange={lidarComMudanca} /> Eventual</label>
                            <label><input type="radio" name="tipoSolicitacao" value="transmissao" checked={dados.tipoSolicitacao === 'transmissao'} onChange={lidarComMudanca} /> Transmissão</label>
                        </div>
                    </div>

                    <div className="formulario-grid">
                        <div className="form-group">
                            <label>Projeto</label>
                            <select name="projeto" value={dados.projeto} onChange={lidarComMudanca} required>
                                <option value="">Selecione o projeto...</option>
                                <option value="PRJ-A">Projeto A (Padrão ATMLog)</option>
                                <option value="PRJ-B">Projeto B</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Linha</label>
                            <input type="text" name="linha" value={dados.linha} onChange={lidarComMudanca} required />
                        </div>
                        <div className="form-group">
                            <label>Operação</label>
                            <input type="text" name="operacao" value={dados.operacao} onChange={lidarComMudanca} required />
                        </div>
                    </div>
                </div>

                <hr className="divider" />

                {/* SEÇÃO 2: DADOS DO DISPOSITIVO */}
                <div className="form-section">
                    <h3 className="section-title"><Settings size={20} /> Detalhes do Dispositivo</h3>
                    <div className="formulario-grid">
                        <div className="form-group">
                            <label>Nome do Dispositivo</label>
                            <input type="text" name="nomeDispositivo" value={dados.nomeDispositivo} onChange={lidarComMudanca} required />
                        </div>

                        <div className="form-group">
                            <label>Tipo de Dispositivo</label>
                            <select name="tipoDispositivo" value={dados.tipoDispositivo} onChange={lidarComMudanca} required>
                                <option value="">Selecione...</option>
                                <option value="Gripper">Gripper</option>
                                <option value="Mesa">Mesa</option>
                                <option value="Gate">Gate</option>
                                <option value="Suporte">Suporte</option>
                                <option value="Pedestal">Pedestal</option>
                                <option value="Base">Base</option>
                                <option value="Bracket">Bracket</option>
                                <option value="Baia">Baia</option>
                                <option value="Garagem">Garagem</option>
                                <option value="Kit modifica">Kit modifica</option>
                                <option value="Carrinho">Carrinho</option>
                                <option value="Outros">Outros dispositivos</option>
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label>Descrição do Dispositivo</label>
                            <textarea name="descricaoDispositivo" rows="3" value={dados.descricaoDispositivo} onChange={lidarComMudanca} required></textarea>
                        </div>

                        <div className="form-group full-width">
                            <label>Escopo Desejado (Múltipla Seleção)</label>
                            <div className="checkbox-group">
                                {['Construção', 'Montagem', 'Bordo-máquina', 'Medição', 'Comissionamento'].map(opcao => (
                                    <label key={opcao} className="checkbox-label">
                                        <input type="checkbox" name="escopoDesejado" value={opcao} checked={dados.escopoDesejado.includes(opcao)} onChange={lidarComMudanca} />
                                        {opcao}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Preço Target (Opcional - R$)</label>
                            <input type="number" name="precoTarget" placeholder="0.00" step="0.01" value={dados.precoTarget} onChange={lidarComMudanca} />
                        </div>
                    </div>
                </div>

                <hr className="divider" />

                {/* SEÇÃO 3: EQUIPE RESPONSÁVEL */}
                <div className="form-section">
                    <h3 className="section-title"><Users size={20} /> Equipe Responsável</h3>
                    <p className="section-subtitle">Selecione os usuários responsáveis (Lista Dinâmica)</p>

                    <div className="formulario-grid team-grid">
                        {['PM', 'Planner', 'SCL', 'TL Mecânico', 'TL de Controls', 'Site Manager', 'Site Supervisor'].map(cargo => {
                            // Converte o nome do cargo para o formato do estado (ex: "Site Manager" -> "siteManager")
                            let key = cargo.toLowerCase().replace(/ (de )?./g, match => match.replace(/ (de )?/, '').toUpperCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            return (
                                <div className="form-group" key={key}>
                                    <label>{cargo}</label>
                                    <select name={key} value={dados[key]} onChange={lidarComMudanca} required>
                                        <option value="">Buscar usuário...</option>
                                        {listaUsuarios.map(usr => <option key={usr} value={usr}>{usr}</option>)}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-enviar">
                        <Send size={18} />
                        Gerar Solicitação e Notificar Mecânica
                    </button>
                </div>
            </form>
        </div>
    );
}
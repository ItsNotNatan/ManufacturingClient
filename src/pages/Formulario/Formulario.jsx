// src/pages/Formulario/Formulario.jsx
import React, { useState } from 'react';
import { FilePlus, Send, LayoutTemplate, Settings, Users } from 'lucide-react';
import './Formulario.css';

export default function Formulario() {
    const [dados, setDados] = useState({
        tipoSolicitacao: 'transmissao', // Forçado a ser Transmissão
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
        alert('Solicitação de Transmissão criada com sucesso!');
    };

    const listaUsuarios = ["João Silva", "Maria Costa", "Carlos Souza", "Ana Oliveira"];

    return (
        <div className="formulario-container">
            <div className="formulario-header">
                <h2 className="formulario-title"><FilePlus size={28} color="#2563eb" /> Nova Solicitação de Transmissão</h2>
                <p>Preencha os dados de entrada para iniciar o fluxo com a Engenharia.</p>
            </div>

            <form onSubmit={lidarComEnvio} className="formulario-card">
                {/* DADOS DO PROJETO */}
                <div className="form-section">
                    <h3 className="section-title"><LayoutTemplate size={20} /> Dados do Projeto</h3>

                    {/* Opção "Eventual" foi removida. O utilizador já sabe que está a criar uma Transmissão */}
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
                    </div>
                </div>

                <hr className="divider" />

                {/* DETALHES DO DISPOSITIVO */}
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
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label>Descrição Detalhada</label>
                            <textarea name="descricaoDispositivo" rows="3" value={dados.descricaoDispositivo} onChange={lidarComMudanca} required></textarea>
                        </div>
                    </div>
                </div>

                <hr className="divider" />

                <div className="form-actions">
                    <button type="submit" className="btn-enviar">
                        <Send size={18} /> Iniciar Fluxo
                    </button>
                </div>
            </form>
        </div>
    );
}
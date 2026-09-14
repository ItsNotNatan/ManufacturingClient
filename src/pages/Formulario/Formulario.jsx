// src/pages/Formulario/Formulario.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { io } from 'socket.io-client';
import { User, MapPin, Clock, Save, Trash2, PackagePlus } from 'lucide-react'; // Ícones modernos
import './Formulario.css';

// 1. CONFIGURAÇÃO DO SOCKET E DADOS MOCKADOS
// Em produção, substitui localhost pelo IP do teu servidor
const SOCKET_URL = `http://localhost:3000`;
const socket = io(SOCKET_URL);

const LISTA_VEICULOS = ["Fiorino", "Van", "Caminhão 3/4", "Carreta"];

export default function Formulario() {
    // 2. ESTADOS (Variáveis) DO COMPONENTE
    const [carregando, setCarregando] = useState(false);
    const [solicitante, setSolicitante] = useState('');
    const [tipoOperacao, setTipoOperacao] = useState('');
    const [veiculo, setVeiculo] = useState('');

    // Estado para armazenar o endereço de coleta
    const [coleta, setColeta] = useState({
        cep: '', logradouro: '', numero: '', bairro: '', localidade: '', uf: ''
    });

    // Estado para gerir múltiplas cargas
    const [cargas, setCargas] = useState([]);
    const [novaCarga, setNovaCarga] = useState({
        nome: '', quantidade: 1, peso: '', cor: '#3b82f6'
    });

    // 3. EFEITOS (Executado quando a página carrega)
    useEffect(() => {
        // Escuta atualizações do servidor em tempo real
        socket.on('locais_atualizados', () => {
            console.log('🔄 A lista de locais foi atualizada no servidor!');
            // Aqui chamarias a tua API (Axios) para recarregar os dados
        });

        // Limpa a conexão do socket quando o utilizador sai da página
        return () => {
            socket.off('locais_atualizados');
        };
    }, []);

    // 4. FUNÇÕES DE UTILIDADE E INTEGRAÇÃO DE API

    // Função que consulta a API pública ViaCEP
    const buscarCep = async (valorCep) => {
        const cepLimpo = valorCep.replace(/\D/g, '');
        setColeta(prev => ({ ...prev, cep: valorCep }));

        if (cepLimpo.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const data = await res.json();

                if (!data.erro) {
                    // Preenche os campos automaticamente com a resposta da API
                    setColeta(prev => ({
                        ...prev,
                        logradouro: data.logradouro || '',
                        bairro: data.bairro || '',
                        localidade: data.localidade || '',
                        uf: data.uf || ''
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            }
        }
    };

    // Função para adicionar um novo item à lista de cargas
    const handleAddCarga = () => {
        if (!novaCarga.nome || !novaCarga.peso) return;

        // Adiciona o item à lista existente com um ID único (Date.now())
        setCargas([...cargas, { ...novaCarga, id: Date.now() }]);
        // Limpa os campos de input
        setNovaCarga({ nome: '', quantidade: 1, peso: '', cor: '#3b82f6' });
    };

    // Função disparada ao submeter o formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que a página recarregue
        setCarregando(true);

        // Aqui usamos o Axios para enviar os dados para o teu back-end
        const dadosFinais = {
            solicitante,
            tipoOperacao,
            veiculo,
            endereco: coleta,
            listaCargas: cargas
        };

        console.log("Enviando para o servidor:", dadosFinais);

        // Simula o tempo de resposta do servidor
        setTimeout(() => {
            alert("Sucesso! Transporte solicitado.");
            setCarregando(false);
        }, 1500);
    };

    // 5. RENDERIZAÇÃO DA INTERFACE VISUAL (JSX)
    return (
        <div className="app-main">
            <section className="form-card fade-in">

                <div className="card-header">
                    <h3 className="card-title">Solicitação de Transporte</h3>
                    <div className="badge-info">
                        <Clock size={16} style={{ display: 'inline', marginRight: '4px' }} />
                        Preencha os dados
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* SECÇÃO: Solicitante */}
                    <h4 className="section-title"><User size={20} /> Dados do Solicitante</h4>
                    <div className="form-grid-3">
                        <div className="input-group">
                            <label>Nome e sobrenome *</label>
                            <input
                                type="text"
                                value={solicitante}
                                onChange={e => setSolicitante(e.target.value)}
                                required
                                className="input-control"
                                placeholder="Seu nome"
                            />
                        </div>

                        <div className="input-group">
                            <label>Tipo de Operação *</label>
                            <select
                                value={tipoOperacao}
                                onChange={e => setTipoOperacao(e.target.value)}
                                required
                                className="input-control"
                            >
                                <option value="" hidden>Selecione...</option>
                                <option value="Nacional">NACIONAL</option>
                                <option value="Nacionalizado">NACIONALIZADO</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Veículo *</label>
                            <select
                                value={veiculo}
                                onChange={e => setVeiculo(e.target.value)}
                                required
                                className="input-control"
                            >
                                <option value="" hidden>Selecione...</option>
                                {LISTA_VEICULOS.map((v, i) => <option key={i} value={v}>{v}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* SECÇÃO: Endereço (Integração ViaCEP) */}
                    <h4 className="section-title"><MapPin size={20} /> Rota e Coleta</h4>
                    <div className="box-highlight" style={{ marginBottom: '1.5rem' }}>
                        <div className="form-grid-4">
                            <div className="input-group">
                                <label>CEP (Auto-preenchimento) *</label>
                                <input
                                    type="text"
                                    maxLength="9"
                                    value={coleta.cep}
                                    onChange={(e) => buscarCep(e.target.value)}
                                    required
                                    className="input-control"
                                    placeholder="00000000"
                                />
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label>Logradouro (Rua/Av) *</label>
                                <input type="text" value={coleta.logradouro} readOnly className="input-control" />
                            </div>
                            <div className="input-group">
                                <label>UF *</label>
                                <input type="text" value={coleta.uf} readOnly className="input-control" />
                            </div>
                        </div>
                    </div>

                    {/* SECÇÃO: Gestão de Cargas (Arrays) */}
                    <h4 className="section-title"><PackagePlus size={20} /> Cargas</h4>
                    <div className="box-highlight">
                        <div className="form-grid-4">
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label>Nome / Descrição *</label>
                                <input type="text" value={novaCarga.nome} onChange={e => setNovaCarga({ ...novaCarga, nome: e.target.value })} className="input-control" />
                            </div>
                            <div className="input-group">
                                <label>Peso (kg) *</label>
                                <input type="number" value={novaCarga.peso} onChange={e => setNovaCarga({ ...novaCarga, peso: e.target.value })} className="input-control" />
                            </div>
                        </div>

                        <button type="button" onClick={handleAddCarga} className="btn btn-outline" style={{ marginTop: '1rem' }}>
                            Adicionar à Lista
                        </button>

                        {/* Lista Visual das Cargas Adicionadas */}
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {cargas.map((carga) => (
                                <div key={carga.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#fff', borderLeft: `6px solid ${carga.cor}`, borderRadius: '4px' }}>
                                    <span><strong>{carga.nome}</strong> - {carga.peso}kg</span>
                                    <button type="button" onClick={() => setCargas(cargas.filter(c => c.id !== carga.id))} style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECÇÃO: Ações */}
                    <div className="form-actions">
                        <button type="submit" disabled={carregando} className="btn btn-primary">
                            <Save size={18} /> {carregando ? 'Salvando...' : 'Salvar Solicitação'}
                        </button>
                    </div>

                </form>
            </section>
        </div>
    );
}
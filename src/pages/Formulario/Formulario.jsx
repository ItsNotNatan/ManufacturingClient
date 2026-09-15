// src/pages/Formulario/Formulario.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { ClipboardList, Cpu, Users, Save } from 'lucide-react';
import { formatarMoeda } from '../../utils/formatadores';
import api from '../../services/api'; // Importamos o ficheiro que liga ao Supabase!
import './Formulario.css';

// --- DADOS SIMULADOS PARA AS LISTAS SUSPENSAS ---
const MOCK_PROJETOS = [
    { value: 'PRJ-001', label: 'PRJ-001 - Projeto A' },
    { value: 'PRJ-002', label: 'PRJ-002 - Projeto B' }
];

const MOCK_USUARIOS = [
    { value: 'João Silva', label: 'João Silva' },
    { value: 'Maria Costa', label: 'Maria Costa' },
    { value: 'Carlos Souza', label: 'Carlos Souza' }
];

const TIPOS_DISPOSITIVO = [
    { value: 'Gripper', label: 'Gripper' },
    { value: 'Mesa', label: 'Mesa' },
    { value: 'Pinça de Solda', label: 'Pinça de Solda' }
];

const ESCOPOS = [
    { value: 'Construção', label: 'Construção' },
    { value: 'Montagem', label: 'Montagem' },
    { value: 'Medição', label: 'Medição' }
];

export default function Formulario() {
    // 1. ESTADOS DO COMPONENTE
    const [carregando, setCarregando] = useState(false);

    // Bloco 1: Base
    const [projeto, setProjeto] = useState(null);
    const [linha, setLinha] = useState('');
    const [operacao, setOperacao] = useState('');

    // Bloco 2: Dispositivo
    const [tipoDispositivo, setTipoDispositivo] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [escopo, setEscopo] = useState([]);
    const [precoTarget, setPrecoTarget] = useState('');

    // Bloco 3: Equipa
    const [pm, setPm] = useState(null);
    const [planner, setPlanner] = useState(null);
    const [scl, setScl] = useState(null);
    const [tlMecanico, setTlMecanico] = useState(null);
    const [tlControls, setTlControls] = useState(null);
    const [siteManager, setSiteManager] = useState(null);
    const [siteSupervisor, setSiteSupervisor] = useState(null);

    // 2. FUNÇÃO QUE ENVIA PARA A BASE DE DADOS
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);

        // Preparamos o pacote de dados exatamente como a nossa tabela no Supabase espera
        const dadosDoFormulario = {
            projeto: projeto?.value,
            linha: linha,
            operacao: operacao,
            tipo_dispositivo: tipoDispositivo?.value,
            descricao: descricao,
            escopo: escopo.map(item => item.value), // Extrai os textos do array de múltipla escolha
            preco_target: precoTarget ? parseFloat(precoTarget.replace(/\./g, '').replace(',', '.')) : null,
            pm: pm?.value,
            planner: planner?.value,
            scl: scl?.value,
            tl_mecanico: tlMecanico?.value,
            tl_controls: tlControls?.value,
            site_manager: siteManager?.value,
            site_supervisor: siteSupervisor?.value,
            status: 'pendente' // Estado inicial automático
        };

        try {
            console.log("A enviar para o Supabase...", dadosDoFormulario);

            // Fazemos o POST para a tabela 'dispositivos' (certifica-te que criaste esta tabela no Supabase!)
            await api.post('/dispositivos', dadosDoFormulario);

            alert("Dispositivo registado com sucesso!");

            // Opcional: Limpar o formulário depois do sucesso
            setDescricao('');
            setPrecoTarget('');

            // src/pages/Formulario/Formulario.jsx

        } catch (erro) {
            // Removemos a mensagem estática e mostramos o erro verdadeiro!
            console.error("Erro completo:", erro);

            if (erro.response) {
                // Erro que veio do Back-end
                alert(`Erro do Servidor: ${JSON.stringify(erro.response.data)}`);
            } else {
                // Erro de rede (ex: Back-end desligado)
                alert(`Erro de Comunicação: ${erro.message}`);
            }
        } finally {
            setCarregando(false);
        }
    };

    // Estilo para a biblioteca React-Select
    const reactSelectStyles = {
        control: (base) => ({ ...base, borderRadius: '0.5rem', padding: '2px', borderColor: '#d1d5db' })
    };

    // 3. RENDERIZAÇÃO
    return (
        <div className="app-main">
            <section className="form-card">
                <div className="card-header">
                    <h3 className="card-title">Cadastro de Novo Dispositivo</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* INFORMAÇÕES BASE */}
                    <h4 className="section-title"><ClipboardList size={20} /> Informações Base</h4>
                    <div className="form-grid-3">
                        <div className="input-group">
                            <label>1. Projeto *</label>
                            <Select options={MOCK_PROJETOS} value={projeto} onChange={setProjeto} isSearchable required styles={reactSelectStyles} />
                        </div>
                        <div className="input-group">
                            <label>2. Linha *</label>
                            <input type="text" value={linha} onChange={e => setLinha(e.target.value)} required className="input-control" />
                        </div>
                        <div className="input-group">
                            <label>3. Operação *</label>
                            <input type="text" value={operacao} onChange={e => setOperacao(e.target.value)} required className="input-control" />
                        </div>
                    </div>

                    {/* DISPOSITIVO */}
                    <h4 className="section-title"><Cpu size={20} /> Detalhes do Dispositivo</h4>
                    <div className="box-highlight">
                        <div className="form-grid-2">
                            <div className="input-group">
                                <label>4. Tipo de dispositivo *</label>
                                <Select options={TIPOS_DISPOSITIVO} value={tipoDispositivo} onChange={setTipoDispositivo} required styles={reactSelectStyles} />
                            </div>
                            <div className="input-group">
                                <label>7. Preço Target (R$)</label>
                                <input type="text" value={precoTarget} onChange={e => setPrecoTarget(formatarMoeda(e.target.value))} className="input-control" />
                            </div>
                        </div>
                        <div className="input-group" style={{ marginTop: '1rem' }}>
                            <label>5. Descrição do dispositivo *</label>
                            <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required className="input-control" />
                        </div>
                        <div className="input-group" style={{ marginTop: '1rem' }}>
                            <label>6. Escopo Desejado *</label>
                            <Select isMulti options={ESCOPOS} value={escopo} onChange={setEscopo} required styles={reactSelectStyles} />
                        </div>
                    </div>

                    {/* EQUIPA */}
                    <h4 className="section-title"><Users size={20} /> Equipa Responsável</h4>
                    <div className="box-highlight">
                        <div className="form-grid-3">
                            <div className="input-group"><label>8. PM *</label><Select options={MOCK_USUARIOS} value={pm} onChange={setPm} required styles={reactSelectStyles} /></div>
                            <div className="input-group"><label>9. Planner *</label><Select options={MOCK_USUARIOS} value={planner} onChange={setPlanner} required styles={reactSelectStyles} /></div>
                            <div className="input-group"><label>10. SCL *</label><Select options={MOCK_USUARIOS} value={scl} onChange={setScl} required styles={reactSelectStyles} /></div>
                        </div>
                        <div className="form-grid-4">
                            <div className="input-group"><label>11. TL Mecânico *</label><Select options={MOCK_USUARIOS} value={tlMecanico} onChange={setTlMecanico} required styles={reactSelectStyles} /></div>
                            <div className="input-group"><label>12. TL de Controls *</label><Select options={MOCK_USUARIOS} value={tlControls} onChange={setTlControls} required styles={reactSelectStyles} /></div>
                            <div className="input-group"><label>13. Site Manager *</label><Select options={MOCK_USUARIOS} value={siteManager} onChange={setSiteManager} required styles={reactSelectStyles} /></div>
                            <div className="input-group"><label>14. Site Sup. *</label><Select options={MOCK_USUARIOS} value={siteSupervisor} onChange={setSiteSupervisor} required styles={reactSelectStyles} /></div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={carregando} className="btn-primary">
                            <Save size={18} /> {carregando ? 'A guardar...' : 'Guardar Dispositivo'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
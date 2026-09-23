// src/pages/Formulario/Formulario.jsx
import React, { useState } from 'react';
import { FilePlus, Send, LayoutTemplate, UploadCloud, ListChecks, ExternalLink, Image as ImageIcon } from 'lucide-react';
import './Formulario.css';

export default function Formulario() {
    const [carregandoPdf, setCarregandoPdf] = useState(false);

    const [dados, setDados] = useState({
        tipoSolicitacao: 'transmissao',
        remetente: '',
        destinatario: '',
        objeto: '',
        numeroTransmissao: '',
        projeto: '',
        contatoTecnico: '',
        dataSolicitacao: '',
        dataData: '',
        linkSyncplicity: '',
        itensConstrutivos: []
    });

    const lidarComMudanca = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const lidarMudancaItem = (index, campo, valor) => {
        const novosItens = [...dados.itensConstrutivos];
        novosItens[index][campo] = valor;
        setDados(prev => ({ ...prev, itensConstrutivos: novosItens }));
    };

    const handleUploadPDF = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setCarregandoPdf(true);

        setTimeout(() => {
            setDados(prev => ({
                ...prev,
                remetente: 'Sidney',
                destinatario: 'Cesar Marcantonio',
                objeto: 'UBII',
                numeroTransmissao: 'BB37-VW-ANCH-STW-UB2-0143-2025',
                projeto: 'BRBCBBB37',
                contatoTecnico: 'bruno.soares@comau.com',
                dataSolicitacao: '2026-03-27',
                dataData: '2026-03-28',
                linkSyncplicity: 'https://comau.syncplicity.com/Files/Default.aspx#home/1/9021399/COMPRAS/BWA/-%20VOLKSWAGEM/BRBCBBB37%20-%20VW%20ANCHIETA%20STW%20UB2/Transmiss%C3%B5es/BB37-VW-ANCH-STW-UB2-0143-2025',
                itensConstrutivos: [
                    // Adicionada a propriedade imagemSimulada
                    { id: 1, imagemSimulada: true, descricao: 'CONSOLE P/ PINÇA DE SOLDA ST2220', codigo: '51-38N_578227', qtd: '01DX+01EX' },
                    { id: 2, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2790', codigo: '51-38N_578229', qtd: '01' },
                    { id: 3, imagemSimulada: true, descricao: 'CONSOLE P/ PINO TUCKER ST2790', codigo: '51-38N_578231', qtd: '01' },
                    { id: 4, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2790', codigo: '51-38N_578233', qtd: '01' },
                    { id: 5, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2790', codigo: '51-38N_578235', qtd: '01' },
                    { id: 6, imagemSimulada: true, descricao: 'CONSOLE P/ PINO TUCKER ST2790', codigo: '51-38N_578237', qtd: '01' },
                    { id: 7, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2790', codigo: '51-38N_578239', qtd: '01' },
                    { id: 8, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2840', codigo: '51-38N_578247', qtd: '01' },
                    { id: 9, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2840', codigo: '51-38N_578249', qtd: '01' },
                    { id: 10, imagemSimulada: true, descricao: 'CONSOLE P/ PINO TUCKER ST2850', codigo: '51-38N_578253', qtd: '01' },
                    { id: 11, imagemSimulada: true, descricao: 'CONSOLE P/PINO TUCKER ST2850', codigo: '51-38N_578255', qtd: '01' }
                ]
            }));
            setCarregandoPdf(false);
        }, 1500);
    };

    const lidarComEnvio = (e) => {
        e.preventDefault();
        alert('Solicitação de Transmissão criada com sucesso!');
        console.log(dados);
    };

    return (
        <div className="formulario-container">
            <div className="formulario-header">
                <h2 className="formulario-title"><FilePlus size={28} color="#2563eb" /> Nova Solicitação de Transmissão</h2>
                <p>Faça o upload do documento PDF para auto-preencher os dados de construção e engenharia.</p>
            </div>

            <form onSubmit={lidarComEnvio} className="formulario-card">

                {/* UPLOAD DO PDF */}
                <div className="form-section upload-section">
                    <div className="upload-box">
                        <UploadCloud size={40} color="#6b7280" />
                        <p>Clique ou arraste a Transmissão de Desenhos (PDF) aqui</p>
                        <input type="file" accept=".pdf" onChange={handleUploadPDF} className="file-input" />
                        {carregandoPdf && <p className="loading-text">A extrair dados do PDF...</p>}
                    </div>
                </div>

                <hr className="divider" />

                {/* CABEÇALHO DO DOCUMENTO */}
                <div className="form-section">
                    <h3 className="section-title"><LayoutTemplate size={20} /> Informações do Cabeçalho</h3>
                    <div className="formulario-grid">
                        <div className="form-group">
                            <label>Projeto</label>
                            <input type="text" name="projeto" value={dados.projeto} onChange={lidarComMudanca} placeholder="Extraído do PDF" />
                        </div>
                        <div className="form-group">
                            <label>Transmissão n.º</label>
                            <input type="text" name="numeroTransmissao" value={dados.numeroTransmissao} onChange={lidarComMudanca} placeholder="Extraído do PDF" />
                        </div>
                        <div className="form-group">
                            <label>Objeto</label>
                            <input type="text" name="objeto" value={dados.objeto} onChange={lidarComMudanca} placeholder="Extraído do PDF" />
                        </div>
                        <div className="form-group">
                            <label>DE: (Remetente)</label>
                            <input type="text" name="remetente" value={dados.remetente} onChange={lidarComMudanca} placeholder="Extraído do PDF" />
                        </div>
                        <div className="form-group">
                            <label>Para: (Destinatário)</label>
                            <input type="text" name="destinatario" value={dados.destinatario} onChange={lidarComMudanca} placeholder="Extraído do PDF" />
                        </div>
                        <div className="form-group">
                            <label>Contacto Técnico</label>
                            <input type="email" name="contatoTecnico" value={dados.contatoTecnico} onChange={lidarComMudanca} placeholder="Extraído do PDF" />
                        </div>
                        <div className="form-group">
                            <label>Data de Solicitação</label>
                            <input type="date" name="dataSolicitacao" value={dados.dataSolicitacao} onChange={lidarComMudanca} />
                        </div>
                        <div className="form-group">
                            <label>Data (Emissão)</label>
                            <input type="date" name="dataData" value={dados.dataData} onChange={lidarComMudanca} />
                        </div>

                        {/* Link Syncplicity */}
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Documentação de Referência (Syncplicity)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="url"
                                    name="linkSyncplicity"
                                    value={dados.linkSyncplicity}
                                    onChange={lidarComMudanca}
                                    placeholder="Link extraído do PDF"
                                    style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none' }}
                                />
                                {dados.linkSyncplicity && (
                                    <a
                                        href={dados.linkSyncplicity}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '5px',
                                            padding: '0 1rem', backgroundColor: '#e5e7eb',
                                            color: '#374151', textDecoration: 'none',
                                            borderRadius: '0.5rem', fontWeight: 'bold'
                                        }}
                                    >
                                        <ExternalLink size={18} /> Abrir Link
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="divider" />

                {/* TABELA DE ITENS CONSTRUTIVOS COM COLUNA IMAGEM */}
                <div className="form-section">
                    <h3 className="section-title"><ListChecks size={20} /> Itens para Construção (Extraídos do PDF)</h3>

                    {dados.itensConstrutivos.length === 0 ? (
                        <p className="empty-message">Nenhum item carregado. Faça o upload do PDF.</p>
                    ) : (
                        <div className="table-container">
                            <table className="itens-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '60px' }}>ITEM</th>
                                        <th style={{ width: '80px', textAlign: 'center' }}>IMAGEM</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>CÓDIGO</th>
                                        <th style={{ width: '100px' }}>QTD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados.itensConstrutivos.map((item, index) => (
                                        <tr key={item.id}>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#6b7280' }}>
                                                {item.id}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn-table-img"
                                                    title={item.imagemSimulada ? "Ver Imagem" : "Fazer upload da Imagem"}
                                                >
                                                    <ImageIcon size={20} />
                                                </button>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={item.descricao}
                                                    onChange={(e) => lidarMudancaItem(index, 'descricao', e.target.value)}
                                                    className="table-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={item.codigo}
                                                    onChange={(e) => lidarMudancaItem(index, 'codigo', e.target.value)}
                                                    className="table-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={item.qtd}
                                                    onChange={(e) => lidarMudancaItem(index, 'qtd', e.target.value)}
                                                    className="table-input"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <hr className="divider" />

                <div className="form-actions">
                    <button type="submit" className="btn-enviar">
                        <Send size={18} /> Validar e Enviar Solicitação
                    </button>
                </div>
            </form>
        </div>
    );
}
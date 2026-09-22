// src/pages/Acompanhamento/ModalDetalhes.jsx
import React from 'react';
import { X, Check } from 'lucide-react';

// Importação das Fases (Ajusta o caminho consoante a organização das tuas pastas)
import Fase1 from '../../pages/Fases/Fase1/Fase1';
import Fase2 from '../../pages/Fases/Fase2/Fase2';
import Fase3 from '../../pages/Fases/Fase3/Fase3';
import './ModalDetalhes.css';

/**
 * Componente ModalDetalhes
 * @param {Object} item - Os dados da solicitação selecionada na tabela
 * @param {Function} aoFechar - Função que avisa o pai para esconder a janela
 */
export default function ModalDetalhes({ item, aoFechar }) {
    // Segurança: se não houver item, não desenha nada
    if (!item) return null;

    // A Lógica da Linha do Tempo (Tracker) foi movida para cá
    const renderizarTracker = (faseAtual) => {
        const fases = [
            { numero: 1, nome: 'Fase 1: Orçamento' },
            { numero: 2, nome: 'Fase 2: Planejamento' },
            { numero: 3, nome: 'Fase 3: Manufatura' }
        ];

        return (
            <div className="tracker-container">
                <div className="tracker-linha-fundo"></div>
                {fases.map((fase) => {
                    const concluida = faseAtual > fase.numero;
                    const ativa = faseAtual === fase.numero;

                    let classePasso = 'passo-futuro';
                    if (concluida) classePasso = 'passo-concluido';
                    if (ativa) classePasso = 'passo-ativo';

                    return (
                        <div key={fase.numero} className={`tracker-passo ${classePasso}`}>
                            <div className="tracker-bolinha">
                                {concluida ? <Check size={18} /> : fase.numero}
                            </div>
                            <span className="tracker-texto">{fase.nome}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        // O clique no fundo escuro aciona a função de fechar
        <div className="modal-overlay" onClick={aoFechar}>
            {/* stopPropagation impede que clicar na caixa branca feche o modal */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Cabeçalho do Modal */}
                <div className="modal-header">
                    <div>
                        <h2>Pedido: {item.id}</h2>
                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                            Solicitante: {item.solicitante} | Criado em: {item.data}
                        </span>
                    </div>
                    {/* Botão X aciona a função de fechar */}
                    <button className="btn-fechar-modal" onClick={aoFechar}>
                        <X size={24} />
                    </button>
                </div>

                {/* Corpo do Modal */}
                <div className="modal-body">
                    {/* Renderiza a Linha do Tempo */}
                    {renderizarTracker(item.faseAtual)}

                    {/* Renderiza o componente correto com base na fase do item */}
                    <div style={{ marginTop: '2rem' }}>
                        {item.faseAtual === 1 && <Fase1 />}
                        {item.faseAtual === 2 && <Fase2 />}
                        {item.faseAtual === 3 && <Fase3 />}
                    </div>
                </div>

            </div>
        </div>
    );
}
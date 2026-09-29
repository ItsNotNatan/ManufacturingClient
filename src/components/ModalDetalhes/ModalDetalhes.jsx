// =================================================================
// ARQUIVO: src/components/ModalDetalhes/ModalDetalhes.jsx
// DESCRIÇÃO: Componente de janela flutuante utilizando React Portals
// =================================================================
import React from 'react';
// 1. Importamos a função de "teletransporte" do React DOM
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';

// Importação das Fases (Ajusta o caminho consoante a organização das tuas pastas)
import Fase1 from '../../pages/Fases/Fase1/Fase1';
import Fase2 from '../../pages/Fases/Fase2/Fase2';
import Fase3 from '../../pages/Fases/Fase3/Fase3';
import './ModalDetalhes.css';

export default function ModalDetalhes({ item, aoFechar }) {
    // Segurança: se não houver item selecionado, não desenha nada
    if (!item) return null;

    // A Lógica da Linha do Tempo (Tracker)
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

    // 2. Aqui é a magia do Portal! 
    // Em vez de retornar uma <div> normal, usamos o createPortal.
    // O primeiro parâmetro é o HTML do modal, o segundo é o destino (document.body)
    return createPortal(
        <div className="modal-overlay" onClick={aoFechar}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Cabeçalho do Modal */}
                <div className="modal-header">
                    <div>
                        <h2>Pedido: {item.id}</h2>
                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                            Solicitante: {item.solicitante || item.scl} | Criado em: {item.data || 'Data indisponível'}
                        </span>
                    </div>
                    {/* Botão X para fechar */}
                    <button className="btn-fechar-modal" onClick={aoFechar}>
                        <X size={24} />
                    </button>
                </div>

                {/* Corpo do Modal */}
                <div className="modal-body">
                    {/* Renderiza a Linha do Tempo visual */}
                    {renderizarTracker(item.faseAtual)}

                    {/* Renderiza a Fase correspondente ao projeto */}
                    <div style={{ marginTop: '2rem' }}>
                        {item.faseAtual === 1 && <Fase1 />}
                        {item.faseAtual === 2 && <Fase2 />}
                        {item.faseAtual === 3 && <Fase3 />}
                    </div>
                </div>

            </div>
        </div>,
        document.body // <-- Este comando atira o Modal para a raiz da página, cobrindo TUDO.
    );
}
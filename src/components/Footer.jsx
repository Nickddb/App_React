import React from 'react';

/**
 * Componente Footer:
 * Rodapé modular que recebe estatísticas e telemetria do Virtual DOM via Props.
 */
export default function Footer({
  vdomUpdatesCount,
  lastVdomAction,
  onRestoreDefaults
}) {
  return (
    <footer className="app-footer">
      <div className="footer-vdom-box">
        <div className="vdom-indicator">
          <span className="vdom-dot" aria-hidden="true" />
          <strong>Monitor do Virtual DOM:</strong>
          <span>
            {vdomUpdatesCount} atualizações reativas nesta sessão — Última operação:{' '}
            <em>{lastVdomAction}</em>
          </span>
        </div>
        <button
          type="button"
          className="btn-link-footer"
          onClick={onRestoreDefaults}
        >
          Restaurar dados originais da demonstração
        </button>
      </div>

      <div className="footer-bottom">
        <p>
          Desenvolvido com <strong>React 18</strong> + <strong>Vite</strong> •
          Aplicação Prática dos Fundamentos: JSX, Componentes, Props, Listas & Keys,
          Renderização Condicional e Virtual DOM.
        </p>
      </div>
    </footer>
  );
}


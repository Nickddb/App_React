import React from 'react';

/**
 * Componente EmptyState:
 * Exibido via Renderização Condicional quando a lista de tarefas está vazia
 * ou quando nenhum item corresponde aos filtros de pesquisa aplicados.
 */
export default function EmptyState({
  hasActiveFilters,
  onClearFilters,
  onRestoreDefaults
}) {
  return (
    <div className="empty-state-card" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        {hasActiveFilters ? '🔎' : '🌱'}
      </div>

      {/* Renderização Condicional com Operador Ternário (? :) para diferenciar cenários */}
      <h3 className="empty-state-title">
        {hasActiveFilters
          ? 'Nenhuma meta encontrada para os filtros selecionados'
          : 'Sua lista de metas está vazia no momento'}
      </h3>

      <p className="empty-state-description">
        {hasActiveFilters
          ? 'Tente ajustar o termo pesquisado ou limpar os filtros de status, categoria e prioridade para visualizar todas as suas tarefas.'
          : 'Comece adicionando uma nova meta no formulário acima ou restaure a coleção inicial de tarefas do projeto.'}
      </p>

      <div className="empty-state-actions">
        {hasActiveFilters ? (
          <button
            type="button"
            className="btn-primary"
            onClick={onClearFilters}
          >
            Limpar Filtros e Mostrar Tudo
          </button>
        ) : (
          <button
            type="button"
            className="btn-secondary"
            onClick={onRestoreDefaults}
          >
            Restaurar Metas de Exemplo
          </button>
        )}
      </div>
    </div>
  );
}


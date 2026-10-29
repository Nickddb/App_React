import React from 'react';

/**
 * Componente SearchInput:
 * Permite filtrar dinamicamente as metas por termo de busca, status, categoria e prioridade.
 * Recebe valores atuais e funções de atualização via Props.
 */
export default function SearchInput({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  categories,
  priorities,
  onClearFilters,
  hasActiveFilters,
  resultCount,
  totalCount
}) {
  const statusOptions = [
    { id: 'all', label: 'Todas' },
    { id: 'pending', label: 'Pendentes' },
    { id: 'completed', label: 'Concluídas' }
  ];

  return (
    <section className="card-panel search-panel" aria-label="Filtros e Busca de Metas">
      <div className="search-top-row">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            className="form-input search-input"
            placeholder="Buscar meta por título, nota ou palavra-chave..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar meta por palavra-chave"
          />
          {/* Renderização condicional para botão de limpar texto */}
          {searchTerm && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => onSearchChange('')}
              title="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Botões de filtro rápido por status renderizados com .map() e key */}
        <div className="status-tabs" role="group" aria-label="Filtrar por status">
          {statusOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`status-tab ${
                statusFilter === option.id ? 'status-tab-active' : ''
              }`}
              onClick={() => onStatusFilterChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="search-bottom-row">
        <div className="filter-selects">
          <div className="filter-inline">
            <label htmlFor="filter-category" className="filter-label">
              Categoria:
            </label>
            <select
              id="filter-category"
              className="form-select select-compact"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
            >
              <option value="todas">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-inline">
            <label htmlFor="filter-priority" className="filter-label">
              Prioridade:
            </label>
            <select
              id="filter-priority"
              className="form-select select-compact"
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
            >
              <option value="todas">Todas as prioridades</option>
              {priorities.map((prio) => (
                <option key={prio.value} value={prio.value}>
                  {prio.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-summary">
          <span className="filter-count-badge">
            Exibindo <strong>{resultCount}</strong> de <strong>{totalCount}</strong> metas
          </span>

          {/* Renderização Condicional (&&): Botão aparece somente quando há filtros ativos */}
          {hasActiveFilters && (
            <button
              type="button"
              className="btn-link-reset"
              onClick={onClearFilters}
            >
              Limpar filtros ativos
            </button>
          )}
        </div>
      </div>
    </section>
  );
}


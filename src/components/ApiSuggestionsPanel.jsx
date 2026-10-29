import React, { useState, useEffect, useCallback } from 'react';

const FALLBACK_SUGGESTIONS = [
  {
    id: 'api-201',
    title: 'Praticar imutabilidade de estado com useState e spread operator',
    category: 'Estado & Forms',
    priority: 'alta'
  },
  {
    id: 'api-202',
    title: 'Criar componente reutilizável de filtro com Props desestruturadas',
    category: 'Arquitetura React',
    priority: 'media'
  },
  {
    id: 'api-203',
    title: 'Testar reconciliação do Virtual DOM ao ordenar listas com keys',
    category: 'Performance',
    priority: 'media'
  },
  {
    id: 'api-204',
    title: 'Sincronizar estado com sistemas externos usando useEffect e cleanup',
    category: 'Hooks & APIs',
    priority: 'alta'
  },
  {
    id: 'api-205',
    title: 'Configurar rotas dinâmicas e parâmetros de busca com React Router',
    category: 'Roteamento',
    priority: 'media'
  }
];

/**
 * Componente ApiSuggestionsPanel:
 * Demonstra na prática os Critérios 09 (useEffect) e 10 (Consumo de APIs):
 * busca e apresenta dados de serviços externos (JSONPlaceholder REST API)
 * com controle de ciclo de vida, AbortController, estados de loading/erro e fallback offline.
 */
export default function ApiSuggestionsPanel({ onImportSuggestion, onApiSync }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [sourceLabel, setSourceLabel] = useState('Carregando...');
  const [lastSyncTime, setLastSyncTime] = useState('');
  const [importedIds, setImportedIds] = useState([]);

  const fetchSuggestions = useCallback(
    async (signal) => {
      setLoading(true);
      const endpoint = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;

      try {
        const response = await fetch(endpoint, signal ? { signal } : undefined);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} — Falha ao buscar dados da API`);
        }
        const data = await response.json();

        const formatted = data.map((item, idx) => ({
          id: `remote-${item.id}`,
          title: `Meta sugerida #${item.id}: ${item.title}`,
          category:
            idx % 3 === 0
              ? 'Hooks & APIs'
              : idx % 3 === 1
              ? 'Estudos Gerais'
              : 'UI Dinâmica',
          priority: idx === 0 ? 'alta' : idx === 1 ? 'media' : 'baixa'
        }));

        setSuggestions(formatted);
        setSourceLabel(`JSONPlaceholder REST API (GET /todos?_limit=${limit})`);
        setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
        if (onApiSync) {
          onApiSync(`API externa sincronizada (${formatted.length} itens recebidos)`);
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        // Fallback resiliente caso o ambiente esteja sem internet
        setSuggestions(FALLBACK_SUGGESTIONS.slice(0, limit));
        setSourceLabel('Catálogo Local de Estudo (Fallback Offline)');
        setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
      } finally {
        setLoading(false);
      }
    },
    [limit, onApiSync]
  );

  // Hook useEffect (Critério 09): sincroniza o componente com a API externa na montagem e quando `limit` muda
  useEffect(() => {
    const controller = new AbortController();
    fetchSuggestions(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchSuggestions]);

  const handleImport = (suggestion) => {
    onImportSuggestion({
      title: suggestion.title,
      category: suggestion.category,
      priority: suggestion.priority,
      notes: `Importada via Consumo de API (${sourceLabel}).`
    });
    setImportedIds((prev) => [...prev, suggestion.id]);
  };

  return (
    <aside className="card-panel suggestions-panel" aria-labelledby="api-heading">
      <div className="suggestions-header">
        <div>
          <h2 id="api-heading" className="panel-title">
            🌐 Consumo de APIs &amp; Hook useEffect (Sugestões Externas)
          </h2>
          <p className="panel-description">
            Fonte ativa: <strong>{sourceLabel}</strong>
            {lastSyncTime && <span> • Sincronizado às {lastSyncTime}</span>}
          </p>
        </div>

        <div className="suggestions-controls">
          <label htmlFor="api-limit-select" className="filter-label">
            Qtd. API:
          </label>
          <select
            id="api-limit-select"
            className="form-select select-compact"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            disabled={loading}
          >
            <option value={3}>3 sugestões</option>
            <option value={5}>5 sugestões</option>
          </select>

          <button
            type="button"
            className="btn-ghost"
            onClick={() => fetchSuggestions()}
            disabled={loading}
          >
            {loading ? 'Buscando...' : '🔄 Recarregar API'}
          </button>
        </div>
      </div>

      {/* Renderização Condicional para estado de carregamento */}
      {loading ? (
        <div className="suggestions-loading">
          Carregando sugestões externas de estudo via <code>fetch()</code>...
        </div>
      ) : (
        <div className="suggestions-grid">
          {suggestions.map((item) => {
            const isAlreadyImported = importedIds.includes(item.id);
            return (
              <div key={item.id} className="suggestion-item">
                <div className="suggestion-info">
                  <span className="badge badge-category">{item.category}</span>
                  <p className="suggestion-title">{item.title}</p>
                </div>
                <button
                  type="button"
                  className={`btn-sm ${
                    isAlreadyImported ? 'btn-imported' : 'btn-import'
                  }`}
                  onClick={() => handleImport(item)}
                  disabled={isAlreadyImported}
                >
                  {isAlreadyImported ? '✓ Adicionada ao Painel' : '+ Importar Meta'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}

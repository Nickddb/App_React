import React, { useState, useEffect } from 'react';

const FALLBACK_SUGGESTIONS = [
  {
    id: 'api-201',
    title: 'Praticar imutabilidade de estado com useState e spread operator',
    category: 'Fundamentos',
    priority: 'alta'
  },
  {
    id: 'api-202',
    title: 'Criar componente reutilizável de filtro com Props tipadas',
    category: 'Arquitetura React',
    priority: 'media'
  },
  {
    id: 'api-203',
    title: 'Testar reconciliação do Virtual DOM ao ordenar listas com keys',
    category: 'Performance',
    priority: 'media'
  }
];

/**
 * Componente ApiSuggestionsPanel:
 * Demonstra o uso de `useEffect` e consumo assíncrono de API (com fallback resiliente)
 * para sugerir novas metas de estudo que podem ser importadas com 1 clique.
 */
export default function ApiSuggestionsPanel({ onImportSuggestion }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sourceLabel, setSourceLabel] = useState('Carregando...');
  const [importedIds, setImportedIds] = useState([]);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=3'
      );
      if (!response.ok) {
        throw new Error('Resposta não-OK da API');
      }
      const data = await response.json();

      const formatted = data.map((item, idx) => ({
        id: `remote-${item.id}`,
        title: `Meta sugerida #${item.id}: ${item.title}`,
        category: idx === 0 ? 'Estudos Gerais' : 'UI Dinâmica',
        priority: idx === 0 ? 'alta' : 'media'
      }));

      setSuggestions(formatted);
      setSourceLabel('JSONPlaceholder REST API');
    } catch {
      // Fallback caso o ambiente esteja sem internet
      setSuggestions(FALLBACK_SUGGESTIONS);
      setSourceLabel('Catálogo Local de Estudo (Modo Offline)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleImport = (suggestion) => {
    onImportSuggestion({
      title: suggestion.title,
      category: suggestion.category,
      priority: suggestion.priority,
      notes: `Importada via painel de sugestões (${sourceLabel}).`
    });
    setImportedIds((prev) => [...prev, suggestion.id]);
  };

  return (
    <aside className="card-panel suggestions-panel" aria-labelledby="api-heading">
      <div className="suggestions-header">
        <div>
          <h2 id="api-heading" className="panel-title">
            🌐 Sugestões de Metas (Hook useEffect & API)
          </h2>
          <p className="panel-description">
            Fonte atual: <strong>{sourceLabel}</strong>
          </p>
        </div>
        <button
          type="button"
          className="btn-ghost"
          onClick={fetchSuggestions}
          disabled={loading}
        >
          {loading ? 'Buscando...' : '🔄 Atualizar'}
        </button>
      </div>

      {/* Renderização Condicional para estado de carregamento */}
      {loading ? (
        <div className="suggestions-loading">
          Carregando sugestões externas de estudo...
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
                  {isAlreadyImported ? '✓ Adicionada' : '+ Importar'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}


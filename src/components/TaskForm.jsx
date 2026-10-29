import React, { useState } from 'react';

/**
 * Componente TaskForm:
 * Formulário controlado em React para entrada e validação de novas tarefas/metas.
 * Comunica-se com o componente Pai através da prop `onAddTask`.
 */
export default function TaskForm({ onAddTask, categories, priorities }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Estudos Gerais');
  const [priority, setPriority] = useState('media');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Por favor, informe um título descritivo para a sua meta.');
      return;
    }

    if (trimmedTitle.length < 3) {
      setErrorMessage('O título da meta deve possuir pelo menos 3 caracteres.');
      return;
    }

    onAddTask({
      title: trimmedTitle,
      category,
      priority,
      notes: notes.trim() || 'Meta cadastrada pelo usuário no painel.'
    });

    // Limpa os campos após adicionar (atualização via Virtual DOM)
    setTitle('');
    setNotes('');
    setPriority('media');
    setErrorMessage('');
  };

  return (
    <section className="card-panel task-form-panel" aria-labelledby="form-heading">
      <div className="panel-header">
        <div>
          <h2 id="form-heading" className="panel-title">
            ➕ Nova Meta ou Tarefa
          </h2>
          <p className="panel-description">
            Adicione novos objetivos e observe a atualização instantânea via Virtual DOM.
          </p>
        </div>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Ocultar detalhes ▲' : 'Adicionar observação ▼'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-row-main">
          <div className="form-group form-group-title">
            <label htmlFor="task-title" className="form-label">
              Título da Meta *
            </label>
            <input
              id="task-title"
              type="text"
              className={`form-input ${errorMessage ? 'input-error' : ''}`}
              placeholder="Ex.: Revisar conceitos de Props e Renderização Condicional..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-category" className="form-label">
              Categoria
            </label>
            <select
              id="task-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-priority" className="form-label">
              Prioridade
            </label>
            <select
              id="task-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map((prio) => (
                <option key={prio.value} value={prio.value}>
                  {prio.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Adicionar Meta
            </button>
          </div>
        </div>

        {/* Renderização Condicional (&&): Exibe campo extra apenas quando expandido */}
        {isExpanded && (
          <div className="form-row-extra">
            <label htmlFor="task-notes" className="form-label">
              Notas / Critérios de Conclusão (Opcional)
            </label>
            <input
              id="task-notes"
              type="text"
              className="form-input"
              placeholder="Ex.: Criar exemplos práticos no código e testar no navegador..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        )}

        {/* Renderização Condicional (&&): Exibe mensagem de validação se houver erro */}
        {errorMessage && (
          <div className="form-error-banner" role="alert">
            ⚠️ {errorMessage}
          </div>
        )}
      </form>
    </section>
  );
}


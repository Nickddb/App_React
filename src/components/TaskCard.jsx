import React, { useState } from 'react';

const PRIORITY_MAP = {
  alta: { label: 'Alta', badgeClass: 'badge-priority-high' },
  media: { label: 'Média', badgeClass: 'badge-priority-medium' },
  baixa: { label: 'Baixa', badgeClass: 'badge-priority-low' }
};

/**
 * Componente TaskCard:
 * Componente filho modular que recebe os dados de uma tarefa específica via `props`
 * e renderiza o card interativo com opções de concluir, editar, alterar prioridade e excluir.
 */
export default function TaskCard({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onCyclePriority
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedNotes, setEditedNotes] = useState(task.notes || '');

  const priorityInfo = PRIORITY_MAP[task.priority] || PRIORITY_MAP.media;

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const cleanTitle = editedTitle.trim();
    if (!cleanTitle) return;

    onEditTask(task.id, {
      title: cleanTitle,
      notes: editedNotes.trim()
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedNotes(task.notes || '');
    setIsEditing(false);
  };

  return (
    <article
      className={`task-card ${task.completed ? 'task-card-completed' : 'task-card-pending'}`}
    >
      <div className="task-card-left">
        <button
          type="button"
          className={`checkbox-btn ${task.completed ? 'checkbox-checked' : ''}`}
          onClick={() => onToggleTask(task.id)}
          aria-label={
            task.completed
              ? `Marcar "${task.title}" como pendente`
              : `Marcar "${task.title}" como concluída`
          }
          title={task.completed ? 'Reabrir meta' : 'Concluir meta'}
        >
          {/* Renderização Condicional do ícone de check */}
          {task.completed ? '✓' : ''}
        </button>
      </div>

      <div className="task-card-content">
        <div className="task-meta-row">
          <span className="badge badge-category">{task.category}</span>

          <button
            type="button"
            className={`badge ${priorityInfo.badgeClass} badge-interactive`}
            onClick={() => onCyclePriority(task.id)}
            title="Clique para alternar a prioridade"
          >
            Prioridade: {priorityInfo.label} ↻
          </button>

          {/* Renderização Condicional (? :) do selo de status */}
          <span
            className={`badge ${
              task.completed ? 'badge-status-done' : 'badge-status-open'
            }`}
          >
            {task.completed ? 'Concluída' : 'Em andamento'}
          </span>

          <span className="task-date">📅 {task.createdAt}</span>
        </div>

        {/* Renderização Condicional (? :): Alterna entre Modo de Edição e Modo de Visualização */}
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="task-edit-form">
            <input
              type="text"
              className="form-input input-sm"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Título da meta"
              autoFocus
            />
            <input
              type="text"
              className="form-input input-sm"
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              placeholder="Observações da meta"
            />
            <div className="task-edit-actions">
              <button type="submit" className="btn-sm btn-save">
                Salvar
              </button>
              <button
                type="button"
                className="btn-sm btn-cancel"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className={`task-title ${task.completed ? 'task-title-done' : ''}`}>
              {task.title}
            </h3>
            {task.notes && <p className="task-notes">{task.notes}</p>}
          </>
        )}
      </div>

      <div className="task-card-actions">
        {!isEditing && (
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => setIsEditing(true)}
            title="Editar meta"
            aria-label={`Editar meta ${task.title}`}
          >
            ✏️
          </button>
        )}
        <button
          type="button"
          className="action-icon-btn action-delete-btn"
          onClick={() => onDeleteTask(task.id)}
          title="Excluir meta"
          aria-label={`Excluir meta ${task.title}`}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}


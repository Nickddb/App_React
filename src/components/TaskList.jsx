import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

/**
 * Componente TaskList:
 * Responsável por iterar sobre a coleção de tarefas utilizando `.map()` com `key` única
 * ou exibir o componente `EmptyState` via Renderização Condicional quando não houver itens.
 */
export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onCyclePriority,
  hasActiveFilters,
  onClearFilters,
  onRestoreDefaults,
  onClearCompleted,
  completedCount
}) {
  return (
    <section className="task-list-section" aria-labelledby="list-heading">
      <div className="task-list-header">
        <div>
          <h2 id="list-heading" className="section-title">
            📌 Lista de Metas e Atividades
          </h2>
          <p className="section-subtitle">
            Clique no círculo para concluir uma meta ou no selo de prioridade para alterná-la.
          </p>
        </div>

        {/* Renderização Condicional (&&): Mostra botão de limpar concluídas apenas se houver alguma */}
        {completedCount > 0 && (
          <button
            type="button"
            className="btn-outline-danger"
            onClick={onClearCompleted}
          >
            🧹 Remover Concluídas ({completedCount})
          </button>
        )}
      </div>

      {/* Renderização Condicional (? :): Verifica se existem itens a exibir */}
      {tasks.length === 0 ? (
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={onClearFilters}
          onRestoreDefaults={onRestoreDefaults}
        />
      ) : (
        <div className="task-cards-container">
          {/* Listas e Keys: Iteração dinâmica com .map() associando key={task.id} */}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onCyclePriority={onCyclePriority}
            />
          ))}
        </div>
      )}
    </section>
  );
}


import React, { useState } from 'react';

const REQUIREMENTS_DATA = [
  {
    id: 'req-jsx',
    title: '1. JSX (JavaScript XML)',
    badge: 'Sintaxe Declarativa',
    summary:
      'Combinação declarativa de estruturas HTML semânticas com expressões JavaScript diretamente no retorno dos componentes.',
    files: [
      'src/components/Header.jsx',
      'src/components/TaskForm.jsx',
      'src/components/TaskCard.jsx'
    ],
    whereUsed: [
      'Cálculo e interpolação da porcentagem de progresso: {completionPercentage}% em Header.jsx.',
      'Atributos dinâmicos baseados em expressões JS: style={{ width: `${completionPercentage}%` }} e classes dinâmicas com template literals.',
      'Binding de eventos declarativos (onSubmit, onChange, onClick) em todos os formulários e botões.'
    ],
    codeSnippet: `// Exemplo real em src/components/Header.jsx:
const completionPercentage =
  totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

return (
  <div className="progress-bar-fill" style={{ width: \`\${completionPercentage}%\` }} />
);`
  },
  {
    id: 'req-components',
    title: '2. Componentes Modulares e Reutilizáveis',
    badge: 'Arquitetura Modular',
    summary:
      'Divisão da interface em pequenos blocos independentes, coesos e reutilizáveis seguindo exatamente a estrutura sugerida no Guia da Atividade.',
    files: [
      'src/components/Header.jsx (Header + StatCard)',
      'src/components/TaskForm.jsx',
      'src/components/SearchInput.jsx',
      'src/components/TaskList.jsx',
      'src/components/TaskCard.jsx',
      'src/components/EmptyState.jsx',
      'src/components/ApiSuggestionsPanel.jsx',
      'src/components/Footer.jsx'
    ],
    whereUsed: [
      'Header.jsx: Cabeçalho com navegação e subcomponente reutilizável StatCard.',
      'TaskForm.jsx e SearchInput.jsx: Entrada controlada de dados e barra de busca/filtros.',
      'TaskList.jsx, TaskCard.jsx e EmptyState.jsx: Exibição modular da coleção de metas e estado vazio.',
      'Footer.jsx: Rodapé com monitor em tempo real do Virtual DOM.'
    ],
    codeSnippet: `// Composição modular em src/App.jsx:
<Header {...headerProps} />
<TaskForm onAddTask={handleAddTask} categories={CATEGORIES} priorities={PRIORITIES} />
<SearchInput {...filterProps} />
<TaskList tasks={filteredTasks} {...taskActions} />
<Footer {...footerProps} />`
  },
  {
    id: 'req-props',
    title: '3. Props (Propriedades e Fluxo Unidirecional)',
    badge: 'Comunicação Pai → Filho',
    summary:
      'Transferência unidirecional de dados e callbacks de eventos dos componentes pais (App e TaskList) para os componentes filhos (Header, TaskCard, EmptyState, SearchInput).',
    files: [
      'src/App.jsx → src/components/Header.jsx',
      'src/components/TaskList.jsx → src/components/TaskCard.jsx',
      'src/components/TaskList.jsx → src/components/EmptyState.jsx'
    ],
    whereUsed: [
      'App passa contadores calculados (totalTasks, completedTasks, pendingTasks) para Header via props.',
      'TaskList repassa o objeto `task` e funções `onToggleTask`, `onDeleteTask`, `onEditTask`, `onCyclePriority` para cada `TaskCard`.',
      'StatCard em Header.jsx recebe `label`, `value`, `subtitle` e `variant` via desestruturação de props.'
    ],
    codeSnippet: `// Passagem de Props de TaskList.jsx para TaskCard.jsx:
<TaskCard
  key={task.id}
  task={task}
  onToggleTask={onToggleTask}
  onDeleteTask={onDeleteTask}
  onEditTask={onEditTask}
  onCyclePriority={onCyclePriority}
/>`
  },
  {
    id: 'req-lists-keys',
    title: '4. Listas e Keys (.map e key única)',
    badge: 'Coleções Dinâmicas',
    summary:
      'Iteração dinâmica sobre arrays de dados utilizando `.map()` e atribuindo sempre uma chave única (`key`) estável a cada elemento renderizado.',
    files: [
      'src/components/TaskList.jsx',
      'src/components/Header.jsx',
      'src/components/TaskForm.jsx',
      'src/components/SearchInput.jsx',
      'src/components/ApiSuggestionsPanel.jsx'
    ],
    whereUsed: [
      'TaskList.jsx: Renderiza a lista de tarefas filtradas com `filteredTasks.map((task) => <TaskCard key={task.id} ... />)`.',
      'Header.jsx: Renderiza os 4 cartões de indicadores com `statsItems.map((item) => <StatCard key={item.id} ... />)`.',
      'SearchInput.jsx e TaskForm.jsx: Renderizam abas de status e opções de `<select>` usando `.map()` com `key`.'
    ],
    codeSnippet: `// Renderização de lista com key única em src/components/TaskList.jsx:
<div className="task-cards-container">
  {tasks.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      onToggleTask={onToggleTask}
      onDeleteTask={onDeleteTask}
    />
  ))}
</div>`
  },
  {
    id: 'req-conditional',
    title: '5. Renderização Condicional (? : e &&)',
    badge: 'Exibição Baseada em Estado',
    summary:
      'Exibição, alternância ou ocultação de componentes e elementos visuais de acordo com condições lógicas e estado atual da aplicação.',
    files: [
      'src/components/TaskList.jsx',
      'src/components/EmptyState.jsx',
      'src/components/TaskCard.jsx',
      'src/components/TaskForm.jsx',
      'src/components/SearchInput.jsx'
    ],
    whereUsed: [
      'TaskList.jsx: Operador ternário `tasks.length === 0 ? <EmptyState /> : <div className="task-cards-container">...</div>`.',
      'EmptyState.jsx: Alterna título, ícone e botão de ação conforme `hasActiveFilters ? ... : ...`.',
      'TaskCard.jsx: Alterna entre modo de edição inline (`isEditing ? <form>...</form> : <>...</>`) e selo `Concluída` vs `Em andamento`.',
      'TaskForm.jsx: Operador lógico `&&` para exibir o alerta de erro (`{errorMessage && ...}`) e campo de observações (`{isExpanded && ...}`).'
    ],
    codeSnippet: `// Renderização condicional em src/components/TaskList.jsx:
{tasks.length === 0 ? (
  <EmptyState
    hasActiveFilters={hasActiveFilters}
    onClearFilters={onClearFilters}
    onRestoreDefaults={onRestoreDefaults}
  />
) : (
  <div className="task-cards-container">
    {tasks.map((task) => <TaskCard key={task.id} task={task} ... />)}
  </div>
)}`
  },
  {
    id: 'req-vdom',
    title: '6. Virtual DOM e Estado Reativo Imutável',
    badge: 'Performance & Reconciliação',
    summary:
      'Atualizações de estado imutáveis (com useState, map, filter e spread operator) permitindo que o algoritmo de diffing do React atualize apenas os nós modificados na DOM real.',
    files: [
      'src/App.jsx',
      'src/components/Header.jsx',
      'src/components/Footer.jsx'
    ],
    whereUsed: [
      'App.jsx: Todas as mutações de tarefas (adicionar, alternar conclusão, editar, mudar prioridade, remover) criam novas referências de array sem mutar o estado anterior.',
      'Monitor de Reconciliação VDOM (Header e Footer): Contabiliza e descreve em tempo real cada atualização reativa disparada pelo estado sem recarregar a página.'
    ],
    codeSnippet: `// Atualização imutável otimizada para o Virtual DOM em src/App.jsx:
const handleToggleTask = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
  registerVdomUpdate('Status de meta alternado (apenas 1 TaskCard reconciliado)');
};`
  }
];

export default function RequirementsGuide() {
  const [selectedReqId, setSelectedReqId] = useState('all');

  const visibleRequirements =
    selectedReqId === 'all'
      ? REQUIREMENTS_DATA
      : REQUIREMENTS_DATA.filter((item) => item.id === selectedReqId);

  return (
    <section className="requirements-page" aria-labelledby="req-page-title">
      <div className="card-panel req-intro-panel">
        <h2 id="req-page-title" className="panel-title">
          🧭 Mapeamento Completo dos Requisitos na Aplicação
        </h2>
        <p className="panel-description">
          Esta página interativa (e o arquivo <code>MAPEAMENTO_REQUISITOS.md</code> na raiz do repositório)
          documenta exatamente onde cada requisito do <strong>Guia da Atividade</strong> foi implementado no código-fonte.
        </p>

        <div className="req-filter-pills">
          <button
            type="button"
            className={`status-tab ${selectedReqId === 'all' ? 'status-tab-active' : ''}`}
            onClick={() => setSelectedReqId('all')}
          >
            Todos os Requisitos ({REQUIREMENTS_DATA.length})
          </button>
          {REQUIREMENTS_DATA.map((req) => (
            <button
              key={req.id}
              type="button"
              className={`status-tab ${selectedReqId === req.id ? 'status-tab-active' : ''}`}
              onClick={() => setSelectedReqId(req.id)}
            >
              {req.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="req-cards-grid">
        {visibleRequirements.map((req) => (
          <article key={req.id} className="card-panel req-detail-card">
            <div className="req-card-header">
              <span className="badge badge-category">{req.badge}</span>
              <h3 className="req-card-title">{req.title}</h3>
            </div>

            <p className="req-card-summary">{req.summary}</p>

            <div className="req-section-block">
              <h4 className="req-subheading">📂 Arquivos Correspondentes:</h4>
              <ul className="req-file-list">
                {req.files.map((file) => (
                  <li key={file}>
                    <code>{file}</code>
                  </li>
                ))}
              </ul>
            </div>

            <div className="req-section-block">
              <h4 className="req-subheading">🎯 Como foi aplicado na prática:</h4>
              <ul className="req-usage-list">
                {req.whereUsed.map((usage, index) => (
                  <li key={`${req.id}-usage-${index}`}>{usage}</li>
                ))}
              </ul>
            </div>

            <div className="req-section-block">
              <h4 className="req-subheading">💻 Trecho do Código-Fonte:</h4>
              <pre className="req-code-block">
                <code>{req.codeSnippet}</code>
              </pre>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


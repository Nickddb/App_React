import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const REQUIREMENTS_DATA = [
  {
    id: '01-jsx',
    number: '01',
    shortTitle: 'JSX',
    subtitle: 'Como escrever a interface usando sintaxe semelhante a HTML.',
    title: '01. JSX (JavaScript XML)',
    badge: 'Sintaxe Declarativa',
    summary:
      'Extensão de sintaxe para JavaScript que permite escrever estruturas visuais semelhantes a HTML diretamente nos componentes React, interpolando expressões JS, estilos dinâmicos e eventos.',
    files: [
      'src/components/Header.jsx',
      'src/components/TaskForm.jsx',
      'src/components/TaskCard.jsx',
      'src/App.jsx'
    ],
    whereUsed: [
      'Interpolação de expressões matemáticas e variáveis entre chaves, como {completionPercentage}% em Header.jsx.',
      'Atributos e estilos dinâmicos usando objetos JS: style={{ width: `${completionPercentage}%` }} e classes com template literals.',
      'Associação declarativa de eventos (onSubmit, onChange, onClick) em formulários, botões e filtros.'
    ],
    codeSnippet: `// Exemplo real em src/components/Header.jsx:
const completionPercentage =
  totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

return (
  <div className="progress-bar-fill" style={{ width: \`\${completionPercentage}%\` }} />
);`
  },
  {
    id: '02-componentes',
    number: '02',
    shortTitle: 'Componentes',
    subtitle: 'Como dividir a interface em partes reutilizáveis.',
    title: '02. Componentes Modulares e Reutilizáveis',
    badge: 'Arquitetura Modular',
    summary:
      'Divisão da interface em funções independentes, coesas e reutilizáveis, facilitando a manutenção, a legibilidade e o isolamento de responsabilidades.',
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
      'Header.jsx e StatCard: Cabeçalho principal e cartões de indicadores numéricos reutilizados 4 vezes.',
      'TaskForm.jsx e SearchInput.jsx: Componentes dedicados para entrada de dados e filtragem combinada.',
      'TaskList.jsx, TaskCard.jsx e EmptyState.jsx: Exibição modular da coleção de metas e estado vazio.',
      'ApiSuggestionsPanel.jsx e Footer.jsx: Integração com API externa e monitor de telemetria do Virtual DOM.'
    ],
    codeSnippet: `// Composição modular de componentes em src/App.jsx:
<Header {...headerProps} />
<TaskForm onAddTask={handleAddTask} categories={CATEGORIES} priorities={PRIORITIES} />
<SearchInput {...filterProps} />
<TaskList tasks={filteredTasks} {...taskActions} />
<ApiSuggestionsPanel onImportSuggestion={handleAddTask} />
<Footer {...footerProps} />`
  },
  {
    id: '03-props',
    number: '03',
    shortTitle: 'Props',
    subtitle: 'Como passar informações entre componentes.',
    title: '03. Props (Propriedades e Fluxo Unidirecional)',
    badge: 'Comunicação Pai → Filho',
    summary:
      'Mecanismo de passagem de dados e funções de callback de um componente Pai para componentes Filhos, mantendo o fluxo de dados unidirecional e previsível.',
    files: [
      'src/App.jsx → src/components/Header.jsx',
      'src/App.jsx → src/components/TaskForm.jsx',
      'src/components/TaskList.jsx → src/components/TaskCard.jsx',
      'src/components/TaskList.jsx → src/components/EmptyState.jsx'
    ],
    whereUsed: [
      'App.jsx envia métricas derivadas (totalTasks, completedTasks, pendingTasks) para Header.jsx via props.',
      'TaskList.jsx repassa o objeto `task` e callbacks (`onToggleTask`, `onDeleteTask`, `onEditTask`, `onCyclePriority`) para cada `TaskCard`.',
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
    id: '04-virtual-dom',
    number: '04',
    shortTitle: 'Virtual DOM',
    subtitle: 'Como o React atualiza a interface quando os dados mudam.',
    title: '04. Virtual DOM e Reconciliação',
    badge: 'Performance & Diffing',
    summary:
      'Representação leve em memória da DOM real. Quando o estado muda de forma imutável, o React compara a árvore anterior com a nova (diffing) e atualiza apenas os nós alterados.',
    files: [
      'src/App.jsx',
      'src/components/Header.jsx',
      'src/components/Footer.jsx'
    ],
    whereUsed: [
      'App.jsx: Atualizações de estado imutáveis (.map, .filter e spread operator ...) que permitem reconciliação cirúrgica.',
      'Monitor do Virtual DOM (Header.jsx e Footer.jsx): Contabiliza em tempo real quantas reconciliações ocorreram e descreve a última operação sem recarregar a página.'
    ],
    codeSnippet: `// Atualização imutável otimizada para o Virtual DOM em src/App.jsx:
const handleToggleTask = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
  registerVdomUpdate('Status de conclusão alternado em um único TaskCard');
};`
  },
  {
    id: '05-listas-keys',
    number: '05',
    shortTitle: 'Listas e keys',
    subtitle: 'Como renderizar coleções com map() e key.',
    title: '05. Listas e Keys (.map e key única)',
    badge: 'Coleções Dinâmicas',
    summary:
      'Transformação dinâmica de arrays de dados em elementos React utilizando `.map()`, atribuindo um identificador único e estável (`key`) a cada item para guiar o Virtual DOM.',
    files: [
      'src/components/TaskList.jsx',
      'src/components/Header.jsx',
      'src/components/SearchInput.jsx',
      'src/components/TaskForm.jsx',
      'src/components/ApiSuggestionsPanel.jsx'
    ],
    whereUsed: [
      'TaskList.jsx: Renderiza os cards de tarefas filtradas com `tasks.map((task) => <TaskCard key={task.id} ... />)`.',
      'Header.jsx: Renderiza os 4 cartões de indicadores com `statsItems.map((item) => <StatCard key={item.id} ... />)`.',
      'ApiSuggestionsPanel.jsx e SearchInput.jsx: Renderizam sugestões externas e abas de filtro com `key` exclusiva.'
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
    id: '06-renderizacao-condicional',
    number: '06',
    shortTitle: 'Renderização condicional',
    subtitle: 'Como mostrar conteúdos diferentes conforme uma condição.',
    title: '06. Renderização Condicional (? : e &&)',
    badge: 'Exibição Baseada em Estado',
    summary:
      'Controle dinâmico do que é exibido na interface usando operadores ternários (`? :`) e curto-circuito lógico (`&&`) conforme o estado atual da aplicação.',
    files: [
      'src/components/TaskList.jsx',
      'src/components/EmptyState.jsx',
      'src/components/TaskCard.jsx',
      'src/components/TaskForm.jsx',
      'src/components/ApiSuggestionsPanel.jsx'
    ],
    whereUsed: [
      'TaskList.jsx: Alterna entre `<EmptyState />` e a lista de `<TaskCard />` usando `tasks.length === 0 ? ... : ...`.',
      'TaskCard.jsx: Alterna entre modo de edição inline (`isEditing ? <form>...</form> : <>...</>`) e selos de status.',
      'TaskForm.jsx: Exibe condicionalmente campo de observações (`{isExpanded && ...}`), banner de erro (`{errorMessage && ...}`) e banner de sucesso (`{successMessage && ...}`).'
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
    id: '07-state-usestate',
    number: '07',
    shortTitle: 'State e useState',
    subtitle: 'Como armazenar informações e atualizar a interface.',
    title: '07. State e Hook useState',
    badge: 'Gerenciamento de Estado Reativo',
    summary:
      'Uso do Hook `useState` para armazenar dados mutáveis ao longo do tempo (tarefas, filtros, campos de formulário, estados de edição e carregamento) e disparar re-renderizações automáticas.',
    files: [
      'src/App.jsx',
      'src/components/TaskForm.jsx',
      'src/components/TaskCard.jsx',
      'src/components/ApiSuggestionsPanel.jsx'
    ],
    whereUsed: [
      'App.jsx: Gerencia a coleção `tasks` (com lazy initialization lendo do localStorage), os 4 estados de filtro (`searchTerm`, `statusFilter`, `categoryFilter`, `priorityFilter`) e contadores do Virtual DOM.',
      'TaskForm.jsx: Gerencia os estados locais dos inputs (`title`, `category`, `priority`, `notes`), mensagens de validação e expansão do formulário.',
      'TaskCard.jsx: Controla o estado local de edição inline (`isEditing`, `editedTitle`, `editedNotes`).'
    ],
    codeSnippet: `// Inicialização preguiçosa (lazy state) e atualização funcional em src/App.jsx:
const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : INITIAL_TASKS;
});

// Atualização segura baseada no estado anterior:
setTasks((prevTasks) => [newTask, ...prevTasks]);`
  },
  {
    id: '08-formularios',
    number: '08',
    shortTitle: 'Formulários',
    subtitle: 'Como receber, validar e processar informações.',
    title: '08. Formulários Controlados e Validação',
    badge: 'Controlled Components',
    summary:
      'Implementação de formulários controlados onde cada campo (`input`, `select`) tem seu valor sincronizado com o estado React (`value` + `onChange`), com interceptação de envio (`event.preventDefault()`), regras de validação e feedback visual.',
    files: [
      'src/components/TaskForm.jsx',
      'src/components/TaskCard.jsx',
      'src/components/SearchInput.jsx'
    ],
    whereUsed: [
      'TaskForm.jsx: Recebe título, categoria, prioridade e notas; valida campos vazios, tamanho mínimo (3 caracteres), limite máximo (120) e títulos duplicados antes de processar.',
      'TaskCard.jsx: Formulário inline (`handleSaveEdit`) para editar e revalidar título e observações de uma tarefa existente.',
      'SearchInput.jsx: Controles de formulário sincronizados em tempo real para filtragem instantânea.'
    ],
    codeSnippet: `// Recebimento, validação e processamento em src/components/TaskForm.jsx:
const handleSubmit = (event) => {
  event.preventDefault();
  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 3) {
    setErrorMessage('O título da meta deve possuir pelo menos 3 caracteres.');
    return;
  }
  onAddTask({ title: trimmedTitle, category, priority, notes: notes.trim() });
  setTitle('');
};`
  },
  {
    id: '09-useeffect',
    number: '09',
    shortTitle: 'useEffect',
    subtitle: 'Como sincronizar componentes com sistemas externos.',
    title: '09. Hook useEffect (Efeitos Colaterais)',
    badge: 'Sincronização Externa',
    summary:
      'Execução de efeitos colaterais após a renderização para sincronizar componentes React com sistemas externos (Web Storage API, título do documento no navegador e requisições de rede com função de limpeza/cleanup).',
    files: [
      'src/App.jsx',
      'src/components/ApiSuggestionsPanel.jsx'
    ],
    whereUsed: [
      'App.jsx (Persistência): Sincroniza automaticamente o array `tasks` com o `localStorage` sempre que `[tasks]` sofre alteração.',
      'App.jsx (DOM Title): Atualiza dinamicamente o `document.title` da aba do navegador exibindo a contagem de metas pendentes.',
      'ApiSuggestionsPanel.jsx (Rede + Cleanup): Dispara a busca na API externa ao montar ou alterar `[limit]` e cancela requisições pendentes com `AbortController` no cleanup.'
    ],
    codeSnippet: `// Sincronização com localStorage e título do navegador em src/App.jsx:
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);

useEffect(() => {
  document.title = pendingTasks > 0
    ? \`(\${pendingTasks} pendentes) FocusFlow — Metas em React\`
    : 'FocusFlow — Todas as metas concluídas!';
}, [pendingTasks]);`
  },
  {
    id: '10-consumo-apis',
    number: '10',
    shortTitle: 'Consumo de APIs',
    subtitle: 'Como buscar e apresentar dados de serviços externos.',
    title: '10. Consumo de APIs REST (Fetch Assíncrono)',
    badge: 'Integração HTTP / JSON',
    summary:
      'Busca assíncrona de dados em serviços externos utilizando `fetch` com `async/await`, tratamento de erros (`try/catch/finally`), controle de estado de carregamento (`loading`), transformação de payload JSON e fallback offline.',
    files: [
      'src/components/ApiSuggestionsPanel.jsx'
    ],
    whereUsed: [
      'ApiSuggestionsPanel.jsx: Realiza requisições `GET` ao endpoint `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`.',
      'Gerencia estados de `loading`, exibe horário da última sincronização, permite recarregar ou alterar a quantidade de itens buscados e importar qualquer sugestão com 1 clique para o estado principal.'
    ],
    codeSnippet: `// Consumo assíncrono de API REST em src/components/ApiSuggestionsPanel.jsx:
const response = await fetch(
  \`https://jsonplaceholder.typicode.com/todos?_limit=\${limit}\`,
  { signal }
);
if (!response.ok) throw new Error('Falha ao buscar dados da API');
const data = await response.json();
setSuggestions(formatApiData(data));`
  },
  {
    id: '11-react-router',
    number: '11',
    shortTitle: 'React Router',
    subtitle: 'Como organizar páginas e navegação por URLs.',
    title: '11. React Router (Navegação SPA por URLs)',
    badge: 'Roteamento Client-Side',
    summary:
      'Organização da aplicação em múltiplas visões e URLs navegáveis sem recarregamento de página (Single Page Application), utilizando `BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate` e `useSearchParams`.',
    files: [
      'src/main.jsx',
      'src/App.jsx',
      'src/components/Header.jsx',
      'src/pages/RequirementsGuide.jsx'
    ],
    whereUsed: [
      'main.jsx: Envolve a aplicação raiz com `<BrowserRouter>`.',
      'App.jsx: Define a árvore `<Routes>` com a rota principal `/` (Painel de Metas), a rota `/requisitos` (Catálogo dos 11 Conceitos) e rota curinga `*` para URLs não encontradas.',
      'Header.jsx: Navegação ativa com `<NavLink>` aplicando estilo automático à rota atual (`isActive`).',
      'RequirementsGuide.jsx: Usa `useSearchParams` e `useNavigate` para filtrar conceitos diretamente pela query string da URL (`?conceito=07-state-usestate`).'
    ],
    codeSnippet: `// Definição de rotas em src/App.jsx e navegação com query params:
<Routes>
  <Route path="/" element={<DashboardView />} />
  <Route path="/requisitos" element={<RequirementsGuide />} />
  <Route path="*" element={<NotFoundRedirect />} />
</Routes>`
  }
];

export default function RequirementsGuide() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedReqId = searchParams.get('conceito') || 'all';

  const handleSelectConcept = (conceptId) => {
    if (conceptId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ conceito: conceptId });
    }
  };

  const visibleRequirements =
    selectedReqId === 'all'
      ? REQUIREMENTS_DATA
      : REQUIREMENTS_DATA.filter((item) => item.id === selectedReqId);

  return (
    <section className="requirements-page" aria-labelledby="req-page-title">
      <div className="card-panel req-intro-panel">
        <div className="req-intro-header">
          <div>
            <h2 id="req-page-title" className="panel-title">
              🧭 Catálogo Interativo dos 11 Conceitos de React Aplicados
            </h2>
            <p className="panel-description">
              Explore abaixo todos os <strong>11 critérios fundamentais</strong> (do JSX ao React Router) e veja exatamente onde e como cada um foi implementado no código-fonte.
            </p>
          </div>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate('/')}
          >
            ← Voltar ao Painel de Metas
          </button>
        </div>

        {/* Grade de Cartões estilo Guia Visual (01 a 11) */}
        <div className="concepts-overview-grid">
          {REQUIREMENTS_DATA.map((concept) => {
            const isSelected = selectedReqId === concept.id;
            return (
              <div
                key={concept.id}
                className={`concept-mini-card ${
                  isSelected ? 'concept-mini-card-active' : ''
                }`}
              >
                <span className="concept-number-badge">{concept.number}</span>
                <h3 className="concept-mini-title">{concept.shortTitle}</h3>
                <p className="concept-mini-desc">{concept.subtitle}</p>
                <button
                  type="button"
                  className="concept-explore-link"
                  onClick={() =>
                    handleSelectConcept(isSelected ? 'all' : concept.id)
                  }
                >
                  {isSelected ? 'Mostrando detalhes ✓' : 'Explorar conceito →'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="req-filter-pills">
          <button
            type="button"
            className={`status-tab ${selectedReqId === 'all' ? 'status-tab-active' : ''}`}
            onClick={() => handleSelectConcept('all')}
          >
            Mostrar Todos ({REQUIREMENTS_DATA.length})
          </button>
          {REQUIREMENTS_DATA.map((req) => (
            <button
              key={req.id}
              type="button"
              className={`status-tab ${selectedReqId === req.id ? 'status-tab-active' : ''}`}
              onClick={() => handleSelectConcept(req.id)}
            >
              {req.number}. {req.shortTitle}
            </button>
          ))}
        </div>
      </div>

      <div className="req-cards-grid">
        {visibleRequirements.map((req) => (
          <article key={req.id} className="card-panel req-detail-card">
            <div className="req-card-header">
              <div className="req-badges-row">
                <span className="concept-number-badge">{req.number}</span>
                <span className="badge badge-category">{req.badge}</span>
              </div>
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

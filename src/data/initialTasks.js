export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: '01 & 02 — Estruturar interface declarativa em JSX com Componentes reutilizáveis',
    category: 'Arquitetura React',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Dividir a interface em Header, StatCard, TaskForm, SearchInput, TaskList, TaskCard, EmptyState, ApiSuggestionsPanel e Footer.'
  },
  {
    id: 'task-102',
    title: '03 & 04 — Comunicar dados via Props e monitorar reconciliações no Virtual DOM',
    category: 'Fundamentos',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Passar dados e callbacks de App para os filhos mantendo atualizações imutáveis para otimizar o diffing do Virtual DOM.'
  },
  {
    id: 'task-103',
    title: '05 & 06 — Renderizar Listas com .map() + key e aplicar Renderização Condicional',
    category: 'UI Dinâmica',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Iterar coleções com chaves únicas e alternar EmptyState, formulários de edição e alertas com operadores ? : e &&.'
  },
  {
    id: 'task-104',
    title: '07 & 08 — Gerenciar State com useState e validar Formulários Controlados',
    category: 'Estado & Forms',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Controlar inputs em tempo real, validar título mínimo e duplicidade, e processar novos cadastros e edições inline.'
  },
  {
    id: 'task-105',
    title: '09 & 10 — Sincronizar efeitos com useEffect e realizar Consumo de APIs REST',
    category: 'Hooks & APIs',
    priority: 'media',
    completed: false,
    createdAt: '2026-10-28',
    notes: 'Sincronizar estado com localStorage e título da aba, além de buscar sugestões externas na API JSONPlaceholder com fetch assíncrono.'
  },
  {
    id: 'task-106',
    title: '11 — Organizar navegação SPA e parâmetros de URL com React Router',
    category: 'Roteamento',
    priority: 'media',
    completed: false,
    createdAt: '2026-10-28',
    notes: 'Configurar BrowserRouter, Routes, Route, NavLink, useNavigate e useSearchParams para alternar páginas sem recarregar o navegador.'
  }
];

export const CATEGORIES = [
  'Arquitetura React',
  'Fundamentos',
  'UI Dinâmica',
  'Estado & Forms',
  'Hooks & APIs',
  'Roteamento',
  'Listas e Keys',
  'Performance',
  'Documentação',
  'Estudos Gerais'
];

export const PRIORITIES = [
  { value: 'alta', label: 'Alta Prioridade', color: 'danger' },
  { value: 'media', label: 'Média Prioridade', color: 'warning' },
  { value: 'baixa', label: 'Baixa Prioridade', color: 'info' }
];

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Estruturar componentes reutilizáveis (Header, TaskForm, TaskList, TaskCard)',
    category: 'Arquitetura React',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Dividir a interface em blocos independentes e coesos seguindo o guia da atividade.'
  },
  {
    id: 'task-102',
    title: 'Implementar comunicação unidirecional com Props entre componentes Pai e Filho',
    category: 'Fundamentos',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Passar objetos de dados e funções de callback do Dashboard para TaskList e TaskCard.'
  },
  {
    id: 'task-103',
    title: 'Renderizar coleções dinâmicas com .map() e atributo key exclusivo',
    category: 'Listas e Keys',
    priority: 'alta',
    completed: true,
    createdAt: '2026-10-28',
    notes: 'Garantir que o Virtual DOM identifique cada item pelo seu ID único sem recriar toda a lista.'
  },
  {
    id: 'task-104',
    title: 'Configurar Renderização Condicional para EmptyState, filtros e badges de status',
    category: 'UI Dinâmica',
    priority: 'media',
    completed: false,
    createdAt: '2026-10-28',
    notes: 'Utilizar operadores ternários (? :) e curto-circuito lógico (&&) para alternar estados visuais.'
  },
  {
    id: 'task-105',
    title: 'Documentar o projeto no README.md e no Mapeamento de Requisitos',
    category: 'Documentação',
    priority: 'media',
    completed: false,
    createdAt: '2026-10-28',
    notes: 'Detalhar instruções de execução, arquitetura e localização exata de cada conceito no código.'
  },
  {
    id: 'task-106',
    title: 'Revisar boas práticas de reconciliação do Virtual DOM e estados imutáveis',
    category: 'Performance',
    priority: 'baixa',
    completed: false,
    createdAt: '2026-10-28',
    notes: 'Atualizar arrays de estado usando spread operator (...), map() e filter() sem mutação direta.'
  }
];

export const CATEGORIES = [
  'Arquitetura React',
  'Fundamentos',
  'Listas e Keys',
  'UI Dinâmica',
  'Performance',
  'Documentação',
  'Estudos Gerais'
];

export const PRIORITIES = [
  { value: 'alta', label: 'Alta Prioridade', color: 'danger' },
  { value: 'media', label: 'Média Prioridade', color: 'warning' },
  { value: 'baixa', label: 'Baixa Prioridade', color: 'info' }
];


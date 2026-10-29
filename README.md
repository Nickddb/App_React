# 🚀 FocusFlow — Gerenciador de Tarefas e Metas em React

## 📌 Descrição
Este projeto é uma aplicação web interativa desenvolvida em **React 18** (com **Vite**) com o objetivo de consolidar na prática todos os conceitos fundamentais da biblioteca exigidos no [Guia da Atividade](guia_da_atividade_react%20(1).md).

A aplicação consiste em um **Painel de Acompanhamento de Tarefas e Metas (Dashboard / To-Do Manager)** completo, modularizado e responsivo, acompanhado de uma **Página Interativa de Mapeamento de Requisitos** e do documento técnico detalhado [`MAPEAMENTO_REQUISITOS.md`](MAPEAMENTO_REQUISITOS.md).

---

## ✨ Funcionalidades Implementadas
- **Cadastro Dinâmico de Metas (`TaskForm`)**: Criação de novas tarefas com título validado, categoria, nível de prioridade e observações opcionais.
- **Listagem e Gerenciamento de Tarefas (`TaskList` & `TaskCard`)**:
  - Marcar/desmarcar metas como concluídas.
  - Edição inline de título e observações diretamente no card.
  - Alternância rápida de prioridade (`Baixa` → `Média` → `Alta`) clicando no selo do card.
  - Exclusão individual de metas ou limpeza em lote de metas concluídas.
- **Busca e Filtros Combinados em Tempo Real (`SearchInput`)**:
  - Pesquisa instantânea por palavra-chave (título, notas ou categoria).
  - Filtro por status (`Todas`, `Pendentes`, `Concluídas`).
  - Filtro por categoria e por prioridade.
- **Feedback Condicional Inteligente (`EmptyState`)**:
  - Exibição automática quando não há metas cadastradas ou quando os filtros ativos não retornam resultados, com botões de ação rápida para limpar filtros ou restaurar dados de demonstração.
- **Indicadores e Barra de Progresso (`Header` & `StatCard`)**:
  - Cálculo automático de total de metas, concluídas, pendentes, metas urgentes e percentual de conclusão (`%`).
- **Monitor Didático do Virtual DOM (`Header` & `Footer`)**:
  - Contador em tempo real de reconciliações reativas realizadas pelo React e descrição da última atualização na interface sem recarregar a página.
- **Sugestões de Metas via API Externa (`ApiSuggestionsPanel`)**:
  - Consumo assíncrono com `useEffect` (integrado ao `JSONPlaceholder` com fallback local offline) permitindo importar sugestões de metas com 1 clique.
- **Persistência Automática (`localStorage`)**:
  - As metas cadastradas ou editadas permanecem salvas no navegador.

---

## 🛠️ Conceitos de React Utilizados (Resumo)

> 📄 **Para ver exatamente em qual arquivo, linha e trecho de código cada requisito foi aplicado, consulte o documento completo: [`MAPEAMENTO_REQUISITOS.md`](MAPEAMENTO_REQUISITOS.md).**

| Conceito / Requisito | Como foi aplicado no Projeto | Arquivos Principais |
| :--- | :--- | :--- |
| **1. JSX (JavaScript XML)** | Estruturação declarativa da UI combinando HTML semântico, interpolação de expressões JS (`{}`), estilos dinâmicos e eventos. | Todos os arquivos em `src/components/` e `src/App.jsx` |
| **2. Componentes** | Arquitetura dividida em blocos independentes, modulares e reutilizáveis (`Header`, `StatCard`, `TaskForm`, `SearchInput`, `TaskList`, `TaskCard`, `EmptyState`, `ApiSuggestionsPanel`, `Footer`). | `src/components/*.jsx` |
| **3. Props (Propriedades)** | Comunicação unidirecional Pai → Filho enviando dados (`task`, contadores, filtros) e callbacks (`onAddTask`, `onToggleTask`, `onDeleteTask`, `onEditTask`). | `src/App.jsx`, `src/components/TaskList.jsx`, `src/components/TaskCard.jsx` |
| **4. Listas e Keys** | Renderização dinâmica de coleções via método `.map()` associando chaves únicas e estáveis (`key={task.id}`, `key={item.id}`). | `src/components/TaskList.jsx`, `src/components/Header.jsx`, `src/components/SearchInput.jsx` |
| **5. Renderização Condicional** | Controle dinâmico de exibição usando operadores ternários (`? :`) e lógicos (`&&`) para `EmptyState`, modo de edição, alertas de erro e badges. | `src/components/TaskList.jsx`, `src/components/EmptyState.jsx`, `src/components/TaskCard.jsx`, `src/components/TaskForm.jsx` |
| **6. Virtual DOM** | Atualizações de estado imutáveis (`useState`, `.map()`, `.filter()`, spread `...`) garantindo reconciliação localizada e performática, com monitor em tempo real. | `src/App.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx` |

---

## 📂 Estrutura de Pastas do Projeto

```text
├── public/
├── src/
│   ├── components/
│   │   ├── ApiSuggestionsPanel.jsx  # Consumo de API com useEffect e importação de metas
│   │   ├── EmptyState.jsx           # Feedback visual exibido via renderização condicional
│   │   ├── Footer.jsx               # Rodapé modular com monitor do Virtual DOM
│   │   ├── Header.jsx               # Cabeçalho, navegação, barra de progresso e StatCards
│   │   ├── SearchInput.jsx          # Busca textual e filtros combinados (status, categoria, prioridade)
│   │   ├── TaskCard.jsx             # Card individual de tarefa (recebe dados e ações via Props)
│   │   ├── TaskForm.jsx             # Formulário controlado para criação e validação de metas
│   │   └── TaskList.jsx             # Mapeamento da coleção (.map + key) ou exibição do EmptyState
│   ├── data/
│   │   └── initialTasks.js          # Dados iniciais, categorias e níveis de prioridade
│   ├── pages/
│   │   └── RequirementsGuide.jsx    # Página interativa documentando cada requisito no código
│   ├── styles/
│   │   └── global.css               # Estilização moderna e responsiva (Dark UI)
│   ├── App.jsx                      # Componente raiz, gerenciamento de estado e rotas
│   └── main.jsx                     # Ponto de entrada do ReactDOM (createRoot)
├── guia_da_atividade_react (1).md   # Documento base com as instruções da atividade
├── MAPEAMENTO_REQUISITOS.md         # Documento detalhado de onde cada requisito foi utilizado
├── README.md                        # Documentação principal do repositório
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧰 Tecnologias Utilizadas
- [React 18](https://react.dev/)
- [React Router DOM 6](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- JavaScript (ES6+)
- CSS3 Moderno (CSS Variables, CSS Grid, Flexbox, Responsividade) / HTML5 Semântico

---

## 🔧 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Nickddb/App_React.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd App_React
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o endereço exibido no terminal (geralmente `http://localhost:5173`) no navegador.


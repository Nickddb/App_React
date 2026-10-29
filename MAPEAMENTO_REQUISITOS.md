# 🧭 Documento de Mapeamento de Requisitos na Aplicação React

Este documento apresenta o mapeamento completo e detalhado de **onde e como cada um dos 11 critérios** (do `01. JSX` ao `11. React Router`) foi implementado dentro do código-fonte da aplicação **FocusFlow — Gerenciador de Tarefas e Metas**.

---

## 📊 Matriz Resumo de Rastreabilidade (11 Critérios × Código)

| # | Conceito / Critério | Descrição do Critério | Status | Onde foi utilizado (Arquivos Principais) |
| :-: | :--- | :--- | :-: | :--- |
| **01** | **JSX (JavaScript XML)** | Como escrever a interface usando sintaxe semelhante a HTML. | ✅ Atendido | `src/components/Header.jsx`, `src/components/TaskForm.jsx`, `src/components/TaskCard.jsx`, `src/App.jsx` |
| **02** | **Componentes** | Como dividir a interface em partes reutilizáveis. | ✅ Atendido | `Header.jsx` (+ `StatCard`), `TaskForm.jsx`, `SearchInput.jsx`, `TaskList.jsx`, `TaskCard.jsx`, `EmptyState.jsx`, `ApiSuggestionsPanel.jsx`, `Footer.jsx` |
| **03** | **Props** | Como passar informações entre componentes. | ✅ Atendido | `src/App.jsx` → `Header.jsx`, `TaskForm.jsx`, `SearchInput.jsx`, `TaskList.jsx` → `TaskCard.jsx` e `EmptyState.jsx` |
| **04** | **Virtual DOM** | Como o React atualiza a interface quando os dados mudam. | ✅ Atendido | `src/App.jsx` (estado imutável + telemetria `registerVdomUpdate`), `src/components/Header.jsx`, `src/components/Footer.jsx` |
| **05** | **Listas e Keys** | Como renderizar coleções com `map()` e `key`. | ✅ Atendido | `src/components/TaskList.jsx`, `src/components/Header.jsx`, `src/components/SearchInput.jsx`, `src/components/ApiSuggestionsPanel.jsx`, `src/pages/RequirementsGuide.jsx` |
| **06** | **Renderização Condicional** | Como mostrar conteúdos diferentes conforme uma condição. | ✅ Atendido | `src/components/TaskList.jsx`, `src/components/EmptyState.jsx`, `src/components/TaskCard.jsx`, `src/components/TaskForm.jsx`, `src/components/ApiSuggestionsPanel.jsx` |
| **07** | **State e `useState`** | Como armazenar informações e atualizar a interface. | ✅ Atendido | `src/App.jsx` (tarefas, filtros, contadores VDOM), `src/components/TaskForm.jsx`, `src/components/TaskCard.jsx`, `src/components/ApiSuggestionsPanel.jsx` |
| **08** | **Formulários** | Como receber, validar e processar informações. | ✅ Atendido | `src/components/TaskForm.jsx` (formulário controlado de criação com validação), `src/components/TaskCard.jsx` (edição inline), `src/components/SearchInput.jsx` |
| **09** | **`useEffect`** | Como sincronizar componentes com sistemas externos. | ✅ Atendido | `src/App.jsx` (sincronização com `localStorage` e `document.title`), `src/components/ApiSuggestionsPanel.jsx` (ciclo de busca HTTP + `AbortController`) |
| **10** | **Consumo de APIs** | Como buscar e apresentar dados de serviços externos. | ✅ Atendido | `src/components/ApiSuggestionsPanel.jsx` (`fetch` assíncrono no `JSONPlaceholder`, estados de `loading`, seletor de limite e fallback offline) |
| **11** | **React Router** | Como organizar páginas e navegação por URLs. | ✅ Atendido | `src/main.jsx` (`BrowserRouter`), `src/App.jsx` (`Routes`, `Route`, `Link`), `src/components/Header.jsx` (`NavLink`), `src/pages/RequirementsGuide.jsx` (`useSearchParams`, `useNavigate`) |

---

## 🔍 Detalhamento Técnico Critério por Critério (01 a 11)

### 01. JSX (JavaScript XML)
* **Objetivo:** Escrever a interface usando sintaxe declarativa semelhante a HTML combinada ao poder do JavaScript.
* **Onde foi utilizado:**
  - **`src/components/Header.jsx`**: Cálculo da porcentagem de conclusão (`completionPercentage`) e interpolação direta no texto e no atributo `style={{ width: `${completionPercentage}%` }}`.
  - **`src/components/TaskCard.jsx`**: Uso de expressões JavaScript em atributos de acessibilidade (`aria-label`), classes CSS dinâmicas e eventos.

### 02. Componentes Modulares e Reutilizáveis
* **Objetivo:** Dividir a interface em partes independentes, coesas e reutilizáveis.
* **Onde foi utilizado:**
  - **`Header.jsx` + `StatCard`**: Cabeçalho da aplicação e subcomponente reutilizado 4 vezes para exibir cartões de métricas.
  - **`TaskForm.jsx` e `SearchInput.jsx`**: Entrada controlada de novas metas e painel de busca/filtros combinados.
  - **`TaskList.jsx`, `TaskCard.jsx` e `EmptyState.jsx`**: Listagem das metas, card individual de cada tarefa e feedback visual para listas vazias.
  - **`ApiSuggestionsPanel.jsx` e `Footer.jsx`**: Painel de integração com API externa e rodapé com monitor do Virtual DOM.

### 03. Props (Propriedades)
* **Objetivo:** Passar informações e funções de callback unidirecionalmente entre componentes Pais e Filhos.
* **Onde foi utilizado:**
  - **`src/App.jsx` → Componentes Filhos**: `App` distribui `totalTasks`, `completedTasks`, `pendingTasks`, `filteredTasks` e handlers (`onAddTask`, `onToggleTask`, `onDeleteTask`, `onEditTask`, `onCyclePriority`) via `props`.
  - **`src/components/TaskList.jsx` → `src/components/TaskCard.jsx`**: Cada `TaskCard` recebe o objeto `task` e os callbacks de ação.

### 04. Virtual DOM
* **Objetivo:** Compreender e demonstrar como o React atualiza a interface de maneira otimizada quando os dados mudam.
* **Onde foi utilizado:**
  - **`src/App.jsx`**: Todas as operações sobre o estado `tasks` utilizam métodos imutáveis (`[newTask, ...prevTasks]`, `.map()`, `.filter()`), permitindo que o algoritmo de *diffing* do React identifique e atualize apenas o nó modificado.
  - **`Header.jsx` e `Footer.jsx`**: Exibem em tempo real o contador `vdomUpdatesCount` e a descrição `lastVdomAction` de cada reconciliação ocorrida na sessão.

### 05. Listas e Keys
* **Objetivo:** Renderizar coleções dinamicamente com `.map()` e chave única `key`.
* **Onde foi utilizado:**
  - **`src/components/TaskList.jsx`**: `tasks.map((task) => <TaskCard key={task.id} ... />)`.
  - **`src/components/Header.jsx`**: `statsItems.map((item) => <StatCard key={item.id} ... />)`.
  - **`src/components/ApiSuggestionsPanel.jsx`**: `suggestions.map((item) => <div key={item.id} ... />)`.
  - **`src/pages/RequirementsGuide.jsx`**: Mapeamento dos 11 cartões de conceitos com `key={concept.id}`.

### 06. Renderização Condicional
* **Objetivo:** Mostrar conteúdos diferentes conforme uma condição lógica (`? :` e `&&`).
* **Onde foi utilizado:**
  - **`src/components/TaskList.jsx`**: `tasks.length === 0 ? <EmptyState ... /> : <div className="task-cards-container">...</div>` e `{completedCount > 0 && <button>...</button>}`.
  - **`src/components/TaskCard.jsx`**: Alterna entre formulário de edição (`isEditing ? <form>...</form> : <>...</>`) e modo de leitura.
  - **`src/components/TaskForm.jsx`**: Exibe condicionalmente o campo de notas (`{isExpanded && ...}`), alerta de erro (`{errorMessage && ...}`) e confirmação de sucesso (`{successMessage && ...}`).

### 07. State e `useState`
* **Objetivo:** Armazenar informações dinâmicas nos componentes e re-renderizar a interface automaticamente quando alteradas.
* **Onde foi utilizado:**
  - **`src/App.jsx`**:
    - `tasks`: Inicializado com *lazy initialization* (`useState(() => ...)`) recuperando dados salvos no `localStorage` ou carregando `INITIAL_TASKS`.
    - `searchTerm`, `statusFilter`, `categoryFilter`, `priorityFilter`: Estados reativos que controlam a busca e a filtragem combinada.
    - `vdomUpdatesCount` e `lastVdomAction`: Armazenam a telemetria de atualizações do Virtual DOM.
  - **`src/components/TaskForm.jsx`**: Estados `title`, `category`, `priority`, `notes`, `errorMessage`, `successMessage` e `isExpanded`.
  - **`src/components/TaskCard.jsx`**: Estados `isEditing`, `editedTitle` e `editedNotes` para edição localizada.
  - **`src/components/ApiSuggestionsPanel.jsx`**: Estados `suggestions`, `loading`, `limit`, `sourceLabel`, `lastSyncTime` e `importedIds`.

### 08. Formulários
* **Objetivo:** Receber, validar e processar informações inseridas pelo usuário usando *Controlled Components*.
* **Onde foi utilizado:**
  - **`src/components/TaskForm.jsx`**:
    - **Recebimento (Controlled Inputs):** Todos os campos (`<input>`, `<select>`) possuem `value` atrelado ao state e `onChange` atualizando o state a cada tecla.
    - **Validação:** No `handleSubmit`, `event.preventDefault()` evita o reload da página e valida: preenchimento obrigatório, mínimo de 3 caracteres, máximo de 120 caracteres e verificação contra metas duplicadas (`existingTasks.some(...)`).
    - **Processamento:** Envia o objeto higienizado para `onAddTask`, limpa os campos do formulário e exibe feedback visual de sucesso (`successMessage`).
  - **`src/components/TaskCard.jsx`**: Formulário controlado de edição inline (`handleSaveEdit`) para atualizar título e observações de uma tarefa existente.

### 09. Hook `useEffect`
* **Objetivo:** Sincronizar componentes React com sistemas externos (Web Storage, DOM do navegador e serviços de rede).
* **Onde foi utilizado:**
  - **`src/App.jsx` (Efeito #1 — Persistência no `localStorage`)**: Observa a dependência `[tasks]` e salva automaticamente a coleção serializada em JSON no `localStorage` a cada alteração.
  - **`src/App.jsx` (Efeito #2 — Sincronização com `document.title`)**: Observa `[pendingTasks]` e atualiza o título da aba do navegador em tempo real com o número de metas pendentes.
  - **`src/components/ApiSuggestionsPanel.jsx` (Efeito #3 — Sincronização com API Externa + Cleanup)**: Dispara a busca de sugestões na montagem e quando a quantidade (`limit`) muda, utilizando `AbortController` na função de limpeza (`return () => controller.abort()`) para cancelar requisições em andamento caso o componente seja desmontado.

### 10. Consumo de APIs
* **Objetivo:** Buscar, tratar e apresentar dados provenientes de serviços externos.
* **Onde foi utilizado:**
  - **`src/components/ApiSuggestionsPanel.jsx`**:
    - Consome a API REST pública `https://jsonplaceholder.typicode.com/todos?_limit=${limit}` utilizando `fetch()` com `async/await` e blocos `try / catch / finally`.
    - Controla o estado visual de carregamento (`loading`), exibe o carimbo de horário da última sincronização (`lastSyncTime`) e permite ao usuário escolher a quantidade de sugestões (`3` ou `5`) ou recarregar manualmente.
    - Implementa **fallback offline resiliente** (`FALLBACK_SUGGESTIONS`) caso não haja conexão de rede, e permite importar qualquer item retornado pela API para a lista principal de metas com 1 clique.

### 11. React Router
* **Objetivo:** Organizar páginas, rotas e parâmetros de URL em uma *Single Page Application (SPA)*.
* **Onde foi utilizado:**
  - **`src/main.jsx`**: Envolve o componente `<App />` com o provedor `<BrowserRouter>`.
  - **`src/App.jsx`**: Declara `<Routes>` e `<Route>` para alternar entre a rota `/` (Painel Principal de Metas), `/requisitos` (Catálogo Interativo dos 11 Conceitos) e `*` (Página 404 com `<Link to="/">`).
  - **`src/components/Header.jsx`**: Utiliza `<NavLink>` com a propriedade `isActive` para destacar visualmente a página ativa no menu de navegação.
  - **`src/pages/RequirementsGuide.jsx`**: Utiliza os hooks `useSearchParams` e `useNavigate` para filtrar e explorar qualquer um dos 11 conceitos diretamente pela URL (ex.: `/requisitos?conceito=07-state-usestate`).

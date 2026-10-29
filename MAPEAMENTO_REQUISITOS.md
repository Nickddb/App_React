# 🧭 Documento de Mapeamento de Requisitos na Aplicação React

Este documento apresenta o mapeamento completo e detalhado de **onde e como cada requisito** exigido no arquivo [`guia_da_atividade_react (1).md`](guia_da_atividade_react%20(1).md) foi implementado dentro do código-fonte da aplicação **FocusFlow — Gerenciador de Tarefas e Metas**.

---

## 📊 Matriz Resumo de Rastreabilidade (Requisitos × Código)

| # | Requisito do Guia | Status | Onde foi utilizado (Arquivos e Linhas) |
| :-: | :--- | :-: | :--- |
| **1** | **JSX (JavaScript XML)** | ✅ Atendido | `src/components/Header.jsx` (linhas 30–31, 69–128)<br>`src/components/TaskForm.jsx` (linhas 48–160)<br>`src/components/TaskCard.jsx` (linhas 45–157) |
| **2** | **Componentes Modulares e Reutilizáveis** | ✅ Atendido | `Header.jsx`, `TaskForm.jsx`, `SearchInput.jsx`, `TaskList.jsx`, `TaskCard.jsx`, `EmptyState.jsx`, `ApiSuggestionsPanel.jsx`, `Footer.jsx` |
| **3** | **Props (Propriedades Unidirecionais)** | ✅ Atendido | `src/App.jsx` → `Header.jsx` (linhas 163–172)<br>`src/App.jsx` → `TaskList.jsx` (linhas 212–223)<br>`src/components/TaskList.jsx` → `TaskCard.jsx` (linhas 54–63) |
| **4** | **Listas e Keys (`.map()` + `key`)** | ✅ Atendido | `src/components/TaskList.jsx` (linhas 54–63)<br>`src/components/Header.jsx` (linhas 97–106)<br>`src/components/SearchInput.jsx` (linhas 55–66, 82–86, 102–106) |
| **5** | **Renderização Condicional (`? :` e `&&`)** | ✅ Atendido | `src/components/TaskList.jsx` (linhas 34–42, 46–65)<br>`src/components/EmptyState.jsx` (linhas 16–48)<br>`src/components/TaskCard.jsx` (linhas 58, 76–81, 87–128)<br>`src/components/TaskForm.jsx` (linhas 135–157) |
| **6** | **Virtual DOM (Ciclo Reativo e Performance)** | ✅ Atendido | `src/App.jsx` (linhas 36–126)<br>`src/components/Header.jsx` (linhas 59–65)<br>`src/components/Footer.jsx` (linhas 13–24) |
| **7** | **Estrutura Sugerida do Guia (Seção 4)** | ✅ Atendido | Todos os 5 componentes sugeridos implementados (`Header`, `TaskForm`/`SearchInput`, `TaskList`, `TaskCard`, `EmptyState`) + `Footer` e `ApiSuggestionsPanel` |
| **8** | **Documentação (`README.md`)** | ✅ Atendido | `README.md` na raiz do projeto + página interativa `/requisitos` (`src/pages/RequirementsGuide.jsx`) |

---

## 🔍 Detalhamento Técnico Requisito por Requisito

### 1. JSX (JavaScript XML)

* **Exigência do Guia:** *"Utilizar a sintaxe declarativa para estruturar a interface do usuário de forma intuitiva, combinando HTML e código JavaScript."*
* **Onde foi utilizado:**
  1. **`src/components/Header.jsx` (linhas 30–31 e 109–127)**:
     Cálculo da porcentagem de conclusão em JavaScript puro e interpolação direta na estrutura visual JSX e no estilo inline dinâmico da barra de progresso:
     ```jsx
     const completionPercentage =
       totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

     // Dentro do retorno JSX:
     <div
       className="progress-bar-fill"
       style={{ width: `${completionPercentage}%` }}
     />
     ```
  2. **`src/components/TaskCard.jsx` (linhas 45–60)**:
     Combinação de tags semânticas (`<article>`, `<button>`, `<h3>`) com template literals em `className` e atributos de acessibilidade dinâmicos (`aria-label`).

---

### 2. Componentes Modulares e Reutilizáveis

* **Exigência do Guia:** *"Dividir a aplicação em pequenos blocos independentes, modulares e reutilizáveis (ex.: `Header`, `Card`, `List`, `Footer`)."* e Seção 4: *"`Header`, `TaskForm` / `SearchInput`, `TaskList`, `TaskCard`, `EmptyState`"*.
* **Onde foi utilizado:**
  A aplicação foi dividida em **8 componentes independentes** dentro de `src/components/`, além de 1 página dedicada de documentação em `src/pages/`:
  - **`src/components/Header.jsx`**: Exibe o cabeçalho da aplicação, menu de navegação, barra de progresso e contém o subcomponente reutilizável `StatCard` (linhas 7–15) para renderizar cartões de métricas.
  - **`src/components/TaskForm.jsx`**: Componente isolado responsável pela criação e validação de novas metas.
  - **`src/components/SearchInput.jsx`**: Componente responsável pela busca textual e pelos filtros de status, categoria e prioridade.
  - **`src/components/TaskList.jsx`**: Componente container que organiza a listagem das metas e o cabeçalho da seção.
  - **`src/components/TaskCard.jsx`**: Componente reutilizável para cada item individual da lista de tarefas.
  - **`src/components/EmptyState.jsx`**: Componente de feedback visual exibido quando não há itens para mostrar.
  - **`src/components/ApiSuggestionsPanel.jsx`**: Componente que busca sugestões externas com `useEffect` e permite importá-las.
  - **`src/components/Footer.jsx`**: Rodapé modular que apresenta o monitor do Virtual DOM e ação de restauração.

---

### 3. Props (Propriedades e Fluxo de Dados Unidirecional)

* **Exigência do Guia:** *"Transferir informações e dados de maneira unidirecional dos componentes pais para os componentes filhos."*
* **Onde foi utilizado:**
  1. **De `src/App.jsx` (Pai) para `src/components/Header.jsx` (Filho) — linhas 163–172**:
     Transferência de strings e métricas derivadas do estado:
     ```jsx
     <Header
       appTitle="FocusFlow — Gerenciador de Tarefas e Metas"
       appSubtitle="Painel interativo em React demonstrando JSX, Componentes, Props, Listas & Keys, Renderização Condicional e Virtual DOM."
       totalTasks={totalTasks}
       completedTasks={completedTasks}
       pendingTasks={pendingTasks}
       highPriorityPending={highPriorityPending}
       vdomUpdatesCount={vdomUpdatesCount}
       lastVdomAction={lastVdomAction}
     />
     ```
  2. **De `src/components/Header.jsx` para o subcomponente `StatCard` — linhas 97–106**:
     Cada cartão de estatística recebe `label`, `value`, `subtitle` e `variant` via `props`.
  3. **De `src/components/TaskList.jsx` (Pai) para `src/components/TaskCard.jsx` (Filho) — linhas 55–62**:
     Cada card recebe o objeto `task` com os dados da meta e as funções de callback (`onToggleTask`, `onDeleteTask`, `onEditTask`, `onCyclePriority`) para notificar ações ao estado central.

---

### 4. Listas e Keys (`.map()` e `key` única)

* **Exigência do Guia:** *"Iterar e renderizar coleções de dados dinamicamente (utilizando a função `.map()`) associando sempre uma chave única (`key`) a cada elemento renderizado."*
* **Onde foi utilizado:**
  1. **`src/components/TaskList.jsx` (linhas 53–64)** — Renderização principal da lista de metas usando `key={task.id}`:
     ```jsx
     <div className="task-cards-container">
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
     ```
  2. **`src/components/Header.jsx` (linhas 97–106)** — Mapeamento dos 4 indicadores de status com `key={item.id}`.
  3. **`src/components/SearchInput.jsx` (linhas 55–66, 82–86, 102–106)** — Mapeamento dos botões de filtro de status (`key={option.id}`) e das opções de categoria/prioridade.
  4. **`src/components/TaskForm.jsx` (linhas 99–103 e 116–120)** — Mapeamento dinâmico das opções de `<select>` para categorias e prioridades.
  5. **`src/components/ApiSuggestionsPanel.jsx` (linhas 93–115)** — Mapeamento das metas sugeridas vindas da API com `key={item.id}`.

---

### 5. Renderização Condicional (`? :` e `&&`)

* **Exigência do Guia:** *"Exibir, alternar ou ocultar elementos/conteúdos da tela com base no estado da aplicação ou condições lógicas (ex.: ternários `? :` ou operador lógico `&&`)."*
* **Onde foi utilizado:**
  1. **Exibição do `EmptyState` vs Lista de Cards em `src/components/TaskList.jsx` (linhas 46–65)**:
     Utiliza o operador ternário (`? :`) para verificar se a coleção está vazia:
     ```jsx
     {tasks.length === 0 ? (
       <EmptyState
         hasActiveFilters={hasActiveFilters}
         onClearFilters={onClearFilters}
         onRestoreDefaults={onRestoreDefaults}
       />
     ) : (
       <div className="task-cards-container">
         {tasks.map((task) => (
           <TaskCard key={task.id} task={task} ... />
         ))}
       </div>
     )}
     ```
  2. **Personalização da mensagem no `src/components/EmptyState.jsx` (linhas 16–48)**:
     Utiliza ternários (`hasActiveFilters ? ... : ...`) para exibir textos e botões diferentes caso a lista esteja vazia por causa de um filtro de busca ou porque todas as tarefas foram excluídas.
  3. **Alternância entre Modo de Edição e Visualização em `src/components/TaskCard.jsx` (linhas 87–128)**:
     Quando `isEditing` é `true`, renderiza o formulário inline de edição; quando `false`, exibe o título e as notas da meta.
  4. **Exibição Condicional com `&&` em `src/components/TaskForm.jsx` (linhas 135–157)**:
     - `{isExpanded && (...)}`: Exibe o campo adicional de observações somente quando o usuário expande o formulário.
     - `{errorMessage && (...)}`: Exibe o banner de erro de validação somente quando há erro de preenchimento.
  5. **Botão de Limpar Concluídas em `src/components/TaskList.jsx` (linhas 34–42)**:
     - `{completedCount > 0 && (...)}`: Renderiza o botão "Remover Concluídas" apenas quando existe pelo menos 1 meta concluída.

---

### 6. Virtual DOM e Ciclo de Atualização Performático

* **Exigência do Guia:** *"Estruturar a lógica e a renderização ciente do ciclo de atualização do React, permitindo que a interface reaja de forma performática."*
* **Onde foi utilizado:**
  1. **Imutabilidade de Estado em `src/App.jsx` (linhas 54–126)**:
     Todas as atualizações de estado utilizam funções puras e imutáveis (`[newTask, ...prevTasks]`, `prevTasks.map(...)`, `prevTasks.filter(...)`), permitindo que o React compare rapidamente a árvore anterior do **Virtual DOM** com a nova árvore e atualize no DOM real apenas o elemento modificado.
  2. **Otimização de Filtragem com `useMemo` em `src/App.jsx` (linhas 129–149)**:
     A lista filtrada `filteredTasks` é recalculada de forma eficiente com base nas dependências `[tasks, searchTerm, statusFilter, categoryFilter, priorityFilter]`.
  3. **Monitor Didático do Virtual DOM em `src/components/Header.jsx` (linhas 59–65) e `src/components/Footer.jsx` (linhas 13–24)**:
     A própria interface conta com um indicador em tempo real que incrementa a cada reconciliação disparada pelas interações do usuário e descreve qual nó lógico foi atualizado pelo React sem recarregar a página.


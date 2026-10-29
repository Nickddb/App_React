# 🚀 FocusFlow — Gerenciador de Tarefas e Metas em React

## 📌 Descrição
Este projeto é uma aplicação web interativa desenvolvida em **React 18** (com **Vite** e **React Router 6**) com o objetivo de consolidar na prática todos os **11 conceitos fundamentais e intermediários do ecossistema React**:
1. **JSX (JavaScript XML)**
2. **Componentes**
3. **Props**
4. **Virtual DOM**
5. **Listas e Keys**
6. **Renderização Condicional**
7. **State e `useState`**
8. **Formulários**
9. **`useEffect`**
10. **Consumo de APIs**
11. **React Router**

A aplicação consiste em um **Painel de Acompanhamento de Tarefas e Metas (Dashboard / To-Do Manager)** completo, modularizado e responsivo, acompanhado de um **Catálogo Interativo dos 11 Conceitos (`/requisitos`)** e do documento técnico detalhado [`MAPEAMENTO_REQUISITOS.md`](MAPEAMENTO_REQUISITOS.md).

---

## ✨ Funcionalidades Implementadas
- **Cadastro e Validação de Metas (`TaskForm`)**: Formulário controlado para criação de novas tarefas com contador de caracteres em tempo real, validação de obrigatoriedade, tamanho mínimo/máximo, verificação de duplicidade, categoria, nível de prioridade, observações opcionais e alertas visuais de erro/sucesso.
- **Listagem e Gerenciamento Reativo de Tarefas (`TaskList` & `TaskCard`)**:
  - Marcar/desmarcar metas como concluídas.
  - Edição inline controlada de título e observações diretamente no card.
  - Alternância rápida de prioridade (`Baixa` → `Média` → `Alta`) clicando no selo do card.
  - Exclusão individual de metas ou limpeza em lote de metas concluídas.
- **Busca e Filtros Combinados em Tempo Real (`SearchInput`)**:
  - Pesquisa instantânea por palavra-chave (título, notas ou categoria).
  - Filtro por status (`Todas`, `Pendentes`, `Concluídas`), categoria e prioridade.
- **Feedback Condicional Inteligente (`EmptyState`)**:
  - Exibição automática quando não há metas cadastradas ou quando os filtros ativos não retornam resultados, com ações rápidas para limpar filtros ou restaurar dados de demonstração.
- **Indicadores e Barra de Progresso (`Header` & `StatCard`)**:
  - Cálculo automático de total de metas, concluídas, pendentes, metas urgentes e percentual de conclusão (`%`).
- **Monitor Didático do Virtual DOM (`Header` & `Footer`)**:
  - Contador em tempo real de reconciliações reativas realizadas pelo React e descrição da última atualização na interface sem recarregar a página.
- **Consumo de API Externa com `useEffect` (`ApiSuggestionsPanel`)**:
  - Busca assíncrona via `fetch` na API REST `JSONPlaceholder` com controle de quantidade (`_limit`), cancelamento seguro via `AbortController`, indicador de carregamento, fallback local offline e importação de metas com 1 clique.
- **Sincronização Externa Automática (`localStorage` & `document.title`)**:
  - Persistência automática das metas no navegador e atualização dinâmica do título da aba com o número de pendências.
- **Navegação SPA e Parâmetros de URL (`React Router`)**:
  - Transição instantânea entre o Painel Principal (`/`), o Catálogo dos 11 Conceitos (`/requisitos`), filtragem via Query Params (`?conceito=...`) e tratamento de rota `404` (`*`).

---

## 🛠️ Matriz Geral dos 11 Conceitos de React Aplicados

> 📄 **Para consultar o mapeamento linha por linha e trechos de código de cada requisito, acesse também o documento [`MAPEAMENTO_REQUISITOS.md`](MAPEAMENTO_REQUISITOS.md) ou navegue até a rota `/requisitos` dentro da aplicação.**

| # | Conceito / Ferramenta | Função Principal no React | Como foi aplicado no Projeto | Arquivos Principais |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **JSX (JavaScript XML)** | Escrever a interface usando sintaxe declarativa semelhante a HTML integrada ao JS. | Estruturação semântica dos componentes, interpolação de expressões (`{completionPercentage}%`), estilos dinâmicos e binding de eventos (`onSubmit`, `onChange`, `onClick`). | Todos os arquivos em `src/components/` e `src/App.jsx` |
| **02** | **Componentes** | Dividir a interface em blocos independentes, coesos e reutilizáveis. | Arquitetura modularizada em `Header`, `StatCard`, `TaskForm`, `SearchInput`, `TaskList`, `TaskCard`, `EmptyState`, `ApiSuggestionsPanel`, `Footer` e `RequirementsGuide`. | `src/components/*.jsx`, `src/pages/RequirementsGuide.jsx` |
| **03** | **Props (Propriedades)** | Passar informações e callbacks de forma unidirecional entre componentes (Pai → Filho). | Transferência de objetos de dados (`task`, métricas, listas de categorias/prioridades) e funções manipuladoras (`onAddTask`, `onToggleTask`, `onDeleteTask`, `onEditTask`). | `src/App.jsx`, `src/components/TaskList.jsx`, `src/components/TaskCard.jsx`, `src/components/Header.jsx` |
| **04** | **Virtual DOM** | Atualizar a interface de forma performática reconciliando apenas os nós que mudaram. | Atualizações de estado imutáveis (`.map()`, `.filter()`, spread `...`) combinadas a um monitor em tempo real que contabiliza e descreve cada reconciliação na árvore virtual. | `src/App.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx` |
| **05** | **Listas e Keys** | Renderizar coleções dinâmicas de dados com `.map()` e chave única `key`. | Mapeamento de cartões de metas (`key={task.id}`), indicadores do cabeçalho (`key={item.id}`), sugestões da API (`key={item.id}`) e catálogo dos 11 conceitos (`key={concept.id}`). | `src/components/TaskList.jsx`, `src/components/Header.jsx`, `src/components/ApiSuggestionsPanel.jsx`, `src/pages/RequirementsGuide.jsx` |
| **06** | **Renderização Condicional** | Mostrar, ocultar ou alternar conteúdos diferentes conforme uma condição lógica. | Uso de operadores ternários (`? :`) e lógicos (`&&`) para alternar entre lista e `EmptyState`, modo de visualização vs. edição inline, banners de validação e estado de `loading`. | `src/components/TaskList.jsx`, `src/components/EmptyState.jsx`, `src/components/TaskCard.jsx`, `src/components/TaskForm.jsx` |
| **07** | **State e `useState`** | Armazenar informações dinâmicas nos componentes e disparar re-renderizações na UI. | Gerenciamento da coleção de metas (com *lazy initialization* do `localStorage`), estados de busca/filtros, campos de formulários controlados, edição inline e controle de requisições. | `src/App.jsx`, `src/components/TaskForm.jsx`, `src/components/TaskCard.jsx`, `src/components/ApiSuggestionsPanel.jsx` |
| **08** | **Formulários** | Receber, validar e processar informações enviadas pelo usuário com *Controlled Components*. | Inputs e selects controlados por estado, interceptação de envio (`event.preventDefault()`), validação de campos obrigatórios, tamanho (3 a 120 caracteres), bloqueio de duplicatas e edição inline. | `src/components/TaskForm.jsx`, `src/components/TaskCard.jsx`, `src/components/SearchInput.jsx` |
| **09** | **Hook `useEffect`** | Sincronizar componentes React com sistemas externos e gerenciar efeitos colaterais. | Sincronização automática das metas com `localStorage`, atualização dinâmica do título da aba (`document.title`) e disparo/limpeza (`AbortController`) de requisições HTTP externas. | `src/App.jsx`, `src/components/ApiSuggestionsPanel.jsx` |
| **10** | **Consumo de APIs** | Buscar, processar e apresentar dados provenientes de serviços externos (REST/JSON). | Requisições `GET` assíncronas (`fetch` + `async/await`) à API `JSONPlaceholder`, tratamento de erros (`try/catch/finally`), seletor de limite, fallback offline e importação de itens. | `src/components/ApiSuggestionsPanel.jsx` |
| **11** | **React Router** | Organizar múltiplas páginas, navegação declarativa e parâmetros de URL em uma SPA. | Configuração de `BrowserRouter`, `Routes`, `Route` (`/`, `/requisitos`, `*`), menu com estado ativo via `NavLink` e filtragem de conceitos por URL usando `useSearchParams` e `useNavigate`. | `src/main.jsx`, `src/App.jsx`, `src/components/Header.jsx`, `src/pages/RequirementsGuide.jsx` |

---

## 📖 Documentação Detalhada das Ferramentas e Hooks Aplicados

Abaixo está a explicação aprofundada de como **State e `useState`**, **Formulários**, **`useEffect`**, **Consumo de APIs** e **React Router** foram arquitetados no projeto e quais funções desempenham.

### 1. State e Hook `useState` (Critério 07)

No React, o **State (Estado)** representa a memória interna de um componente — qualquer informação que pode mudar ao longo do tempo em resposta a ações do usuário ou respostas de rede. O Hook **`useState`** permite declarar variáveis de estado em componentes funcionais, retornando um par `[valorAtual, funcaoAtualizadora]`. Sempre que a função atualizadora é invocada com uma nova referência, o React agenda uma nova renderização e reconcilia a interface no Virtual DOM.

No projeto **FocusFlow**, o `useState` foi aplicado estrategicamente em duas camadas: **Estado Elevado (*Lifted State*)** no componente raiz `App.jsx` (para dados compartilhados entre múltiplos componentes) e **Estado Local (*Colocated State*)** nos componentes filhos (para interações restritas a um único bloco da UI). Além disso, utilizou-se **Inicialização Preguiçosa (*Lazy Initial State*)** passando uma função para `useState(() => ...)` ao ler o `localStorage`, garantindo que a leitura síncrona do armazenamento ocorra apenas na montagem inicial.

| Componente | Estado (`useState`) | Tipo de Dado | Função Detalhada no Projeto |
| :--- | :--- | :--- | :--- |
| `src/App.jsx` | `tasks`, `setTasks` | `Array<Object>` | Armazena a lista principal de metas; inicializado via *lazy function* a partir do `localStorage` ou `INITIAL_TASKS`. |
| `src/App.jsx` | `searchTerm`, `statusFilter`, `categoryFilter`, `priorityFilter` | `String` | Armazenam os critérios ativos de pesquisa textual, status (`all`/`pending`/`completed`), categoria e prioridade. |
| `src/App.jsx` | `vdomUpdatesCount`, `lastVdomAction` | `Number`, `String` | Contabilizam o número de reconciliações do Virtual DOM e registram a descrição da última mutação imutável. |
| `src/components/TaskForm.jsx` | `title`, `category`, `priority`, `notes` | `String` | Controlam em tempo real o valor de cada campo de entrada do formulário de nova meta. |
| `src/components/TaskForm.jsx` | `errorMessage`, `successMessage`, `isExpanded` | `String`, `Boolean` | Controlam mensagens de erro de validação, confirmação de sucesso e abertura do campo opcional de notas. |
| `src/components/TaskCard.jsx` | `isEditing`, `editedTitle`, `editedNotes` | `Boolean`, `String` | Gerenciam isoladamente o modo de edição inline de cada cartão de tarefa sem afetar os demais cards. |
| `src/components/ApiSuggestionsPanel.jsx` | `suggestions`, `loading`, `limit`, `sourceLabel`, `lastSyncTime`, `importedIds` | `Array`, `Boolean`, `Number`, `String` | Controlam os dados recebidos da API externa, o indicador de carregamento, o limite de consulta e os itens já importados. |

---

### 2. Formulários Controlados e Validação (Critério 08)

Os **Formulários** em React seguem o padrão de **Componentes Controlados (*Controlled Components*)**, onde o estado do React (`useState`) atua como a "única fonte da verdade" (*single source of truth*) para todos os elementos HTML de entrada (`<input>`, `<select>`). Em vez de deixar o DOM armazenar o texto digitado livremente, cada campo recebe o atributo `value={estado}` e dispara `onChange={(e) => setEstado(e.target.value)}` a cada tecla pressionada.

No projeto, os formulários cumprem três etapas fundamentais — **Recebimento, Validação e Processamento**:
1. **Recebimento Sincronizado**: Em `TaskForm.jsx`, conforme o usuário digita o título da meta, o estado `title` é atualizado imediatamente, exibindo um contador dinâmico de caracteres (`{title.length}/120`) e limpando alertas de erro anteriores.
2. **Validação de Regras de Negócio**: Ao submeter o formulário (`onSubmit={handleSubmit}`), `event.preventDefault()` impede o recarregamento padrão do navegador. Em seguida, o código valida:
   - Se o título está vazio após `.trim()`;
   - Se possui o comprimento mínimo exigido (3 caracteres) e máximo (120 caracteres);
   - Se já existe uma meta com o mesmo título na lista atual (`existingTasks.some(...)`), evitando duplicidades.
3. **Processamento e Edição Inline**: Após aprovada a validação, os dados higienizados são enviados ao componente pai via callback `onAddTask(...)`, os campos do formulário são redefinidos para seus valores iniciais e um banner temporário de confirmação (`successMessage`) é exibido. Além disso, o componente `TaskCard.jsx` implementa um segundo formulário controlado para **edição inline**, permitindo atualizar título e observações de qualquer meta existente.

| Formulário / Controle | Arquivo | Campos Controlados | Validações e Processamento Aplicados |
| :--- | :--- | :--- | :--- |
| **Cadastro de Nova Meta** | `src/components/TaskForm.jsx` | `title`, `category`, `priority`, `notes` | `event.preventDefault()`, obrigatoriedade, mínimo de 3 e máximo de 120 caracteres, verificação de título duplicado, reset automático e alerta de sucesso. |
| **Edição Inline de Tarefa** | `src/components/TaskCard.jsx` | `editedTitle`, `editedNotes` | Bloqueia salvamento com título vazio, aplica `.trim()`, invoca `onEditTask(task.id, ...)` ou restaura valores originais ao cancelar (`handleCancelEdit`). |
| **Filtros e Busca em Tempo Real** | `src/components/SearchInput.jsx` | `searchTerm`, `statusFilter`, `categoryFilter`, `priorityFilter` | Sincronização instantânea a cada evento `onChange`, combinando busca textual e seletores com botão condicional de reset (`onClearFilters`). |

---

### 3. Hook `useEffect` — Sincronização com Sistemas Externos (Critério 09)

O Hook **`useEffect`** tem a função de executar **efeitos colaterais (*side effects*)** após a fase de renderização do componente, permitindo sincronizar o estado interno do React com **sistemas externos** que não fazem parte do fluxo puro de renderização (como APIs do navegador, armazenamento local, manipulação direta do `document` ou conexões de rede HTTP). Seu comportamento é governado pelo **array de dependências** passado como segundo argumento e, opcionalmente, por uma **função de limpeza (*cleanup function*)**.

No projeto **FocusFlow**, foram implementados **3 efeitos colaterais distintos** com `useEffect`:
1. **Sincronização com Web Storage API (`localStorage`) em `src/App.jsx`**: Monitora o array `[tasks]`. Sempre que uma meta é criada, concluída, editada ou excluída, o `useEffect` serializa o novo array em JSON (`JSON.stringify(tasks)`) e o persiste no `localStorage`, garantindo que o usuário não perca seus dados ao fechar ou atualizar a aba.
2. **Sincronização com o DOM do Navegador (`document.title`) em `src/App.jsx`**: Monitora a variável derivada `[pendingTasks]`. A cada mudança no número de tarefas pendentes, o efeito atualiza dinamicamente o título da janela/aba do navegador (ex.: `(2 pendentes) FocusFlow — Gerenciador de Metas React`), oferecendo feedback visual mesmo quando o usuário está em outra aba.
3. **Sincronização com Serviço de Rede e Cleanup (`AbortController`) em `src/components/ApiSuggestionsPanel.jsx`**: Dispara a requisição HTTP para buscar sugestões de metas na montagem inicial do componente e sempre que o usuário altera a quantidade desejada (`[limit]`). Inclui uma função de *cleanup* (`return () => controller.abort()`) que cancela qualquer requisição em andamento caso o usuário troque de rota ou altere o filtro rapidamente, prevenindo condições de corrida (*race conditions*) e vazamentos de memória.

| Localização | Sistema Externo Sincronizado | Array de Dependências | Uso de Cleanup | Objetivo Técnico |
| :--- | :--- | :--- | :--- | :--- |
| `src/App.jsx` (Linhas 54–60) | `window.localStorage` (Web Storage) | `[tasks]` | Não requer | Salvar automaticamente a lista de metas no navegador após qualquer alteração de estado. |
| `src/App.jsx` (Linhas 63–68) | `document.title` (Browser DOM) | `[pendingTasks]` | Não requer | Atualizar o título da aba do navegador em tempo real conforme o total de metas pendentes. |
| `src/components/ApiSuggestionsPanel.jsx` (Linhas 87–94) | API REST (`JSONPlaceholder`) via `fetch` | `[fetchSuggestions]` (atrelado a `limit`) | `controller.abort()` | Buscar dados externos na montagem/mudança de limite e abortar requisições pendentes na desmontagem. |

---

### 4. Consumo de APIs Externas (Critério 10)

O **Consumo de APIs** permite que uma aplicação React deixe de trabalhar apenas com dados estáticos locais e passe a se comunicar de forma assíncrona com servidores e serviços web externos via protocolo HTTP. Para uma boa experiência de usuário, o consumo de API em React exige o gerenciamento coordenado de três estados: **carregamento (`loading`)**, **sucesso com transformação de dados (`suggestions`)** e **tratamento de falhas/contingência (`catch` / fallback)**.

Dentro do componente `src/components/ApiSuggestionsPanel.jsx`, o consumo de API foi implementado utilizando a **Fetch API nativa do JavaScript** com sintaxe moderna `async / await`:
- **Requisição HTTP Parametrizada**: A função `fetchSuggestions` realiza uma chamada `GET` ao endpoint público `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`, onde o parâmetro `_limit` é controlado dinamicamente pelo usuário (`3` ou `5` sugestões).
- **Validação de Status HTTP e Transformação de Dados**: O código verifica `if (!response.ok)` para capturar erros HTTP (como `404` ou `500`), converte o corpo da resposta com `await response.json()` e mapeia o payload externo para o formato estruturado do `FocusFlow` (adicionando `id`, `title`, `category` e `priority`).
- **Resiliência com Fallback Offline e Integração com o Estado Principal**: Caso o ambiente de execução esteja sem acesso à internet ou o servidor externo falhe, o bloco `catch` ativa automaticamente um catálogo local de contingência (`FALLBACK_SUGGESTIONS`), mantendo a funcionalidade operacional. Cada sugestão exibida conta com o botão **"+ Importar Meta"**, que transfere o item da API diretamente para a lista principal de metas do usuário (`onImportSuggestion`) e marca o item como já importado (`✓ Adicionada ao Painel`).

| Etapa do Consumo da API | Implementação em `ApiSuggestionsPanel.jsx` | Comportamento na Interface |
| :--- | :--- | :--- |
| **1. Disparo Assíncrono** | `fetch('https://jsonplaceholder.typicode.com/todos?_limit=' + limit, { signal })` | Ativa `loading = true`, desabilita controles repetidos e exibe mensagem de carregamento. |
| **2. Processamento JSON** | `const data = await response.json()` + `.map()` de normalização | Formata os dados recebidos, registra o horário da sincronização (`lastSyncTime`) e atualiza o contador do Virtual DOM. |
| **3. Tratamento de Erros** | Bloco `try / catch / finally` + verificação de `AbortError` | Se houver falha de rede, carrega `FALLBACK_SUGGESTIONS` e informa `"Modo Offline"` sem quebrar a tela. |
| **4. Importação Interativa** | `handleImport(suggestion)` → prop `onImportSuggestion` | Insere a meta externa no estado `tasks` do `App.jsx` e bloqueia reimportação duplicada (`importedIds`). |

---

### 5. React Router — Navegação SPA por URLs (Critério 11)

O **React Router (`react-router-dom` v6)** é a biblioteca padrão para roteamento declarativo em aplicações React do tipo **SPA (*Single Page Application*)**. Sua função é manter a interface sincronizada com a URL do navegador utilizando a *History API*, permitindo dividir a aplicação em múltiplas páginas e visões compartilháveis por link sem que o navegador precise fazer o download de um novo documento HTML a cada clique.

No projeto, o **React Router** foi aplicado de ponta a ponta utilizando tanto componentes estruturais quanto Hooks de navegação programática e parâmetros de busca (*Query Strings*):
- **Provedor de Histórico (`<BrowserRouter>`)**: Configurado em `src/main.jsx` envolvendo o componente `<App />`, habilitando o contexto de roteamento para toda a árvore de componentes.
- **Mapeamento de Rotas (`<Routes>` e `<Route>`)**: Definido em `src/App.jsx` para alternar o conteúdo principal (`<main>`) mantendo o `<Header>` e o `<Footer>` persistentes:
  - Rota `/`: Renderiza o Painel Principal de Gerenciamento de Metas (`TaskForm`, `SearchInput`, `TaskList`, `ApiSuggestionsPanel`).
  - Rota `/requisitos`: Renderiza a página `RequirementsGuide`, que apresenta o catálogo interativo dos **11 critérios**.
  - Rota `*` (Wildcard 404): Captura qualquer URL inexistente e exibe uma tela amigável de "Página não encontrada" com um `<Link to="/">` para retorno imediato.
- **Links com Estado Ativo (`<NavLink>`) e Hooks de URL (`useSearchParams`, `useNavigate`)**: No `Header.jsx`, o componente `<NavLink>` aplica automaticamente a classe CSS `.nav-link-active` quando a rota corresponde à URL atual. Já em `src/pages/RequirementsGuide.jsx`, o Hook `useSearchParams` lê e grava o parâmetro `?conceito=...` diretamente na URL (ex.: `/requisitos?conceito=07-state-usestate`) quando o usuário clica em **"Explorar conceito →"**, permitindo compartilhar o link direto para a documentação de um requisito específico.

| Recurso do React Router | Onde foi Aplicado | Função Desempenhada no Projeto |
| :--- | :--- | :--- |
| `<BrowserRouter>` | `src/main.jsx` | Provedor raiz que conecta a aplicação à History API do navegador. |
| `<Routes>` e `<Route>` | `src/App.jsx` | Declaram as rotas `/` (Painel Principal), `/requisitos` (Guia dos 11 Conceitos) e `*` (Página 404). |
| `<NavLink>` | `src/components/Header.jsx` | Cria os botões do menu superior com detecção automática de rota ativa (`isActive`). |
| `<Link>` | `src/App.jsx` | Navegação declarativa sem reload na tela de erro 404 para retornar à rota `/`. |
| `useSearchParams` | `src/pages/RequirementsGuide.jsx` | Sincroniza o filtro do conceito selecionado com a query string da URL (`?conceito=09-useeffect`). |
| `useNavigate` | `src/pages/RequirementsGuide.jsx` | Executa navegação programática no botão `"← Voltar ao Painel de Metas"` (`navigate('/')`). |

---

## 📂 Estrutura de Pastas do Projeto

```text
├── public/
├── src/
│   ├── components/
│   │   ├── ApiSuggestionsPanel.jsx  # Critérios 09 e 10: Consumo de API REST com useEffect e AbortController
│   │   ├── EmptyState.jsx           # Critério 06: Feedback visual exibido via renderização condicional
│   │   ├── Footer.jsx               # Critério 04: Rodapé modular com monitor do Virtual DOM
│   │   ├── Header.jsx               # Critérios 01, 02, 03, 05 e 11: Cabeçalho, NavLink, progresso e StatCards
│   │   ├── SearchInput.jsx          # Critérios 03, 05, 06 e 08: Busca textual e filtros controlados
│   │   ├── TaskCard.jsx             # Critérios 03, 06, 07 e 08: Card de tarefa com edição inline controlada
│   │   ├── TaskForm.jsx             # Critérios 07 e 08: Formulário controlado com validação e feedback
│   │   └── TaskList.jsx             # Critérios 05 e 06: Mapeamento da coleção (.map + key) ou EmptyState
│   ├── data/
│   │   └── initialTasks.js          # Dados iniciais contemplando os 11 conceitos, categorias e prioridades
│   ├── pages/
│   │   └── RequirementsGuide.jsx    # Critério 11: Página interativa dos 11 conceitos com useSearchParams
│   ├── styles/
│   │   └── global.css               # Estilização moderna e responsiva (Dark UI)
│   ├── App.jsx                      # Componente raiz, useState, useEffect (localStorage/title) e Routes
│   └── main.jsx                     # Ponto de entrada do ReactDOM (createRoot) + BrowserRouter
├── guia_da_atividade_react (1).md   # Documento base com as instruções da atividade
├── MAPEAMENTO_REQUISITOS.md         # Mapeamento técnico detalhado dos 11 requisitos no código
├── README.md                        # Documentação principal do repositório
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧰 Tecnologias Utilizadas
- [React 18](https://react.dev/) (`useState`, `useEffect`, `useMemo`, `useCallback`)
- [React Router DOM 6](https://reactrouter.com/) (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useSearchParams`, `useNavigate`)
- [Vite](https://vite.dev/)
- Fetch API & JSONPlaceholder REST API
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

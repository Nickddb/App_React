# Guia da Atividade: Aplicação Prática em React

Este documento apresenta a estrutura completa, os conceitos e os requisitos necessários para a elaboração do projeto prático em React, além de servir como referência para o desenvolvimento da aplicação e montagem do repositório no GitHub.

---

## 1. 🎯 Objetivo Geral da Atividade

Desenvolver uma aplicação web interativa em **React** que aplique de forma prática os fundamentos essenciais da biblioteca. A atividade tem como meta demonstrar a capacidade de estruturar componentes reutilizáveis, manipular dados de forma dinâmica e aplicar boas práticas no versionamento e documentação do código através do GitHub.

---

## 2. 📋 Requisitos do Projeto

Para cumprir com todos os critérios exigidos na avaliação, a aplicação deve contemplar obrigatoriamente os seguintes pontos:

### Requisitos Técnicos de Desenvolvimento
* **JSX (JavaScript XML):** Utilizar a sintaxe declarativa para estruturar a interface do usuário de forma intuitiva, combinando HTML e código JavaScript.
* **Componentes:** Dividir a aplicação em pequenos blocos independentes, modulares e reutilizáveis (ex.: `Header`, `Card`, `List`, `Footer`).
* **Props (Propriedades):** Transferir informações e dados de maneira unidirecional dos componentes pais para os componentes filhos.
* **Listas e Keys:** Iterar e renderizar coleções de dados dinamicamente (utilizando a função `.map()`) associando sempre uma chave única (`key`) a cada elemento renderizado.
* **Renderização Condicional:** Exibir, alternar ou ocultar elementos/conteúdos da tela com base no estado da aplicação ou condições lógicas (ex.: ternários `? :` ou operador lógico `&&`).
* **Virtual DOM:** Estruturar a lógica e a renderização ciente do ciclo de atualização do React, permitindo que a interface reaja de forma performática.

### Requisitos de Entrega e Versionamento
* **Repositório Público no GitHub:** O código-fonte do projeto deve estar publicado e acessível publicamente.
* **Documentação (`README.md`):** O repositório deve conter um arquivo README detalhado apresentando:
  * Descrição clara sobre a aplicação.
  * Funcionalidades implementadas.
  * Conceitos teóricos e práticos do React aplicados durante o desenvolvimento.

---

## 3. 🧠 Contextualização dos Conceitos Estudados

| Conceito | Descrição Curta | Aplicação Prática no Projeto |
| :--- | :--- | :--- |
| **JSX** | Sintaxe que estende o JS para descrever a UI. | Escrever estruturas visuais diretamente no código JS de cada componente. |
| **Componentes** | Blocos de construção da interface. | Isolamento de partes da tela, como o formulário, lista de itens e cabeçalho. |
| **Props** | Parâmetros passados para componentes. | Enviar dados de um item específico (ex.: título, status) para o componente de exibição. |
| **Listas e Keys** | Mapeamento de coleções de dados. | Renderizar uma lista dinâmica de tarefas/cards garantindo performance com `key={item.id}`. |
| **Renderização Condicional** | Exibição baseada em condições. | Mostrar mensagem de "Lista vazia" ou alternar o status de visualização (ex.: ativo/inativo). |
| **Virtual DOM** | Cópia leve da DOM mantida pelo React. | Atualização otimizada e automática da interface apenas no elemento modificado. |

---

## 4. 💡 Proposta de Projeto Sugerida: Dashboard / To-Do Manager

Uma das formas mais eficazes de integrar todos os requisitos exigidos é através de um **Painel de Acompanhamento de Tarefas ou Metas**.

### Estrutura Sugerida de Componentes
1. **`Header`**: Exibe o título da aplicação e indicadores do status geral.
2. **`TaskForm` / `SearchInput`**: Componente visual para simulação de entrada de dados.
3. **`TaskList`**: Componente responsável por iterar sobre os dados e renderizar a coleção.
4. **`TaskCard`**: Componente filho que recebe informações via `props` e renderiza cada item da lista.
5. **`EmptyState`**: Componente de feedback exibido via renderização condicional quando não houver itens cadastrados.

---

## 5. 📄 Modelo de `README.md` para o Repositório

Você pode utilizar o modelo abaixo diretamente no arquivo `README.md` do seu projeto no GitHub:

```markdown
# 🚀 Projeto React - Gerenciador de Metas

## 📌 Descrição
Este projeto é uma aplicação web desenvolvida em **React** com o objetivo de consolidar os conceitos fundamentais da biblioteca aprendidos em aula. A aplicação consiste em um painel interativo para gerenciamento de tarefas e metas pessoais.

## ✨ Funcionalidades
- Listagem dinâmica de tarefas/itens.
- Exibição de mensagens condicionais para listas vazias.
- Interface modularizada e responsiva.
- Separação clara de responsabilidades por componentes.

## 🛠️ Conceitos de React Utilizados
- **JSX**: Estruturação de componentes visuais integrados ao JavaScript.
- **Componentes**: Divisão da interface em partes modulares (`Header`, `Card`, `List`).
- **Props**: Comunicação de dados entre componentes pais e filhos.
- **Listas e Keys**: Renderização dinâmica de dados via método `.map()` com chaves únicas.
- **Renderização Condicional**: Controle de exibição de elementos de acordo com condições lógicas.
- **Virtual DOM**: Aproveitamento do fluxo de renderização otimizado do React.

## 🧰 Tecnologias Utilizadas
- [React](https://react.dev/)
- JavaScript (ES6+)
- CSS / HTML5

## 🔧 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
```
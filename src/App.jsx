import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import SearchInput from './components/SearchInput';
import TaskList from './components/TaskList';
import ApiSuggestionsPanel from './components/ApiSuggestionsPanel';
import Footer from './components/Footer';
import RequirementsGuide from './pages/RequirementsGuide';
import { INITIAL_TASKS, CATEGORIES, PRIORITIES } from './data/initialTasks';

const STORAGE_KEY = 'focusflow_react_tasks_v1';

/**
 * Componente Raiz App:
 * Centraliza o estado principal das metas, persiste alterações no localStorage via useEffect,
 * contabiliza reconciliações do Virtual DOM e distribui dados/callbacks via Props para os componentes filhos.
 */
export default function App() {
  // Inicialização de estado com leitura do localStorage ou coleção inicial padrão
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Estados de busca e filtragem
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [priorityFilter, setPriorityFilter] = useState('todas');

  // Telemetria didática para demonstrar o funcionamento do Virtual DOM
  const [vdomUpdatesCount, setVdomUpdatesCount] = useState(1);
  const [lastVdomAction, setLastVdomAction] = useState(
    'Renderização inicial dos componentes na árvore Virtual DOM'
  );

  const registerVdomUpdate = (actionDescription) => {
    setVdomUpdatesCount((prev) => prev + 1);
    setLastVdomAction(actionDescription);
  };

  // Efeito colateral (useEffect) para sincronizar o estado com o localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignora erro caso o armazenamento esteja indisponível
    }
  }, [tasks]);

  // Funções manipuladoras de estado imutável (passadas via Props para componentes filhos)
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: newTaskData.title,
      category: newTaskData.category,
      priority: newTaskData.priority,
      notes: newTaskData.notes,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    registerVdomUpdate(`Nova meta adicionada ("${newTask.title.slice(0, 28)}...")`);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    registerVdomUpdate('Status de conclusão alternado em um único TaskCard');
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    registerVdomUpdate('Item removido da lista mantendo os demais nós intactos');
  };

  const handleEditTask = (taskId, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
    registerVdomUpdate('Texto da meta editado inline via reconciliação localizada');
  };

  const handleCyclePriority = (taskId) => {
    const order = ['baixa', 'media', 'alta'];
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;
        const nextIndex = (order.indexOf(task.priority) + 1) % order.length;
        return { ...task, priority: order[nextIndex] };
      })
    );
    registerVdomUpdate('Prioridade atualizada dinamicamente no TaskCard');
  };

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    registerVdomUpdate('Metas concluídas removidas em lote');
  };

  const handleRestoreDefaults = () => {
    setTasks(INITIAL_TASKS);
    handleClearFilters();
    registerVdomUpdate('Coleção original de metas restaurada');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('todas');
    setPriorityFilter('todas');
    registerVdomUpdate('Filtros de pesquisa redefinidos');
  };

  // Filtragem combinada das metas
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.notes && task.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'pending' && !task.completed);

      const matchesCategory =
        categoryFilter === 'todas' || task.category === categoryFilter;

      const matchesPriority =
        priorityFilter === 'todas' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, categoryFilter, priorityFilter]);

  // Indicadores derivados do estado atual
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityPending = tasks.filter(
    (t) => !t.completed && t.priority === 'alta'
  ).length;

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    statusFilter !== 'all' ||
    categoryFilter !== 'todas' ||
    priorityFilter !== 'todas';

  return (
    <div className="app-shell">
      <div className="app-container">
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

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TaskForm
                    onAddTask={handleAddTask}
                    categories={CATEGORIES}
                    priorities={PRIORITIES}
                  />

                  <SearchInput
                    searchTerm={searchTerm}
                    onSearchChange={(val) => {
                      setSearchTerm(val);
                      registerVdomUpdate('Filtro de busca por texto atualizado');
                    }}
                    statusFilter={statusFilter}
                    onStatusFilterChange={(val) => {
                      setStatusFilter(val);
                      registerVdomUpdate(`Filtro de status alterado para "${val}"`);
                    }}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={(val) => {
                      setCategoryFilter(val);
                      registerVdomUpdate(`Filtro de categoria alterado para "${val}"`);
                    }}
                    priorityFilter={priorityFilter}
                    onPriorityFilterChange={(val) => {
                      setPriorityFilter(val);
                      registerVdomUpdate(`Filtro de prioridade alterado para "${val}"`);
                    }}
                    categories={CATEGORIES}
                    priorities={PRIORITIES}
                    onClearFilters={handleClearFilters}
                    hasActiveFilters={hasActiveFilters}
                    resultCount={filteredTasks.length}
                    totalCount={totalTasks}
                  />

                  <TaskList
                    tasks={filteredTasks}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                    onCyclePriority={handleCyclePriority}
                    hasActiveFilters={hasActiveFilters}
                    onClearFilters={handleClearFilters}
                    onRestoreDefaults={handleRestoreDefaults}
                    onClearCompleted={handleClearCompleted}
                    completedCount={completedTasks}
                  />

                  <ApiSuggestionsPanel onImportSuggestion={handleAddTask} />
                </>
              }
            />

            <Route path="/requisitos" element={<RequirementsGuide />} />
          </Routes>
        </main>

        <Footer
          vdomUpdatesCount={vdomUpdatesCount}
          lastVdomAction={lastVdomAction}
          onRestoreDefaults={handleRestoreDefaults}
        />
      </div>
    </div>
  );
}


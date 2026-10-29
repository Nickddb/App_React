import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Componente filho reutilizável para exibir um indicador numérico no Header via Props.
 */
function StatCard({ label, value, subtitle, variant }) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      {subtitle && <span className="stat-subtitle">{subtitle}</span>}
    </div>
  );
}

/**
 * Componente Header:
 * Exibe o título da aplicação, navegação principal via React Router (NavLink),
 * barra de progresso e indicadores gerais recebidos via Props do componente Pai (App).
 */
export default function Header({
  appTitle,
  appSubtitle,
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityPending,
  vdomUpdatesCount,
  lastVdomAction
}) {
  // Expressão JavaScript usada diretamente no JSX para calcular o percentual concluído
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Lista de indicadores para demonstrar mapeamento de componentes reutilizáveis com key
  const statsItems = [
    {
      id: 'stat-total',
      label: 'Total de Metas',
      value: totalTasks,
      subtitle: 'Cadastradas no painel',
      variant: 'primary'
    },
    {
      id: 'stat-completed',
      label: 'Concluídas',
      value: completedTasks,
      subtitle: `${completionPercentage}% do objetivo total`,
      variant: 'success'
    },
    {
      id: 'stat-pending',
      label: 'Em Andamento',
      value: pendingTasks,
      subtitle:
        highPriorityPending > 0
          ? `${highPriorityPending} de alta prioridade`
          : 'Nenhuma urgente pendente',
      variant: 'warning'
    },
    {
      id: 'stat-vdom',
      label: 'Reconciliações VDOM',
      value: vdomUpdatesCount,
      subtitle: lastVdomAction || 'Interface pronta',
      variant: 'accent'
    }
  ];

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-block">
          <div className="brand-badge">REACT 18 • 11 CONCEITOS NA PRÁTICA</div>
          <h1 className="brand-title">{appTitle}</h1>
          <p className="brand-subtitle">{appSubtitle}</p>
        </div>

        <nav className="main-nav" aria-label="Navegação Principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            📋 Painel de Metas
          </NavLink>
          <NavLink
            to="/requisitos"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            🧭 11 Conceitos (Guia)
          </NavLink>
        </nav>
      </div>

      {/* Renderização de lista de indicadores usando .map() e key única */}
      <div className="stats-grid">
        {statsItems.map((item) => (
          <StatCard
            key={item.id}
            label={item.label}
            value={item.value}
            subtitle={item.subtitle}
            variant={item.variant}
          />
        ))}
      </div>

      {/* Barra de progresso dinâmica com Renderização Condicional */}
      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-label">
            Progresso Geral das Metas
            {completionPercentage === 100 && totalTasks > 0 && (
              <span className="badge-celebration"> 🎉 Todas as metas concluídas!</span>
            )}
          </span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div
          className="progress-bar-track"
          role="progressbar"
          aria-valuenow={completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </header>
  );
}

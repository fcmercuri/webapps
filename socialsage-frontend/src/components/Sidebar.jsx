import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // user.plan: 'free' | 'starter' | 'pro'
  const plan = user?.plan || 'free';

  const items = [
    { label: 'Dashboard', icon: '🏠', path: '/dashboard', minPlan: 'free' },
    { label: 'Personas', icon: '🧑‍💼', path: '/personas', minPlan: 'starter' },
    { label: 'Prompts', icon: '💡', path: '/prompts', minPlan: 'starter' },
    { label: 'Content', icon: '🔥', path: '/content', minPlan: 'starter' },
    { label: 'Insights', icon: '📊', path: '/persona-insights', minPlan: 'pro' },
    { label: 'Visuals', icon: '📈 ', path: '/upgrade', minPlan: 'free' },
  ];

  function hasAccess(minPlan) {
    if (minPlan === 'free') return true;
    if (minPlan === 'starter') return plan === 'starter' || plan === 'pro';
    if (minPlan === 'pro') return plan === 'pro';
    return false;
  }

  function handleClick(item) {
    if (!hasAccess(item.minPlan)) {
      navigate('/upgrade');
      return;
    }
    navigate(item.path);
  }

  return (
    <aside
      style={{
        width: 240,
        background: '#050509',
        borderRight: '1px solid rgba(148,163,184,0.25)',
        padding: '24px 18px',
        position: 'fixed',
        inset: 0,
        maxHeight: '100vh',
      }}
    >
      {/* Logo etc... */}

      <nav style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => {
          const active = location.pathname.startsWith(item.path);
          const locked = !hasAccess(item.minPlan) && item.label !== 'Upgrade';

          return (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                background: active
                  ? 'linear-gradient(135deg,#ffd945,#fbbf24)'
                  : 'transparent',
                color: locked ? '#6b7280' : active ? '#111827' : '#e5e7eb',
                opacity: locked && !active ? 0.5 : 1,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>

              {locked && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: 'rgba(148,163,184,0.25)',
                    color: '#9ca3af',
                  }}
                >
                  PRO
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
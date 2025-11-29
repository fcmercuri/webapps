import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const plan = user?.plan || 'free';

  function hasAccess(minPlan) {
    if (minPlan === 'free') return true;
    if (minPlan === 'starter') return plan === 'starter' || plan === 'pro';
    if (minPlan === 'pro') return plan === 'pro';
    return true;
  }

  function handleNav(path, minPlan) {
    if (!hasAccess(minPlan)) {
      navigate('/upgrade');
      return;
    }
    navigate(path);
  }

  const isActive = (path) => location.pathname.startsWith(path);

  const baseItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '10px 18px',
    borderRadius: 16,
    border: 'none',
    background: 'transparent',
    color: '#e5e7eb',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'pointer',
    outline: 'none',
  };

  const lockedStyle = {
    opacity: 0.4,
  };

  const labelStyle = {
    fontWeight: 500,
  };

  return (
    <aside
      style={{
        width: 260,
        background: '#050508',
        color: '#fff',
        padding: '24px 24px 32px',
        borderRight: '1px solid rgba(148,163,184,0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        inset: 0,
        maxHeight: '100vh',
      }}
    >
      {/* Top: logo + nav */}
      <div>
        {/* Logo block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: '#ffd945',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(250,204,21,0.4)',
            }}
          >
            <span style={{ fontSize: 20 }}>🟡</span>
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: '1.35rem',
              letterSpacing: '-0.04em',
            }}
          >
            SocialSage
          </div>
        </div>

        {/* Navigation items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Dashboard – always unlocked */}
          <button
            onClick={() => handleNav('/dashboard', 'free')}
            style={{
              ...baseItemStyle,
              background: isActive('/dashboard')
                ? 'linear-gradient(135deg,#ffd945,#fbbf24)'
                : 'rgba(15,23,42,0.8)',
              color: isActive('/dashboard') ? '#111827' : '#f9fafb',
              fontWeight: isActive('/dashboard') ? 700 : 500,
              boxShadow: isActive('/dashboard')
                ? '0 10px 30px rgba(250,204,21,0.45)'
                : 'none',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🏠</span>
            <span style={labelStyle}>Dashboard</span>
          </button>

          {/* Personas – starter+ */}
          <button
            onClick={() => handleNav('/personas', 'starter')}
            style={{
              ...baseItemStyle,
              ...(plan === 'free' ? lockedStyle : {}),
              fontWeight: isActive('/personas') ? 600 : 500,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🧑‍💼</span>
            <span style={labelStyle}>Personas</span>
            {plan === 'free' && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(148,163,184,0.25)',
                  color: '#9ca3af',
                  fontWeight: 600,
                }}
              >
                PRO
              </span>
            )}
          </button>

          {/* Prompts – starter+ */}
          <button
            onClick={() => handleNav('/prompts', 'starter')}
            style={{
              ...baseItemStyle,
              ...(plan === 'free' ? lockedStyle : {}),
              fontWeight: isActive('/prompts') ? 600 : 500,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>💡</span>
            <span style={labelStyle}>Prompts</span>
            {plan === 'free' && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(148,163,184,0.25)',
                  color: '#9ca3af',
                  fontWeight: 600,
                }}
              >
                PRO
              </span>
            )}
          </button>

          {/* Content – starter+ */}
          <button
            onClick={() => handleNav('/content', 'starter')}
            style={{
              ...baseItemStyle,
              ...(plan === 'free' ? lockedStyle : {}),
              fontWeight: isActive('/content') ? 600 : 500,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>✍️</span>
            <span style={labelStyle}>Content</span>
            {plan === 'free' && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(148,163,184,0.25)',
                  color: '#9ca3af',
                  fontWeight: 600,
                }}
              >
                PRO
              </span>
            )}
          </button>

          {/* Saved – starter+ (optional) */}
          <button
            onClick={() => handleNav('/saved', 'starter')}
            style={{
              ...baseItemStyle,
              ...(plan === 'free' ? lockedStyle : {}),
              fontWeight: isActive('/saved') ? 600 : 500,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <span style={labelStyle}>Saved</span>
            {plan === 'free' && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(148,163,184,0.25)',
                  color: '#9ca3af',
                  fontWeight: 600,
                }}
              >
                PRO
              </span>
            )}
          </button>

          {/* Upgrade – always unlocked */}
          <button
            onClick={() => handleNav('/upgrade', 'free')}
            style={{
              ...baseItemStyle,
              marginTop: 8,
              fontWeight: isActive('/upgrade') ? 600 : 500,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🔒</span>
            <span style={labelStyle}>Upgrade</span>
          </button>
        </nav>
      </div>

      {/* Bottom: Logout (keep your existing styles here) */}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }}
        style={{
          width: '100%',
          marginTop: 24,
          padding: '12px 18px',
          borderRadius: 999,
          border: '1px solid rgba(248,113,113,0.5)',
          background: 'rgba(127,29,29,0.9)',
          color: '#fecaca',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </aside>
  );
}

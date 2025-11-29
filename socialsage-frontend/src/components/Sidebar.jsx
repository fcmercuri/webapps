import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '🧑‍💼', label: 'Personas', path: '/personas' },
    { icon: '💡', label: 'Prompts', path: '/prompts' },
    { icon: '✍️', label: 'Content', path: '/content' },
    { icon: '⭐', label: 'Saved', path: '/saved' },
    { icon: '📈 ', label: 'Analytics', path: '/upgrade' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'linear-gradient(180deg, #0b0b0b 0%, #1a1a2e 100%)',
      borderRight: '1px solid rgba(255, 217, 69, 0.1)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Logo Section */}
      <div style={{ 
        padding: '30px 20px', 
        borderBottom: '1px solid rgba(255, 217, 69, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img 
          src="/logo.jpg" 
          alt="SocialSage Logo" 
          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
        />
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          margin: 0,
          background: 'linear-gradient(96deg, #fff 60%, #ffd945 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          SocialSage
        </h1>
      </div>

      {/* Menu Items - stacked vertically */}
      <nav style={{
        flex: 1,
        padding: '20px 10px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {menuItems.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              margin: '6px 0',
              borderRadius: '10px',
              textDecoration: 'none',
              color: location.pathname === item.path ? '#ffd945' : '#bbb',
              background: location.pathname === item.path ? 'rgba(255, 217, 69, 0.1)' : 'transparent',
              fontWeight: location.pathname === item.path ? 700 : 500,
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.background = 'rgba(255, 217, 69, 0.05)';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseLeave={e => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#bbb';
              }
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div style={{ padding: '20px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            color: '#ff6b6b',
            padding: '12px',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

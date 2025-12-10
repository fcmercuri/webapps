import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Sidebar({ isOpen, onItemClick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '', label: 'Dashboard', path: '/dashboard' },
    { icon: '', label: 'Personas', path: '/personas' },
    { icon: '', label: 'Prompts', path: '/prompts' },
    { icon: '', label: 'Saved', path: '/saved' },
    { icon: '', label: 'Analytics', path: '/analytics' },
    { icon: '', label: 'Account & Billing', path: '/account' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`sidebar-wrapper ${isOpen ? 'open' : ''}`}
      style={{
        width: '240px',
        height: '100vh',
        background: 'linear-gradient(180deg, #0b0b0b 0%, #1a1a2e 100%)',
        borderRight: '1px solid rgba(255, 217, 69, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: '30px 20px',
          borderBottom: '1px solid rgba(255, 217, 69, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <img
          src="/logo.jpg"
          alt="sainthetic Logo"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(96deg, #fff 60%, #ffd945 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          sAInthetic
        </h1>
      </div>

      {/* Menu Items */}
      <nav
        style={{
          padding: '20px 10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {menuItems.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            onClick={onItemClick}  // close sidebar on mobile after click
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              margin: '4px 0',
              borderRadius: '10px',
              textDecoration: 'none',
              color: location.pathname === item.path ? '#ffd945' : '#bbb',
              background:
                location.pathname === item.path
                  ? 'rgba(255, 217, 69, 0.12)'
                  : 'transparent',
              fontWeight: location.pathname === item.path ? 700 : 500,
              fontSize: '0.95rem',
              lineHeight: 1.2,
              transition: 'background 0.18s, color 0.18s',
            }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>
              {item.icon}
            </span>
            <span style={{ lineHeight: 1.2 }}>{item.label}</span>
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
            fontSize: '0.95rem',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

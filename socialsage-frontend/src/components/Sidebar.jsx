import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Sidebar({ isOpen, onItemClick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '⌂', label: 'Home', path: '/dashboard' },
    { icon: '♙', label: 'Buyer Personas', path: '/personas' },
    { icon: '⌕', label: 'Customer Questions', path: '/prompts' },
    { icon: '✧', label: 'Content Opportunities', path: '/content' },
    { icon: '▣', label: 'Saved Reports', path: '/saved' },
    { icon: '◫', label: 'Analytics', path: '/analytics' },
    { icon: '⚙', label: 'Account & Billing', path: '/account' },
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
        background: 'linear-gradient(180deg, #15102f 0%, #100d25 100%)',
        borderRight: '1px solid rgba(130, 92, 255, 0.18)',
        boxShadow: '8px 0 30px rgba(24, 16, 55, 0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo Section */}
      <div
        onClick={onItemClick} // close sidebar on mobile when logo is clicked
        style={{
          padding: '30px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.09)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer', // show it's clickable
        }}
      >
        <img
          src="/sainthetic-mark.svg"
          alt="sainthetic Logo"
          style={{
            width: '38px',
            height: '38px',
            objectFit: 'contain',
          }}
        />
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(96deg, #fff 30%, #c6a7ff 100%)',
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
          padding: '20px 10px 8px 10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {menuItems.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            onClick={onItemClick} // close sidebar on mobile after click
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              margin: '4px 0',
              borderRadius: '11px',
              textDecoration: 'none',
              minHeight: '46px',
              boxSizing: 'border-box',
              color: location.pathname === item.path ? '#fff' : '#c4bfd7',
              background:
                location.pathname === item.path
                  ? 'linear-gradient(100deg, rgba(132,86,255,0.42), rgba(132,86,255,0.12))'
                  : 'transparent',
              fontWeight: location.pathname === item.path ? 700 : 500,
              fontSize: '0.88rem',
              lineHeight: 1.2,
              transition: 'background 0.18s, color 0.18s',
            }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>
              {item.icon}
            </span>
            <span style={{ lineHeight: 1.2 }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Premium: Schema FAQs (blurred, locked) */}
      <div
        style={{
          padding: '0 10px 12px 10px',
        }}
      >
        <div
          style={{
            position: 'relative',
            margin: '4px 0',
            borderRadius: '10px',
            overflow: 'hidden',
            cursor: 'default',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 16px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 217, 69, 0.25)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <span
              style={{
                color: '#777',
                fontWeight: 600,
                fontSize: '0.95rem',
                lineHeight: 1.2,
              }}
            >
              Schema FAQs
            </span>
            <span
              style={{
                marginTop: 4,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#c6a7ff',
                opacity: 0.8,
              }}
            >
              premium
            </span>
          </div>

          {/* Dark / blur overlay to make it feel locked */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(11,11,11,0.0) 0%, rgba(11,11,11,0.7) 40%, rgba(11,11,11,0.9) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ padding: '20px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#e0dced',
            padding: '12px',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

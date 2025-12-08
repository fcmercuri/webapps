import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Sidebar from '../components/Sidebar';

export default function Saved() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b0b0b 0%, #05050a 60%, #05060d 100%)',
        color: '#fff',
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onItemClick={() => setIsSidebarOpen(false)}
      />

      <div className="dashboard-main">
        {/* Mobile header – same as Account */}
        <div className="dashboard-mobile-header">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(v => !v)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <img
              src="/logo.jpg"
              alt="SocialSage"
              style={{ width: 32, height: 32, borderRadius: 10 }}
            />
            <span style={{ color: '#fff', fontWeight: 700 }}>Menu</span>
          </button>
        </div>

        <div className="dashboard-content">
          {/* Optional: top-right account info, like Dashboard */}
          {user && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#e5e7eb', fontWeight: 600 }}>
                    {user.email}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                    Account type
                  </div>
                </div>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    background:
                      user.plan === 'pro'
                        ? 'rgba(22,163,74,0.15)'
                        : user.plan === 'starter'
                        ? 'rgba(234,179,8,0.15)'
                        : 'rgba(148,163,184,0.2)',
                    color:
                      user.plan === 'pro'
                        ? '#22c55e'
                        : user.plan === 'starter'
                        ? '#eab308'
                        : '#e5e7eb',
                    border:
                      user.plan === 'pro'
                        ? '1px solid rgba(22,163,74,0.5)'
                        : user.plan === 'starter'
                        ? '1px solid rgba(234,179,8,0.5)'
                        : '1px solid rgba(148,163,184,0.5)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontSize: '0.7rem',
                  }}
                >
                  {(user.plan || 'free').toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 16 }}>
            Saved
          </h1>
          <p style={{ color: '#bbb', maxWidth: 520 }}>
            All your saved personas, prompts, and generated content will appear
            here so you can quickly reuse your best assets.
          </p>
        </div>
      </div>
    </div>
  );
}

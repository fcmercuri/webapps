// src/pages/Account.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Account() {
  const { user, setUser } = useAuth();
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');
        // refresh profile
        const profileRes = await api.get('/api/user/profile');
        setUser(profileRes.data);
        // load billing info (you will implement this API)
        const billingRes = await api.get('/api/billing');
        setBilling(billingRes.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load account data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [setUser]);

  async function handleCancelRenewal() {
    if (!window.confirm('Cancel auto‑renew for your subscription?')) return;
    try {
      setSaving(true);
      setError('');
      await api.post('/api/billing/cancel');
      // reload billing state
      const billingRes = await api.get('/api/billing');
      setBilling(billingRes.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel renewal');
    } finally {
      setSaving(false);
    }
  }

  const planLabel = user?.plan || 'free';

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b0b0b 0%, #05050f 100%)',
        color: '#fff',
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onItemClick={() => setIsSidebarOpen(false)}
      />

      <div className="dashboard-main">
        {/* Mobile header */}
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
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              marginBottom: 24,
            }}
          >
            Account & Billing
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fecaca',
                padding: '14px 18px',
                borderRadius: 12,
                marginBottom: 20,
                fontSize: '0.9rem',
              }}
            >
              {error}
            </motion.div>
          )}

          {loading ? (
            <p style={{ color: '#9ca3af' }}>Loading account details…</p>
          ) : (
            <>
              {/* Profile card */}
              <div
                style={{
                  background: 'rgba(15,23,42,0.85)',
                  borderRadius: 16,
                  padding: '18px 20px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  marginBottom: 20,
                  maxWidth: 560,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#9ca3af',
                        marginBottom: 2,
                      }}
                    >
                      Profile
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      {user?.email || 'Unknown user'}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      background:
                        planLabel === 'pro'
                          ? 'rgba(22,163,74,0.15)'
                          : planLabel === 'starter'
                          ? 'rgba(234,179,8,0.15)'
                          : 'rgba(148,163,184,0.2)',
                      color:
                        planLabel === 'pro'
                          ? '#22c55e'
                          : planLabel === 'starter'
                          ? '#eab308'
                          : '#e5e7eb',
                      border:
                        planLabel === 'pro'
                          ? '1px solid rgba(22,163,74,0.5)'
                          : planLabel === 'starter'
                          ? '1px solid rgba(234,179,8,0.5)'
                          : '1px solid rgba(148,163,184,0.5)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontSize: '0.7rem',
                    }}
                  >
                    {planLabel}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.85rem' }}>
                  Manage your subscription and billing details for your SocialSage
                  account.
                </p>
              </div>

              {/* Billing card */}
              <div
                style={{
                  background: 'rgba(15,23,42,0.85)',
                  borderRadius: 16,
                  padding: '18px 20px',
                  border: '1px solid rgba(251,191,36,0.35)',
                  maxWidth: 560,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#facc15',
                        marginBottom: 2,
                      }}
                    >
                      Subscription
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700 }}>
                      {billing?.planLabel || planLabel.toUpperCase()}
                    </div>
                  </div>
                  {billing?.status && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color:
                          billing.status === 'active' ? '#22c55e' : '#f97316',
                      }}
                    >
                      {billing.status === 'active'
                        ? 'Active'
                        : 'Cancelled / not renewing'}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>
                  {billing?.renewsAt ? (
                    <p style={{ margin: '0 0 4px' }}>
                      Next renewal:{' '}
                      <strong>
                        {new Date(billing.renewsAt).toLocaleDateString()}
                      </strong>
                    </p>
                  ) : (
                    <p style={{ margin: '0 0 4px' }}>
                      This plan does not have a scheduled renewal date.
                    </p>
                  )}

                  {billing?.cancelledAt && (
                    <p style={{ margin: 0, color: '#f97316', fontSize: '0.8rem' }}>
                      Auto‑renew cancelled on{' '}
                      {new Date(billing.cancelledAt).toLocaleDateString()}.
                    </p>
                  )}
                </div>

                {billing?.status === 'active' && (
                  <button
                    type="button"
                    onClick={handleCancelRenewal}
                    disabled={saving}
                    style={{
                      marginTop: 14,
                      background: 'transparent',
                      border: '1px solid rgba(248,113,113,0.7)',
                      color: '#fecaca',
                      padding: '8px 14px',
                      borderRadius: 999,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: saving ? 'default' : 'pointer',
                      opacity: saving ? 0.6 : 1,
                    }}
                  >
                    {saving ? 'Cancelling…' : 'Cancel auto‑renew'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

export default function Account() {
  const { user, setUser } = useAuth();
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ---------- Helpers ----------
  const formatDate = (value) => {
    if (!value) return null;
    const d = typeof value === 'number' ? new Date(value * 1000) : new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString();
  };

  const formatMoney = (amountInCents) => {
    if (amountInCents == null) return null;
    return (amountInCents / 100).toFixed(2);
  };

  // ---------- Data loading ----------
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');

        // Profile
        const profileRes = await api.get('/api/user/profile');
        setUser(profileRes.data);

        // Billing
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

  // ---------- Actions ----------
  async function handleCancelRenewal() {
    if (!window.confirm('Cancel auto‑renew for your subscription?')) return;

    try {
      setSaving(true);
      setError('');

      await api.post('/api/billing/cancel');

      const billingRes = await api.get('/api/billing');
      setBilling(billingRes.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel renewal');
    } finally {
      setSaving(false);
    }
  }

  async function handleOpenPortal() {
    try {
      setPortalLoading(true);
      setError('');

      // Either your /api/billing already returns portalUrl, OR you expose /api/billing/portal
      if (billing?.portalUrl) {
        window.location.href = billing.portalUrl;
        return;
      }

      const res = await api.post('/api/billing/portal');
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        setError('Could not open billing portal');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  }

  // ---------- Derived ----------
  const plan = user?.plan || 'free';
  const planLabel = plan.toUpperCase();

  const nextRenewalLabel = billing?.renewsAt ? formatDate(billing.renewsAt) : null;
  const cancelAtLabel = billing?.cancelAt ? formatDate(billing.cancelAt) : null;
  const cancelledAtLabel = billing?.cancelledAt ? formatDate(billing.cancelledAt) : null;

  const isActive = billing?.status === 'active';
  const isScheduledToCancel = Boolean(billing?.cancelAt);

  const hasStripeSub = Boolean(billing?.status);

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
        <div
          className="dashboard-mobile-header"
          style={{ padding: '10px 10px 0' }}
        >
          <button
            type="button"
            onClick={() => setIsSidebarOpen((v) => !v)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src="/logo.jpg"
              alt="sainthetic"
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

          {/* Global banner if no Stripe subscription is linked */}
          {!loading && !hasStripeSub && (
            <div
              style={{
                background: 'rgba(127,29,29,0.9)',
                border: '1px solid rgba(248,113,113,0.8)',
                color: '#fecaca',
                padding: '10px 14px',
                borderRadius: 10,
                marginBottom: 16,
                fontSize: '0.85rem',
              }}
            >
              No active Stripe subscription linked to this user. If you recently
              upgraded, make sure you used the same email and environment (test vs
              live).
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
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
                        plan === 'pro'
                          ? 'rgba(22,163,74,0.15)'
                          : plan === 'starter'
                          ? 'rgba(234,179,8,0.15)'
                          : 'rgba(148,163,184,0.2)',
                      color:
                        plan === 'pro'
                          ? '#22c55e'
                          : plan === 'starter'
                          ? '#eab308'
                          : '#e5e7eb',
                      border:
                        plan === 'pro'
                          ? '1px solid rgba(22,163,74,0.5)'
                          : plan === 'starter'
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
                  Manage your subscription and billing details for your sAInthetic
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
                      {billing?.planLabel || planLabel}
                    </div>
                    {billing?.interval && (
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: '#e5e7eb',
                          marginTop: 2,
                        }}
                      >
                        Billed {billing.interval}
                      </div>
                    )}
                  </div>

                  {billing?.status && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: isActive ? '#22c55e' : '#f97316',
                      }}
                    >
                      {isActive
                        ? isScheduledToCancel
                          ? 'Active (cancels at period end)'
                          : 'Active'
                        : 'Cancelled / not renewing'}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>
                  {/* Next charge */}
                  {billing?.amountFormatted && nextRenewalLabel && (
                    <p style={{ margin: '0 0 4px' }}>
                      Next charge:{' '}
                      <strong>{billing.amountFormatted}</strong> on{' '}
                      <strong>{nextRenewalLabel}</strong>
                    </p>
                  )}

                  {!billing?.amountFormatted && nextRenewalLabel && (
                    <p style={{ margin: '0 0 4px' }}>
                      Next renewal on <strong>{nextRenewalLabel}</strong>
                    </p>
                  )}

                  {!nextRenewalLabel && (
                    <p style={{ margin: '0 0 4px' }}>
                      This plan does not have a scheduled renewal date.
                    </p>
                  )}

                  {/* Cancel info */}
                  {cancelAtLabel && (
                    <p
                      style={{
                        margin: '0 0 4px',
                        color: '#f97316',
                        fontSize: '0.8rem',
                      }}
                    >
                      Auto‑renew will stop on {cancelAtLabel}. Your access
                      remains active until then.
                    </p>
                  )}

                  {cancelledAtLabel && (
                    <p
                      style={{
                        margin: 0,
                        color: '#f97316',
                        fontSize: '0.8rem',
                      }}
                    >
                      Subscription fully cancelled on {cancelledAtLabel}.
                    </p>
                  )}

                  {/* Payment method */}
                  {billing?.paymentMethod && (
                    <p
                      style={{
                        margin: '8px 0 4px',
                        fontSize: '0.85rem',
                        color: '#9ca3af',
                      }}
                    >
                      Payment method:{' '}
                      {billing.paymentMethod.brand?.toUpperCase()} ••••{' '}
                      {billing.paymentMethod.last4} exp{' '}
                      {billing.paymentMethod.expMonth}/
                      {billing.paymentMethod.expYear}
                    </p>
                  )}

                  {/* Recent invoices */}
                  {billing?.invoices?.length > 0 && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: '0.8rem',
                      }}
                    >
                      <div style={{ marginBottom: 4, color: '#9ca3af' }}>
                        Recent invoices:
                      </div>
                      {billing.invoices.slice(0, 3).map((inv) => (
                        <div key={inv.id} style={{ marginBottom: 2 }}>
                          {formatDate(inv.created)} – $
                          {formatMoney(inv.amountPaid)} – {inv.status}{' '}
                          {inv.hostedInvoiceUrl && (
                            <a
                              href={inv.hostedInvoiceUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: '#38bdf8' }}
                            >
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    marginTop: 14,
                  }}
                >
                  {isActive && !isScheduledToCancel && (
                    <button
                      type="button"
                      onClick={handleCancelRenewal}
                      disabled={saving}
                      style={{
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

                  <button
                    type="button"
                    onClick={handleOpenPortal}
                    disabled={portalLoading}
                    style={{
                      background: 'rgba(56,189,248,0.1)',
                      border: '1px solid rgba(56,189,248,0.7)',
                      color: '#bae6fd',
                      padding: '8px 14px',
                      borderRadius: 999,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: portalLoading ? 'default' : 'pointer',
                      opacity: portalLoading ? 0.6 : 1,
                    }}
                  >
                    {portalLoading ? 'Opening portal…' : 'Manage billing details'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

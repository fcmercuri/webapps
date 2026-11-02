import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('Verifying payment...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verify() {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');
      if (!sessionId) {
        setError('No session ID found.');
        return;
      }

      try {
        const verified = await api.post('/api/stripe/verify-session', { sessionId });
        setStatus(`Payment successful! Your ${String(verified.data?.plan || 'paid').toUpperCase()} plan is being activated. Taking you to your workspace...`);
        // Keep the existing authenticated session; the dashboard reloads the saved account plan.
        setTimeout(() => navigate('/dashboard', { replace: true, state: { paymentVerified: true, plan: verified.data?.plan } }), 1200);
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed.');
      }
    }
    verify();
  }, [location.search, navigate]);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: 'linear-gradient(180deg, #f7f5fc 0%, #f2effa 100%)', color: '#211a35' }}>
      <section style={{ width: '100%', maxWidth: 480, padding: 36, borderRadius: 20, background: '#fff', border: '1px solid #e8e2f3', boxShadow: '0 20px 60px rgba(48, 34, 83, 0.10)', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 14 }}>{error ? '!' : '✓'}</div>
        <h1 style={{ fontSize: 24, margin: '0 0 12px' }}>{error ? 'We could not verify your payment' : 'Welcome to your new plan'}</h1>
        <p style={{ color: '#716b80', lineHeight: 1.6, margin: 0 }}>{error || status}</p>
        {error && <button type="button" onClick={() => navigate('/dashboard')} style={{ marginTop: 22, border: 0, borderRadius: 10, padding: '12px 20px', background: '#7041db', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Return to dashboard</button>}
      </section>
    </main>
  );
}

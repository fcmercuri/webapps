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
        await api.post('/stripe/verify-session', { sessionId });

        setStatus('Payment successful! Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed.');
      }
    }
    verify();
  }, [location.search, navigate]);

  if (error) return <div>{error}</div>;
  return <div>{status}</div>;
}

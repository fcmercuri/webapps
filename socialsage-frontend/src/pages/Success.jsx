import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
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
        // 1) tell backend to verify and upgrade user
        await api.post('/stripe/verify-session', { sessionId });

        // 2) fetch updated profile (isPremium should now be true)
        const profileRes = await api.get('/user/profile');
        setUser(profileRes.data);

        // 3) go to dashboard
        setStatus('Payment successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Verification failed.');
      }
    }
    verify();
  }, [location.search, navigate, setUser]);

  if (error) return <div>Error: {error}</div>;
  return <div>{status}</div>;
}

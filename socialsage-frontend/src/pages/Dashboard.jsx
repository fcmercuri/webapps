import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PersonaCard from '../components/PersonaCard';
import { motion } from 'framer-motion';
import api from '../api/axios';

export default function Dashboard() {
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPersonas();
  }, []);

  async function loadPersonas() {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/api/personas'); // this route exists
      setPersonas(res.data);
    } catch (err) {
      console.error('Failed to load personas', err);
      setError('Failed to load personas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)',
        color: '#fff',
      }}
    >
      <Sidebar />

      <div style={{ marginLeft: '240px', flex: 1, padding: '40px', maxWidth: '1400px' }}>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ff6b6b',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '30px',
              fontWeight: 500,
            }}
          >
            {error}
          </motion.div>
        )}

        <h2
          style={{
            fontSize: '1.8rem',
            fontWeight: 800,
            color: '#ffd945',
            margin: '0 0 20px 0',
            letterSpacing: '-0.5px',
          }}
        >
          Your Customer Personas
        </h2>

        {personas.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {personas.map((persona) => (
              <PersonaCard
                key={persona._id}
                persona={persona}
                onClick={() => {}}
                isLocked={false}
                onUnlock={() => {}}
              />
            ))}
          </div>
        ) : !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#bbb',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
            <h3 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '1.5rem' }}>
              Ready to Get Started?
            </h3>
            <p style={{ margin: 0, fontSize: '1.05rem' }}>
              Create personas from the Personas page in the sidebar.
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

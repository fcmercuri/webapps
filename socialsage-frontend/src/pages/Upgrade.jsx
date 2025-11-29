import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';

export default function PersonaInsights() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/api/personas');
        setPersonas(res.data);
      } catch (err) {
        console.error('Failed to load personas', err);
        setError('Failed to load personas');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // aggregate demographics
  const total = personas.length;

  const industries = personas.reduce((acc, p) => {
    const key = p.industry || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const ages = personas.map(p => p.age).filter(a => typeof a === 'number');
  const avgAge =
    ages.length > 0 ? Math.round(ages.reduce((s, a) => s + a, 0) / ages.length) : null;
  const minAge = ages.length > 0 ? Math.min(...ages) : null;
  const maxAge = ages.length > 0 ? Math.max(...ages) : null;

  const premiumCount = personas.filter(p => p.isPremium).length;

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

      <div style={{ marginLeft: 240, flex: 1, padding: 40, maxWidth: 1200 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 24 }}>
          Persona Demographics
        </h1>

        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.4)',
              padding: '12px 16px',
              borderRadius: 10,
              marginBottom: 20,
              color: '#ff6b6b',
            }}
          >
            {error}
          </div>
        )}

        {loading && <div>Loading...</div>}

        {!loading && !error && (
          <>
            {/* Top summary cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                marginBottom: 32,
              }}
            >
              <StatCard label="Total personas" value={total} />
              <StatCard
                label="Premium personas"
                value={`${premiumCount} (${total ? Math.round((premiumCount / total) * 100) : 0}%)`}
              />
              <StatCard
                label="Average age"
                value={avgAge ? `${avgAge} yrs` : 'N/A'}
                sub={`${minAge ?? '-'} – ${maxAge ?? '-'}`}
              />
            </div>

            {/* Industry breakdown */}
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>By industry</h2>
              {Object.keys(industries).length === 0 ? (
                <p style={{ color: '#bbb' }}>No personas yet.</p>
              ) : (
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    background: 'rgba(15,23,42,0.8)',
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}
                >
                  <thead>
                    <tr style={{ background: 'rgba(15,23,42,0.9)' }}>
                      <th style={thStyle}>Industry</th>
                      <th style={thStyle}>Personas</th>
                      <th style={thStyle}>Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(industries).map(([industry, count]) => (
                      <tr key={industry}>
                        <td style={tdStyle}>{industry}</td>
                        <td style={tdStyle}>{count}</td>
                        <td style={tdStyle}>
                          {total ? `${Math.round((count / total) * 100)}%` : '0%'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '10px 14px',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
};

const tdStyle = {
  padding: '10px 14px',
  borderBottom: '1px solid rgba(30,41,59,0.7)',
  fontSize: '0.95rem',
};

function StatCard({ label, value, sub }) {
  return (
    <div
      style={{
        background: 'rgba(15,23,42,0.9)',
        borderRadius: 12,
        padding: '18px 20px',
        border: '1px solid rgba(148,163,184,0.4)',
      }}
    >
      <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{value}</div>
      {sub && (
        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

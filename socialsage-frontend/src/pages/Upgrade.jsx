import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';

export default function PersonaInsights() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/api/personas');
        setPersonas(res.data || []);
      } catch (err) {
        console.error('Failed to load personas', err);
        setError('Failed to load personas');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const total = personas.length;

  const industries = personas.reduce((acc, p) => {
    let key = p.industry || 'Unknown';

    const lower = key.toLowerCase();
    if (lower === 'ecommerce' || lower === 'e-commerce') {
      key = 'E-commerce & Retail';
    }

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const ages = personas.map(p => p.age).filter(a => typeof a === 'number');
  const avgAge =
    ages.length > 0 ? Math.round(ages.reduce((s, a) => s + a, 0) / ages.length) : null;
  const minAge = ages.length > 0 ? Math.min(...ages) : null;
  const maxAge = ages.length > 0 ? Math.max(...ages) : null;

  const premiumCount = personas.filter(p => p.isPremium).length;

  const maxIndustryCount =
    Object.values(industries).reduce((m, v) => (v > m ? v : m), 0) || 1;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)',
        color: '#fff',
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onItemClick={() => setIsSidebarOpen(false)}
      />

      <div className="dashboard-main">
        {/* Mobile header (same as Dashboard) */}
        <div
          className="dashboard-mobile-header"
          style={{ padding: '10px 10px 0' }}
        >
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
              padding: 0,
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

        <div
          className="dashboard-content"
          style={{
            padding: '20px 16px 40px',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
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

          {loading && <div style={{ color: '#bbb' }}>Loading...</div>}

          {!loading && !error && (
            <>
              {/* Summary cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  marginBottom: 32,
                }}
              >
                <StatCard label="Total personas" value={total} />
                <StatCard
                  label="Premium personas"
                  value={`${premiumCount} (${
                    total ? Math.round((premiumCount / total) * 100) : 0
                  }%)`}
                />
                <StatCard
                  label="Average age"
                  value={avgAge ? `${avgAge} yrs` : 'N/A'}
                  sub={`${minAge ?? '-'} – ${maxAge ?? '-'}`}
                />
              </div>

              {/* Industry bar chart */}
              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>
                  Personas by industry
                </h2>
                {Object.keys(industries).length === 0 ? (
                  <p style={{ color: '#bbb' }}>No personas yet.</p>
                ) : (
                  <div
                    style={{
                      background: 'rgba(15,23,42,0.9)',
                      borderRadius: 12,
                      padding: '16px 12px 20px',
                      border: '1px solid rgba(148,163,184,0.4)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 8,
                        height: 200,
                        paddingBottom: 16,
                        overflowX: 'auto',
                      }}
                    >
                      {Object.entries(industries).map(([industry, count]) => {
                        const rawPct =
                          maxIndustryCount > 0
                            ? (count / maxIndustryCount) * 100
                            : 0;
                        const heightPct = Math.max(8, Math.round(rawPct));

                        return (
                          <div
                            key={industry}
                            style={{
                              flex: '0 0 60px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              fontSize: '0.75rem',
                            }}
                          >
                            <div
                              style={{
                                width: '70%',
                                minWidth: 24,
                                height: `${heightPct}%`,
                                background:
                                  'linear-gradient(180deg,#ffd945,#fbbf24)',
                                borderRadius: 8,
                                boxShadow:
                                  '0 6px 18px rgba(250,204,21,0.35)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                color: '#111827',
                                fontWeight: 700,
                                paddingBottom: 4,
                              }}
                            >
                              {count}
                            </div>
                            <div
                              style={{
                                marginTop: 6,
                                color: '#e5e7eb',
                                textAlign: 'center',
                                maxWidth: 72,
                                wordBreak: 'break-word',
                              }}
                            >
                              {industry}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>

              {/* Industry table */}
              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>
                  Details
                </h2>
                {Object.keys(industries).length === 0 ? (
                  <p style={{ color: '#bbb' }}>No personas yet.</p>
                ) : (
                  <div
                    style={{
                      overflowX: 'auto',
                      borderRadius: 12,
                      border: '1px solid rgba(148,163,184,0.4)',
                    }}
                  >
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: 'rgba(15,23,42,0.8)',
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
                        {Object.entries(industries).map(
                          ([industry, count]) => (
                            <tr key={industry}>
                              <td style={tdStyle}>{industry}</td>
                              <td style={tdStyle}>{count}</td>
                              <td style={tdStyle}>
                                {total
                                  ? `${Math.round(
                                      (count / total) * 100
                                    )}%`
                                  : '0%'}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '10px 14px',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
};

const tdStyle = {
  padding: '10px 14px',
  borderBottom: '1px solid rgba(30,41,59,0.7)',
  fontSize: '0.9rem',
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

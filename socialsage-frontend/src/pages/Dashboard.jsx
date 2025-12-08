import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import IndustrySelector from '../components/IndustrySelector';
import PersonaCard from '../components/PersonaCard';
import PromptCard from '../components/PromptCard';
import ContentEditor from '../components/ContentEditor';
import { motion } from 'framer-motion';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [personas, setPersonas] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log('Dashboard user:', user);

  useEffect(() => {
    loadUserProfile();
    loadPersonas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadUserProfile() {
    try {
      const res = await api.get('/api/user/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load profile');
    }
  }

  async function loadPersonas() {
    try {
      const res = await api.get('/api/personas');
      setPersonas(res.data);
    } catch (err) {
      setError('Failed to load personas');
    }
  }

  async function handleIndustrySelect(industry) {
    try {
      setLoading(true);
      setError('');

      if (user?.plan === 'starter' && personas.length >= 5) {
        setError(
          'Starter plan allows up to 5 personas. Upgrade to Pro for unlimited.'
        );
        return;
      }

      await api.put('/api/user/industry', { industry });
      const res = await api.post('/api/personas/generate', { industry });
      setPersonas(res.data);
      setUser({ ...user, industry });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate personas');
    } finally {
      setLoading(false);
    }
  }

  async function handlePersonaClick(persona) {
    if (persona.isPremium && user?.plan !== 'pro') {
      await handleUpgrade('price_1SXpzjPwyyuQCEbaNxjlPgtA');
      return;
    }
    setSelectedPersona(persona);
    setGeneratedContent(null);
    try {
      setLoading(true);
      const res = await api.post('/api/prompts/generate', {
        personaId: persona._id,
      });
      setPrompts(res.data);
    } catch (err) {
      setError('Failed to generate prompts');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateContent(promptId) {
    try {
      setLoading(true);
      setError('');
      setGeneratedContent(null);
      const res = await api.post('/api/content/generate', {
        promptId,
        type: 'website',
      });
      setGeneratedContent(res.data);
      setTimeout(() => {
        const editor = document.getElementById('content-editor');
        if (editor)
          editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveContent(content) {
    try {
      alert('Content saved successfully!');
    } catch (err) {
      setError('Failed to save content');
    }
  }

  async function handleUpgrade(priceId) {
    if (!user || !user.email) {
      alert('Please log in to upgrade.');
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, customerEmail: user.email }),
      });
      const { url } = await res.json();
      if (url) window.location = url;
      else alert('Failed to start payment. Please try again later.');
    } catch (err) {
      alert('Failed to start payment: ' + (err.message || 'Unknown error'));
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
      {/* Sidebar: always visible on desktop, toggled on mobile via isSidebarOpen */}
      <Sidebar
        isOpen={isSidebarOpen}
        onItemClick={() => setIsSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="dashboard-main">
        <div className="dashboard-content">
          {/* Top bar: Menu on left, account info on right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            {/* Left: Menu button (mobile) */}
            <div className="dashboard-mobile-header">
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

            {/* Right: email + plan badge */}
            {user && (
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
                  {user.plan || 'free'}
                </span>
              </div>
            )}
          </div>

          {/* Upgrade buttons */}
          {user && (
            <div style={{ marginBottom: 32 }}>
              {user.plan === 'free' && (
                <button
                  onClick={() =>
                    handleUpgrade('price_1SXqa1PwyyuQCEbaBU1sIZvY')
                  }
                  style={{
                    background: '#ffd945',
                    color: '#1a1a28',
                    fontWeight: 700,
                    border: 'none',
                    padding: '0.8rem 2rem',
                    borderRadius: 8,
                    fontSize: '1.12rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px #ffd94555',
                  }}
                >
                  Upgrade to Starter
                </button>
              )}

              {user.plan === 'starter' && (
                <button
                  onClick={() =>
                    handleUpgrade('price_1SXpzjPwyyuQCEbaNxjlPgtA')
                  }
                  style={{
                    background: '#ffd945',
                    color: '#1a1a28',
                    fontWeight: 700,
                    border: 'none',
                    padding: '0.8rem 2rem',
                    borderRadius: 8,
                    fontSize: '1.12rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px #ffd94555',
                  }}
                >
                  Upgrade to Pro
                </button>
              )}
            </div>
          )}

          {/* Error Message */}
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

          {/* Industry Selector */}
          <IndustrySelector
            onSelect={handleIndustrySelect}
            currentIndustry={user?.industry}
          />

          {/* Personas Section */}
          {personas.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
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
                    onClick={() => handlePersonaClick(persona)}
                    isLocked={persona.isPremium && user?.plan !== 'pro'}
                    onUnlock={() => handleUpgrade('price_PRO_REAL_ID')}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Prompts & Content Section */}
          {selectedPersona && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '30px',
                marginTop: '40px',
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#ffd945',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Content Ideas for {selectedPersona.name}
                </h2>

                {typeof selectedPersona.conversionScore === 'number' && (
                  <div
                    style={{
                      marginBottom: 16,
                      fontSize: 13,
                      color: '#9ca3af',
                    }}
                  >
                    Lead score:{' '}
                    <span style={{ fontWeight: 700, color: '#facc15' }}>
                      {Math.round(selectedPersona.conversionScore)}/100
                    </span>{' '}
                    {selectedPersona.conversionScore >= 70
                      ? '(Hot lead)'
                      : selectedPersona.conversionScore >= 40
                      ? '(Warm lead)'
                      : '(Cold lead)'}
                  </div>
                )}

                {/* prompts list */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                  }}
                >
                  {prompts.map((prompt) => (
                    <PromptCard
                      key={prompt._id}
                      prompt={prompt}
                      onGenerate={handleGenerateContent}
                      loading={loading}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Content Editor */}
              <div id="content-editor">
                <ContentEditor
                  content={generatedContent}
                  onSave={handleSaveContent}
                />
              </div>
            </div>
          )}

          {/* Empty State */}
          {personas.length === 0 && !loading && (
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
              <h3
                style={{
                  color: '#fff',
                  margin: '0 0 10px 0',
                  fontSize: '1.5rem',
                }}
              >
                Ready to Get Started?
              </h3>
              <p style={{ margin: 0, fontSize: '1.05rem' }}>
                Select your industry above to generate AI-powered customer
                personas
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import IndustrySelector from '../components/IndustrySelector';
import PersonaCard from '../components/PersonaCard';
import PromptCard from '../components/PromptCard';
import ContentEditor from '../components/ContentEditor';

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

  // Language state
  const [language, setLanguage] = useState('en'); // "en" or "it"

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem('language') || 'en';
    setLanguage(saved);
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  console.log('Dashboard user:', user);

  useEffect(() => {
    loadUserProfile();
    loadPersonas();
  }, []);

  async function loadUserProfile() {
    try {
      const res = await api.get('/api/user/profile');
      console.log('profile res', res.data);
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load profile', err);
    }
  }

  async function loadPersonas() {
    try {
      const res = await api.get('/api/personas');
      console.log('personas res', res.data);
      setPersonas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to load personas');
    }
  }

  async function handleIndustrySelect(industry) {
    try {
      setLoading(true);
      setError('');

      if (user?.plan === 'starter' && personas.length >= 5) {
        setError('Starter plan allows up to 5 personas. Upgrade to Pro for unlimited.');
        return;
      }

      // optionally store language with industry
      await api.put('/api/user/industry', { industry, language });

      const res = await api.post('/api/personas/generate', {
        industry,
        language, // generate personas in selected language
      });
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
        language, // prompts language
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
        language, // content language
      });
      setGeneratedContent(res.data);
      setTimeout(() => {
        const editor = document.getElementById('content-editor');
        if (editor) editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const firstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "there";
  const planLabel = (user?.plan || "free").toUpperCase();
  const recentPersonas = personas.slice(0, 3);

  return (
    <div className="saas-dashboard-shell">
      <Sidebar isOpen={isSidebarOpen} onItemClick={() => setIsSidebarOpen(false)} />

      <main className="dashboard-main sainthetic-dashboard">
        <div className="dashboard-mobile-header">
          <button type="button" className="dashboard-menu-trigger" onClick={() => setIsSidebarOpen(v => !v)}>
            <img src="/sainthetic-mark.svg" alt="sAInthetic" />
            <span>Menu</span>
          </button>
          <span className="mobile-plan-pill">{planLabel} PLAN</span>
        </div>

        <div className="dashboard-content sainthetic-dashboard-content">
          <header className="workspace-topbar">
            <div>
              <div className="workspace-eyebrow">YOUR WORKSPACE</div>
              <h1>Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {firstName} <span>✦</span></h1>
              <p>Turn customer insight into marketing growth.</p>
            </div>
            <div className="workspace-topbar-actions">
              <span className="workspace-plan-pill">{planLabel} PLAN</span>
              <div className="workspace-avatar">{firstName.slice(0, 1).toUpperCase()}</div>
            </div>
          </header>

          <section className="dashboard-welcome-hero">
            <div className="welcome-hero-copy">
              <div className="welcome-hero-kicker"><span>✦</span> BUYER INTELLIGENCE WORKSPACE</div>
              <h2>Create buyer intelligence<br className="desktop-break" /> in minutes.</h2>
              <p>Understand your buyers, uncover what they care about and find the content opportunities that move them to act.</p>
              <a href="#new-analysis" className="welcome-hero-button">Start a new analysis <span>→</span></a>
            </div>
            <div className="welcome-hero-art" aria-hidden="true">
              <div className="hero-art-orbit orbit-one"></div>
              <div className="hero-art-orbit orbit-two"></div>
              <div className="hero-art-card hero-art-card-main">
                <div className="hero-art-avatar">◎</div>
                <div className="hero-art-lines"><i></i><i></i><i></i></div>
                <div className="hero-art-tag">BUYER PROFILE</div>
              </div>
              <div className="hero-art-card hero-art-card-chart"><span>↗</span><strong>+38%</strong><small>Content opportunity</small><div className="hero-art-bars"><i></i><i></i><i></i><i></i><i></i></div></div>
              <div className="hero-art-spark">✦</div>
            </div>
          </section>

          <section className="dashboard-metrics-grid" aria-label="Workspace overview">
            <div className="dashboard-metric-card"><span className="metric-icon">♙</span><div><strong>{personas.length}</strong><span>Buyer personas</span></div></div>
            <div className="dashboard-metric-card"><span className="metric-icon">⌕</span><div><strong>{personas.length ? "Ready" : "—"}</strong><span>Audience insights</span></div></div>
            <div className="dashboard-metric-card"><span className="metric-icon">✧</span><div><strong>{personas.length ? "Explore" : "Next step"}</strong><span>Content opportunities</span></div></div>
          </section>

          {error && <div className="dashboard-error-message">{error}</div>}

          <section className="dashboard-section-block">
            <div className="dashboard-section-heading">
              <div><h2>Your latest analyses</h2><p>Pick up where you left off.</p></div>
              {personas.length > 0 && <a href="/personas">View all <span>→</span></a>}
            </div>
            {recentPersonas.length > 0 ? (
              <div className="recent-analysis-list">
                {recentPersonas.map((persona, index) => (
                  <button type="button" className="recent-analysis-row" key={persona._id} onClick={() => handlePersonaClick(persona)}>
                    <span className="recent-analysis-icon">{["◈", "◎", "✧"][index % 3]}</span>
                    <span className="recent-analysis-details"><strong>{persona.name || "Buyer persona"}</strong><small>{persona.industry || user?.industry || "Customer profile"} · Buyer persona</small></span>
                    <span className="recent-analysis-action">Open <b>→</b></span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <div className="empty-state-icon">✦</div>
                <div><strong>Your first buyer insight starts here</strong><p>Choose your industry below to generate your first buyer personas.</p></div>
              </div>
            )}
          </section>

          <section className="dashboard-section-block dashboard-quick-actions">
            <div className="dashboard-section-heading"><div><h2>Explore your workspace</h2><p>Move from understanding buyers to creating better content.</p></div></div>
            <div className="quick-action-grid">
              <a href="/personas" className="quick-action-card"><span className="quick-action-icon">♙</span><span className="quick-action-arrow">↗</span><strong>Buyer personas</strong><small>Understand your ideal customers</small></a>
              <a href="/prompts" className="quick-action-card"><span className="quick-action-icon">⌕</span><span className="quick-action-arrow">↗</span><strong>Customer questions</strong><small>Discover what buyers want to know</small></a>
              <a href="/content" className="quick-action-card"><span className="quick-action-icon">✧</span><span className="quick-action-arrow">↗</span><strong>Content opportunities</strong><small>Turn insights into useful content</small></a>
            </div>
          </section>

          <section className="dashboard-section-block new-analysis-section" id="new-analysis">
            <div className="dashboard-section-heading">
              <div><div className="workspace-eyebrow">GET STARTED</div><h2>Create a new analysis</h2><p>Choose the market you want to understand. We'll build your buyer profiles around it.</p></div>
              <button type="button" className="language-switch" onClick={() => setLanguage(prev => prev === "en" ? "it" : "en")}>Language: {language === "en" ? "English" : "Italiano"}</button>
            </div>
            <IndustrySelector onSelect={handleIndustrySelect} currentIndustry={user?.industry} />
          </section>

          {personas.length > 0 && (
            <section className="dashboard-section-block generated-personas-section">
              <div className="dashboard-section-heading"><div><h2>Your buyer personas</h2><p>Detailed profiles generated for your selected market.</p></div></div>
              <div className="personas-grid">
                {personas.map(persona => <PersonaCard key={persona._id} persona={persona} onClick={() => handlePersonaClick(persona)} isLocked={persona.isPremium && user?.plan !== "pro"} onUnlock={() => handleUpgrade("price_PRO_REAL_ID")} />)}
              </div>
            </section>
          )}

          {selectedPersona && (
            <div className="dashboard-prompts-layout" style={{ marginTop: 40 }}>
              <div><h2 className="dashboard-subsection-title">Content ideas for {selectedPersona.name}</h2><div style={{ display: "flex", flexDirection: "column", gap: 15 }}>{prompts.map(prompt => <PromptCard key={prompt._id} prompt={prompt} onGenerate={handleGenerateContent} loading={loading} />)}</div></div>
              <div id="content-editor"><ContentEditor content={generatedContent} onSave={handleSaveContent} /></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
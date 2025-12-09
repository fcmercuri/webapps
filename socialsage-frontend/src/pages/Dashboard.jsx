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
        setError('Starter plan allows up to 5 personas. Upgrade to Pro for unlimited.');
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
      const res = await api.post('/api/prompts/generate', { personaId: persona._id });
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
      const res = await api.post('/api/content/generate', { promptId, type: 'website' });
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

  // keep all code above this line

return (
  <div
    style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "40px",
    }}
  >
    {/* Sidebar: always visible on desktop, toggled on mobile via isSidebarOpen */}
      <Sidebar
  isOpen={isSidebarOpen}
  onItemClick={() => setIsSidebarOpen(false)}
/>

      {/* Main area */}
      <div className="dashboard-main">
        {/* Mobile header – visible only on mobile via CSS */}
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
);
}

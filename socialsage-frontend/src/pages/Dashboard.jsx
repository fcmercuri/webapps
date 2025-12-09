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
    console.log('profile res', res.data);   // <‑‑ add this line
    setUser(res.data);
  } catch (err) {
    console.error('Failed to load profile', err);
  }
}

async function loadPersonas() {
  try {
    const res = await api.get('/api/personas');
    console.log('personas res', res.data);  // <‑‑ add this line
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
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
      color: "#fff",
    }}
  >
    {/* Sidebar placeholder for now */}
    <div style={{ width: 260, padding: 20 }}>Sidebar</div>

    {/* Main area */}
    <div style={{ flex: 1, padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Dashboard</h1>

      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <div style={{ textAlign: "right", marginRight: 12 }}>
            <div
              style={{
                color: "#e5e7eb",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              {user.email}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
              Account type
            </div>
          </div>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background:
                user.plan === "pro"
                  ? "rgba(22,163,74,0.15)"
                  : user.plan === "starter"
                  ? "rgba(234,179,8,0.15)"
                  : "rgba(148,163,184,0.2)",
              color:
                user.plan === "pro"
                  ? "#22c55e"
                  : user.plan === "starter"
                  ? "#eab308"
                  : "#e5e7eb",
              border:
                user.plan === "pro"
                  ? "1px solid rgba(22,163,74,0.5)"
                  : user.plan === "starter"
                  ? "1px solid rgba(234,179,8,0.5)"
                  : "1px solid rgba(148,163,184,0.5)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.7rem",
            }}
          >
            {user.plan || "free"}
          </span>
        </div>
      )}
    </div>
  </div>
);
}

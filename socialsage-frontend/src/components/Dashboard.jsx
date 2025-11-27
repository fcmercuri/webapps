import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import IndustrySelector from '../components/IndustrySelector';
import PersonaCard from '../components/PersonaCard';
import PromptCard from '../components/PromptCard';
import ContentEditor from '../components/ContentEditor';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [personas, setPersonas] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserProfile();
    loadPersonas();
  }, []);

  async function loadUserProfile() {
    try {
      const res = await api.get('/user/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load profile');
    }
  }

  async function loadPersonas() {
    try {
      const res = await api.get('/personas');
      setPersonas(res.data);
    } catch (err) {
      setError('Failed to load personas');
    }
  }

  async function handleIndustrySelect(industry) {
    try {
      setLoading(true);
      setError('');
      
      // Update user industry
      await api.put('/user/industry', { industry });
      
      // Generate personas
      const res = await api.post('/personas/generate', { industry });
      setPersonas(res.data);
      
      setUser({ ...user, industry });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate personas');
    } finally {
      setLoading(false);
    }
  }

  async function handlePersonaClick(persona) {
    if (persona.isPremium && !user?.isPremium) {
      alert('Upgrade to Premium to unlock this persona!');
      return;
    }

    setSelectedPersona(persona);
    setGeneratedContent(null);
    
    // Load prompts for this persona
    try {
      setLoading(true);
      const res = await api.post('/prompts/generate', { personaId: persona._id });
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
      const res = await api.post('/content/generate', { promptId, type: 'website' });
      setGeneratedContent(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveContent(content) {
    try {
      // Save logic here (update content in DB)
      alert('Content saved successfully!');
    } catch (err) {
      setError('Failed to save content');
    }
  }

  function handleUpgrade() {
    alert('Upgrade feature coming soon! Contact support for early access.');
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)',
      color: '#fff'
    }}>
      <Sidebar />

      {/* Main Content */}
      <div style={{ marginLeft: '240px', flex: 1, padding: '40px', maxWidth: '1400px' }}>
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
              fontWeight: 500
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
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#ffd945',
              margin: '0 0 20px 0',
              letterSpacing: '-0.5px'
            }}>
              Your Customer Personas
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {personas.map((persona, i) => (
                <PersonaCard
                  key={persona._id}
                  persona={persona}
                  onClick={() => handlePersonaClick(persona)}
                  isLocked={persona.isPremium && !user?.isPremium}
                  onUnlock={handleUpgrade}
                />
              ))}
            </div>
          </div>
        )}

        {/* Prompts & Content Section */}
        {selectedPersona && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '30px',
            marginTop: '40px'
          }}>
            {/* Left: Prompts */}
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#ffd945',
                margin: '0 0 20px 0',
                letterSpacing: '-0.5px'
              }}>
                Content Ideas for {selectedPersona.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            <div>
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
              color: '#bbb'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
            <h3 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '1.5rem' }}>
              Ready to Get Started?
            </h3>
            <p style={{ margin: 0, fontSize: '1.05rem' }}>
              Select your industry above to generate AI-powered customer personas
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

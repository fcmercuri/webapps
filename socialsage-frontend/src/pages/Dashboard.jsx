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
  const { user } = useAuth();
  const [personas, setPersonas] = useState([]);
  const [prompts, setPrompts] = useState([]);      // will hold topics
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPersonas();
  }, []);

  async function loadPersonas() {
    try {
      setError('');
      const res = await api.get('/api/personas');      // route exists
      setPersonas(res.data);
    } catch (err) {
      console.error('Failed to load personas', err);
      setError('Failed to load personas');
    }
  }

  async function handleIndustrySelect() {
    // Current backend has no industry or personas/generate route.
    // You can later wire this to a new backend route.
    setError('Industry-based generation is not wired to the server yet.');
  }

  async function handlePersonaClick(persona) {
    setSelectedPersona(persona);
    setGeneratedContent(null);
    try {
      setLoading(true);
      setError('');
      // Use topics as "prompts"
      const res = await api.get('/api/topics', {
        params: { personaId: persona._id },
      });
      setPrompts(res.data);
    } catch (err) {
      console.error('Failed to load topics', err);
      setError('Failed to load prompts');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateContent(topicId) {
    try {
      setLoading(true);
      setError('');
      setGeneratedContent(null);

      // Use content-briefs as your content generator
      const res = await api.post('/api/content-briefs', {
        personaId: selectedPersona?._id,
        topicId,
        format: 'website',
      });
      setGeneratedContent(res.data.content || res.data);
    } catch (err) {
      console.error('Failed to generate content', err);
      setError('Failed to generate content');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveContent(content) {
    try {
      console.log('Saving content (stub):', content);
      alert('Content saved successfully (stub).');
    } catch (err) {
      console.error('Save failed', err);
      setError('Failed to save content');
    }
  }

  function handleUpgrade() {
    alert('Upgrade is not wired to Stripe on this backend yet.');
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

        <IndustrySelector
          onSelect={handleIndustrySelect}
          currentIndustry={user?.industry}
        />

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
                  isLocked={false}
                  onUnlock={handleUpgrade}
                />
              ))}
            </div>
          </div>
        )}

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
                  margin: '0 0 20px 0',
                  letterSpacing: '-0.5px',
                }}
              >
                Content Ideas for {selectedPersona.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {prompts.map((topic) => (
                  <PromptCard
                    key={topic._id}
                    prompt={{ _id: topic._id, title: topic.title, description: topic.description }}
                    onGenerate={() => handleGenerateContent(topic._id)}
                    loading={loading}
                  />
                ))}
              </div>
            </div>

            <div id="content-editor">
              <ContentEditor content={generatedContent} onSave={handleSaveContent} />
            </div>
          </div>
        )}

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
            <h3 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '1.5rem' }}>
              Ready to Get Started?
            </h3>
            <p style={{ margin: 0, fontSize: '1.05rem' }}>
              Create personas on the Personas page, then return here to get ideas and content briefs.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

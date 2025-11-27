import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContentEditor({ content, onSave }) {
  const [editedContent, setEditedContent] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  // Update state when content prop changes
  useEffect(() => {
    console.log('📝 ContentEditor received content:', content);
    if (content) {
      setEditedContent(content.body || '');
      setTitle(content.title || '');
    }
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    await onSave({ ...content, title, body: editedContent });
    setSaving(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    alert('Content copied to clipboard!');
  };

  if (!content) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.6) 0%, rgba(35, 40, 69, 0.4) 100%)',
        border: '1px solid rgba(255, 217, 69, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '60px 40px',
        borderRadius: '16px',
        textAlign: 'center',
        color: '#bbb',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 217, 69, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '2rem' }}>✨</span>
        </div>
        <h3 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '1.3rem' }}>
          No Content Generated Yet
        </h3>
        <p style={{ margin: 0, fontSize: '1rem' }}>
          Select a persona and generate a prompt to see AI-powered content here
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.8) 0%, rgba(35, 40, 69, 0.6) 100%)',
        border: '1px solid rgba(255, 217, 69, 0.15)',
        backdropFilter: 'blur(10px)',
        padding: '30px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: '500px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#ffd945',
          letterSpacing: '-0.5px'
        }}>
          Generated Content
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(255, 217, 69, 0.1)',
              border: '1px solid rgba(255, 217, 69, 0.3)',
              color: '#ffd945',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            📋 Copy
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#ffd945',
              color: '#191919',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              opacity: saving ? 0.6 : 1
            }}
          >
            {saving ? 'Saving...' : '💾 Save'}
          </motion.button>
        </div>
      </div>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Content title..."
        style={{
          padding: '12px 16px',
          background: 'rgba(11, 11, 11, 0.5)',
          border: '1px solid rgba(255, 217, 69, 0.2)',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: 600,
          fontFamily: 'inherit'
        }}
      />

      {/* Content Textarea */}
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        style={{
          flex: 1,
          minHeight: '400px',
          padding: '20px',
          background: 'rgba(11, 11, 11, 0.5)',
          border: '1px solid rgba(255, 217, 69, 0.1)',
          borderRadius: '12px',
          color: '#e0e0e0',
          fontSize: '1rem',
          lineHeight: 1.7,
          fontFamily: 'inherit',
          resize: 'vertical'
        }}
        placeholder="Your generated content will appear here..."
      />

      {/* Footer Info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'rgba(11, 11, 11, 0.3)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#bbb'
      }}>
        <span>Type: {content.type || 'General'}</span>
        <span>{editedContent.split(' ').filter(w => w.length > 0).length} words</span>
      </div>
    </motion.div>
  );
}

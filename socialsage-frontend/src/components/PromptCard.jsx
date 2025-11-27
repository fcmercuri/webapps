import React from 'react';
import { motion } from 'framer-motion';

const categoryColors = {
  SEO: '#4ade80',
  Social: '#60a5fa',
  Blog: '#f472b6',
  Website: '#fbbf24',
  Email: '#a78bfa'
};

const categoryEmojis = {
  SEO: '🔍',
  Social: '📱',
  Blog: '📝',
  Website: '🌐',
  Email: '📧'
};

export default function PromptCard({ prompt, onGenerate, loading }) {
  const color = categoryColors[prompt.category] || '#ffd945';
  const emoji = categoryEmojis[prompt.category] || '💡';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: 'rgba(20, 20, 22, 0.6)',
        border: '1px solid rgba(255, 217, 69, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Category Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: `${color}20`,
        border: `1px solid ${color}40`,
        color: color,
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontWeight: 600,
        width: 'fit-content'
      }}>
        <span>{emoji}</span>
        <span>{prompt.category}</span>
      </div>

      {/* Title */}
      <h4 style={{
        margin: 0,
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1.4
      }}>
        {prompt.title}
      </h4>

      {/* Description */}
      <p style={{
        margin: 0,
        color: '#bbb',
        fontSize: '0.9rem',
        lineHeight: 1.5,
        flex: 1
      }}>
        {prompt.description}
      </p>

      {/* Generate Button */}
      <motion.button
        onClick={() => onGenerate(prompt._id)}
        disabled={loading}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: '#ffd945',
          color: '#191919',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          opacity: loading ? 0.6 : 1,
          marginTop: '8px'
        }}
      >
        {loading ? 'Generating...' : 'Generate Content →'}
      </motion.button>
    </motion.div>
  );
}

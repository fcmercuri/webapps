import React, { useState } from 'react';
import { motion } from 'framer-motion';

const industries = [
  { value: 'saas', label: '💻 SaaS & Software', emoji: '💻' },
  { value: 'ecommerce', label: '🛍️ E-commerce & Retail', emoji: '🛍️' },
  { value: 'healthcare', label: '🏥 Healthcare & Wellness', emoji: '🏥' },
  { value: 'finance', label: '💰 Finance & Fintech', emoji: '💰' },
  { value: 'education', label: '📚 Education & E-learning', emoji: '📚' },
  { value: 'realestate', label: '🏠 Real Estate', emoji: '🏠' },
  { value: 'hospitality', label: '🏨 Hospitality & Travel', emoji: '🏨' },
  { value: 'marketing', label: '📈 Marketing & Agency', emoji: '📈' },
  { value: 'food', label: '🍔 Food & Beverage', emoji: '🍔' },
  { value: 'fitness', label: '💪 Fitness & Sports', emoji: '💪' },
];

export default function IndustrySelector({ onSelect, currentIndustry }) {
  const [selected, setSelected] = useState(currentIndustry || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return;
    
    setLoading(true);
    await onSelect(selected);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.8) 0%, rgba(35, 40, 69, 0.6) 100%)',
        border: '1px solid rgba(255, 217, 69, 0.15)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderRadius: '16px',
        marginBottom: '30px'
      }}
    >
      <h2 style={{
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#fff',
        margin: '0 0 10px 0',
        letterSpacing: '-0.5px'
      }}>
        {currentIndustry ? 'Change Your Industry' : 'Select Your Industry'}
      </h2>
      <p style={{ color: '#bbb', margin: '0 0 30px 0', fontSize: '1rem' }}>
        We'll generate AI-powered customer personas and prompts tailored to your market
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          {industries.map((industry) => (
            <motion.div
              key={industry.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(industry.value)}
              style={{
                padding: '20px',
                background: selected === industry.value
                  ? 'rgba(255, 217, 69, 0.15)'
                  : 'rgba(11, 11, 11, 0.5)',
                border: selected === industry.value
                  ? '2px solid #ffd945'
                  : '1px solid #232323',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{industry.emoji}</div>
              <div style={{
                color: selected === industry.value ? '#ffd945' : '#fff',
                fontWeight: selected === industry.value ? 700 : 500,
                fontSize: '0.9rem'
              }}>
                {industry.label.replace(industry.emoji + ' ', '')}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          type="submit"
          disabled={!selected || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            background: '#ffd945',
            color: '#191919',
            border: 'none',
            padding: '16px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: 'pointer',
            opacity: !selected || loading ? 0.5 : 1,
            boxShadow: '0 8px 20px rgba(255, 217, 69, 0.2)'
          }}
        >
          {loading ? 'Generating Personas...' : currentIndustry ? 'Update & Regenerate' : 'Generate My Personas'}
        </motion.button>
      </form>
    </motion.div>
  );
}

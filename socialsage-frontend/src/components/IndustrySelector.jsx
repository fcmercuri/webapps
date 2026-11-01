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
        background: '#ffffff',
        border: '1px solid #e9e6f2',
        padding: '28px',
        borderRadius: '20px',
        marginBottom: '30px',
        boxShadow: '0 12px 34px rgba(35, 24, 70, 0.06)'
      }}
    >
      <h2 style={{
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#17132a',
        margin: '0 0 10px 0',
        letterSpacing: '-0.5px'
      }}>
        {currentIndustry ? 'Select Your Industry' : 'Select Your Industry'}
      </h2>
      <p style={{ color: '#6f6a80', margin: '0 0 30px 0', fontSize: '1rem' }}>
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
                  ? 'rgba(128, 83, 255, 0.09)'
                  : '#fbfaff',
                border: selected === industry.value
                  ? '2px solid #8b5cf6'
                  : '1px solid #e9e6f2',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{industry.emoji}</div>
              <div style={{
                color: selected === industry.value ? '#7041db' : '#28243a',
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
            background: 'linear-gradient(100deg, #8b5cf6, #7041db)',
            color: '#fff',
            border: 'none',
            padding: '16px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: 'pointer',
            opacity: !selected || loading ? 0.5 : 1,
            boxShadow: '0 8px 20px rgba(112, 65, 219, 0.22)'
          }}
        >
          {loading ? 'Generating Personas...' : currentIndustry ? 'Update & Regenerate' : 'Generate My Personas'}
        </motion.button>
      </form>
    </motion.div>
  );
}

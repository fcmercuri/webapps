import React from 'react';
import { motion } from 'framer-motion';

export default function PersonaCard({ persona, onClick, isLocked, onUnlock }) {
  if (isLocked) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
          background: 'rgba(20, 20, 22, 0.4)',
          border: '1px solid rgba(255, 217, 69, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          filter: 'blur(3px)',
          opacity: 0.6
        }}
        onClick={onUnlock}
      >
        {/* locked content unchanged */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          filter: 'none'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔒</div>
          <div style={{
            background: '#ffd945',
            color: '#191919',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.95rem',
            filter: 'none'
          }}>
            Unlock Premium
          </div>
        </div>

        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👤</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontWeight: 700 }}>Premium Persona</h3>
        <p style={{ color: '#bbb', fontSize: '0.9rem', margin: 0 }}>Unlock deeper segmentation</p>
      </motion.div>
    );
  }

  const score = persona.conversionScore ?? 0;
  const roundedScore = Math.round(score);
  const level =
    score >= 70 ? 'Hot lead' : score >= 40 ? 'Warm lead' : 'Cold lead';
  const levelColor =
    score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#38bdf8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.8) 0%, rgba(35, 40, 69, 0.6) 100%)',
        border: '2px solid rgba(255, 217, 69, 0.2)',
        borderRadius: '16px',
        padding: '30px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* top row: avatar + score badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        {/* Avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 217, 69, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          border: '2px solid rgba(255, 217, 69, 0.3)'
        }}>
          {persona.avatar || '👤'}
        </div>

        {/* Score + level */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(248, 250, 252, 0.15)',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#e5e7eb',
              marginBottom: 6
            }}
          >
            Score: <span style={{ color: '#ffd945' }}>{roundedScore}</span>/100
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: levelColor,
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            {level}
          </div>
        </div>
      </div>

      {/* Name & Age */}
      <h3 style={{
        margin: '0 0 6px 0',
        fontSize: '1.5rem',
        fontWeight: 800,
        color: '#ffd945',
        letterSpacing: '-0.5px'
      }}>
        {persona.name}
      </h3>
      <p style={{ color: '#bbb', fontSize: '0.9rem', margin: '0 0 15px 0' }}>
        Age {persona.age}
      </p>

      {/* Bio */}
      <p style={{
        color: '#e0e0e0',
        lineHeight: 1.6,
        fontSize: '0.95rem',
        marginBottom: '20px'
      }}>
        {persona.bio}
      </p>

      {/* Goals */}
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#ffd945',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          margin: '0 0 10px 0'
        }}>
          Goals
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#e0e0e0', fontSize: '0.9rem' }}>
          {persona.goals?.map((goal, i) => (
            <li key={i} style={{ marginBottom: '6px' }}>{goal}</li>
          ))}
        </ul>
      </div>

      {/* Pain Points */}
      <div>
        <h4 style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#ff6b6b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          margin: '0 0 10px 0'
        }}>
          Pain Points
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#e0e0e0', fontSize: '0.9rem' }}>
          {persona.painPoints?.map((pain, i) => (
            <li key={i} style={{ marginBottom: '6px' }}>{pain}</li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '100%',
          marginTop: '20px',
          background: '#ffd945',
          color: '#191919',
          border: 'none',
          padding: '12px',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer'
        }}
      >
        Generate Content Ideas →
      </motion.button>
    </motion.div>
  );
}

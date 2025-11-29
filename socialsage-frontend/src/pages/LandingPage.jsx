import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🧠',
    title: 'AI Persona Engine',
    desc: 'Generate 4 hyper‑realistic personas for any industry in seconds, with goals, pains, and behavior built in.',
  },
  {
    icon: '💡',
    title: 'Endless Content Ideas',
    desc: 'Turn each persona into targeted prompts for blogs, socials, landing pages, and emails.',
  },
  {
    icon: '✍️',
    title: 'Conversion‑ready Copy',
    desc: '1,000–1,500 words of website or campaign copy tuned to your persona, ready to ship.',
  },
];

const steps = [
  { number: '01', title: 'Pick your industry', copy: 'Choose from SaaS, Agencies, E‑commerce, Real Estate, and more.' },
  { number: '02', title: 'Meet your personas', copy: 'SocialSage builds 4 detailed customer profiles with real‑world motivations.' },
  { number: '03', title: 'Steal their attention', copy: 'Get persona‑specific content ideas that plug directly into your calendar.' },
  { number: '04', title: 'Launch in hours', copy: 'Generate long‑form copy, tweak in‑app, and publish across your stack.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handlePrimary = () => navigate('/register');
  const handleSecondary = () => navigate('/login');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #1e1b4b 0, #020617 52%, #020617 100%)',
        color: '#f9fafb',
      }}
    >
      <NavigationBar />

      <main
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '32px 16px 72px',
        }}
      >
        {/* HERO */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(148,163,184,0.5)',
                fontSize: '0.75rem',
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>✨</span>
              <span>From blank page to launch‑ready copy in minutes</span>
            </div>

            <h1
              style={{
                fontSize: '2.4rem',
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                maxWidth: 640,
              }}
            >
              AI personas that write your{" "}
              <span style={{ color: '#fde047' }}>next converting page</span>.
            </h1>

            <p
              style={{
                marginTop: 14,
                fontSize: '1rem',
                color: '#d1d5db',
                maxWidth: 520,
              }}
            >
              SocialSage turns your audience into living personas, generates content ideas for each,
              and writes long‑form copy that actually sounds like them.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                marginTop: 22,
                maxWidth: 360,
              }}
            >
              <button
                onClick={handlePrimary}
                style={{
                  width: '100%',
                  background: '#fde047',
                  color: '#111827',
                  borderRadius: 999,
                  padding: '12px 20px',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 18px 45px rgba(250,204,21,0.45)',
                }}
              >
                Start free – no card
              </button>
              <button
                onClick={handleSecondary}
                style={{
                  width: '100%',
                  background: 'transparent',
                  borderRadius: 999,
                  padding: '11px 20px',
                  border: '1px solid rgba(148,163,184,0.6)',
                  color: '#e5e7eb',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                Watch the product in action
              </button>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                Free plan includes persona builder + content ideas.
              </span>
            </div>
          </motion.div>

          {/* Hero “app” preview */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{
              marginTop: 12,
              borderRadius: 24,
              padding: 16,
              background:
                'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.6))',
              border: '1px solid rgba(148,163,184,0.4)',
              boxShadow: '0 24px 90px rgba(15,23,42,0.9)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1.4fr)',
                gap: 18,
              }}
            >
              {/* Left: industry + personas */}
              <div
                style={{
                  borderRadius: 18,
                  padding: 14,
                  background: 'radial-gradient(circle at top,#111827,#020617)',
                  border: '1px solid rgba(55,65,81,0.8)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#9ca3af',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Step 1 · Choose industry
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  {['SaaS & Software', 'Agencies', 'E‑commerce', 'Real Estate'].map(
                    (label) => (
                      <div
                        key={label}
                        style={{
                          borderRadius: 999,
                          padding: '6px 10px',
                          fontSize: '0.78rem',
                          background:
                            label === 'SaaS & Software'
                              ? 'rgba(250,204,21,0.1)'
                              : 'rgba(15,23,42,0.9)',
                          border:
                            label === 'SaaS & Software'
                              ? '1px solid rgba(250,204,21,0.7)'
                              : '1px solid rgba(55,65,81,0.9)',
                          color:
                            label === 'SaaS & Software' ? '#fde047' : '#e5e7eb',
                        }}
                      >
                        {label}
                      </div>
                    )
                  )}
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#9ca3af',
                    marginBottom: 6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Step 2 · Personas
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                    gap: 8,
                  }}
                >
                  {['Growth‑obsessed founder', 'Content‑swamped marketer', 'Agency owner', 'RevOps lead'].map(
                    (name, i) => (
                      <div
                        key={name}
                        style={{
                          borderRadius: 12,
                          padding: 10,
                          background:
                            i === 1
                              ? 'linear-gradient(135deg,#facc15,#eab308)'
                              : 'rgba(15,23,42,0.95)',
                          color: i === 1 ? '#111827' : '#f9fafb',
                          fontSize: '0.8rem',
                          border:
                            i === 1
                              ? '1px solid rgba(250,204,21,0.9)'
                              : '1px solid rgba(55,65,81,0.9)',
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: 2 }}>{name}</div>
                        <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>
                          Click to see content ideas →
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Right: content ideas + copy */}
              <div
                style={{
                  borderRadius: 18,
                  padding: 14,
                  background:
                    'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.55))',
                  border: '1px solid rgba(55,65,81,0.9)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#e5e7eb',
                    marginBottom: 6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Step 3 · Content ideas
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  {[
                    'Landing page: “From idea to content calendar in a day”',
                    'Email sequence: “Stop guessing your audience”',
                    'Blog: “How to steal your customers’ questions”',
                    'LinkedIn post thread on persona‑driven prompts',
                  ].map((title, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderRadius: 10,
                        padding: 8,
                        background: 'rgba(15,23,42,0.9)',
                        border: '1px solid rgba(75,85,99,0.9)',
                        fontSize: '0.7rem',
                      }}
                    >
                      {title}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#e5e7eb',
                    marginBottom: 6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Step 4 · Generated copy
                </div>
                <div
                  style={{
                    borderRadius: 12,
                    padding: 10,
                    background: 'rgba(15,23,42,0.97)',
                    border: '1px solid rgba(55,65,81,0.9)',
                    fontSize: '0.78rem',
                    color: '#d1d5db',
                    minHeight: 80,
                  }}
                >
                  <strong style={{ color: '#fde047' }}>“You don’t need another AI writer.</strong>{' '}
                  You need a persona that knows exactly what to say. SocialSage analyzes your
                  segment, surfaces the questions they are asking today, and writes copy that
                  feels like you’ve been reading their DMs for months.”
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section style={{ marginTop: 56 }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              marginBottom: 18,
            }}
          >
            Everything you need to go from persona → page
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 16,
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  borderRadius: 16,
                  padding: 16,
                  background: 'rgba(15,23,42,0.96)',
                  border: '1px solid rgba(55,65,81,0.95)',
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginTop: 64 }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              marginBottom: 18,
            }}
          >
            How SocialSage fits into your day
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 14,
            }}
          >
            {steps.map((s) => (
              <div
                key={s.number}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: 12,
                  borderRadius: 14,
                  background: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(31,41,55,0.9)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    color: '#9ca3af',
                  }}
                >
                  {s.number}
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: '0.86rem', color: '#d1d5db' }}>{s.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ marginTop: 64 }}>
          <div
            style={{
              borderRadius: 20,
              padding: 18,
              background:
                'linear-gradient(135deg, rgba(250,204,21,0.18), rgba(8,47,73,0.95))',
              border: '1px solid rgba(250,204,21,0.45)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>
              Turn your next landing page into a persona‑powered asset.
            </div>
            <div style={{ fontSize: '0.9rem', color: '#f9fafb' }}>
              Join early‑stage marketers and founders using SocialSage to test new angles
              without hiring another copywriter.
            </div>
            <button
              onClick={handlePrimary}
              style={{
                marginTop: 4,
                background: '#fde047',
                color: '#111827',
                borderRadius: 999,
                padding: '9px 18px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Start free in 60 seconds
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

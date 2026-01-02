import React from "react";
import { Link } from "react-router-dom";

const firstArticle = {
  title: "Why Creating Buyer Personas Transforms Marketing Strategies for Expert Marketers",
  excerpt: "In the complex world of modern marketing, where consumer behaviors shift rapidly and competition intensifies daily, creating detailed buyer personas stands out as a foundational strategy that separates thriving campaigns from mediocre ones.",
  path: "/blog/why-buyer-personas-transform-marketing"
};

export default function Blog() {
  return (
    <>
      <style>{`
        .synthetic-blog {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a0d2e 50%, #0f0f23 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
          color: #f1f5f9;
          overflow-x: hidden;
          position: relative;
        }
        .synthetic-blog::before {
          content: '';
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(600px circle at 20% 80%, rgba(139,92,246,0.2) 0%, transparent 50%),
            radial-gradient(400px circle at 80% 20%, rgba(59,130,246,0.2) 0%, transparent 50%),
            radial-gradient(300px circle at 40% 40%, rgba(167,139,250,0.15) 0%, transparent 50%);
          animation: particles 25s ease-in-out infinite;
          z-index: -1;
        }
        @keyframes particles {
          0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(180deg); }
        }
        .synthetic-header {
          background: rgba(15,15,35,0.9);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 8px 48px rgba(0,0,0,0.4);
        }
        .synthetic-h1 {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          text-shadow: 0 8px 32px rgba(139,92,246,0.4);
        }
        .synthetic-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .synthetic-badge {
          display: inline-flex;
          background: linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.25));
          color: #c4b5fd;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          border: 1px solid rgba(196,181,253,0.4);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(139,92,246,0.25);
          font-size: 0.875rem;
          letter-spacing: 0.05em;
        }
        .synthetic-card {
          background: rgba(255,255,255,0.075);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          position: relative;
        }
        .synthetic-card:hover {
          transform: translateY(-16px) scale(1.015);
          box-shadow: 0 48px 96px rgba(139,92,246,0.3);
          border-color: rgba(139,92,246,0.3);
        }
        .synthetic-card-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(139,92,246,0.1) 50%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
        }
        .synthetic-card:hover .synthetic-card-glow::before {
          opacity: 1;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(400%) translateY(400%) rotate(45deg); }
        }
        .synthetic-btn {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255,255,255,0.25);
          color: white;
          font-weight: 800;
          padding: 1.25rem 2.5rem;
          border-radius: 20px;
          font-size: 1.125rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }
        .synthetic-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
          opacity: 0;
          transition: opacity 0.4s;
        }
        .synthetic-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 32px 64px rgba(139,92,246,0.4);
        }
        .synthetic-btn:hover::before {
          opacity: 1;
        }
        .synthetic-cta {
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #06b6d4 100%);
          position: relative;
          overflow: hidden;
        }
        .synthetic-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 60%);
          animation: pulse-glow 4s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
        .synthetic-ai-ring {
          width: 6rem;
          height: 6rem;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 48px rgba(139,92,246,0.6);
          animation: rotate-glow 20s linear infinite;
        }
        @keyframes rotate-glow {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 1024px) {
          .synthetic-hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
          }
        }
        @media (max-width: 1023px) {
          .synthetic-hero-grid { flex-direction: column-reverse; }
        }
      `}</style>
      
      <div className="synthetic-blog">
        {/* Header */}
        <header className="synthetic-header">
          <div className="synthetic-container" style={{padding: '4rem 0'}}>
            <h1 className="synthetic-h1">sAInthetic Blog</h1>
            <p style={{fontSize: '1.5rem', opacity: 0.9, marginTop: '1.5rem', maxWidth: '36rem'}}>
              Insights on AI-generated personas, marketing strategies, and tools that resonate with your audience.
            </p>
          </div>
        </header>

        {/* Hero */}
        <section className="synthetic-container" style={{padding: '6rem 0'}}>
          <div className="synthetic-hero-grid" style={{gap: '4rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              <span className="synthetic-badge">🔥 Featured</span>
              <h2 style={{fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', margin: 0}}>
                {firstArticle.title}
              </h2>
              <p style={{fontSize: '1.25rem', lineHeight: '1.7', maxWidth: '32rem', opacity: 0.9}}>
                {firstArticle.excerpt}
              </p>
              <Link to={firstArticle.path} className="synthetic-btn">
                Read the Article →
              </Link>
            </div>
            <div className="synthetic-card">
              <div style={{padding: '4rem 2rem', textAlign: 'center'}}>
                <div className="synthetic-ai-ring">
                  <svg width="2.5rem" height="2.5rem" stroke="white" strokeWidth="2" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 style={{fontSize: '2.25rem', fontWeight: '900', marginBottom: '1rem'}}>
                  AI-Powered Personas
                </h3>
                <p style={{fontSize: '1.125rem', opacity: 0.8, marginBottom: '2.5rem'}}>
                  Generated instantly for targeted marketing
                </p>
                <a href="https://sainthetic.com/" style={{color: '#c4b5fd', fontWeight: '700', fontSize: '1.125rem', textDecoration: 'none'}}>
                  Try sAInthetic →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="synthetic-container" style={{padding: '6rem 0 8rem'}}>
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 className="synthetic-h1" style={{fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1rem'}}>
              Recent Articles
            </h2>
            <p style={{fontSize: '1.375rem', opacity: 0.8, maxWidth: '40rem', margin: '0 auto'}}>
              Dive deeper into strategies that transform how you connect with customers.
            </p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem'}}>
            <article className="synthetic-card">
              <div className="synthetic-card-glow" style={{padding: '3.5rem'}}>
                <span className="synthetic-badge" style={{background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', color: 'white'}}>
                  🚀 Latest
                </span>
                <h3 style={{fontSize: '1.875rem', fontWeight: '900', margin: '1.5rem 0 1.5rem 0', lineHeight: '1.3'}}>
                  {firstArticle.title}
                </h3>
                <p style={{opacity: 0.85, lineHeight: '1.65', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                  {firstArticle.excerpt}
                </p>
                <Link to={firstArticle.path} style={{color: '#c4b5fd', fontWeight: '700', fontSize: '1.125rem', marginTop: '2rem', display: 'inline-flex', alignItems: 'center', textDecoration: 'none'}}>
                  Read more →
                </Link>
              </div>
            </article>
            {/* Enhanced placeholders */}
            {Array.from({length: 2}, (_, i) => (
              <article key={i} className="synthetic-card" style={{padding: '3.5rem', animation: 'pulse 2s infinite'}}>
                <div style={{height: '14rem', background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))', borderRadius: '20px', marginBottom: '1.5rem'}} />
                <span style={{height: '1.5rem', width: '6rem', background: 'rgba(255,255,255,0.15)', borderRadius: '50px', marginBottom: '1rem', display: 'inline-block'}} />
                <div style={{height: '2.25rem', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', marginBottom: '1rem'}} />
                <p style={{height: '5rem', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', marginBottom: '2rem'}} />
                <div style={{height: '1.75rem', width: '7rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}} />
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="synthetic-cta">
          <div className="synthetic-container" style={{padding: '8rem 0', textAlign: 'center'}}>
            <h2 className="synthetic-h1" style={{fontSize: 'clamp(2.75rem, 8vw, 5.5rem)', marginBottom: '2rem'}}>
              Ready to create personas that convert?
            </h2>
            <p style={{fontSize: '1.5rem', opacity: 0.95, marginBottom: '4rem', maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto'}}>
              Generate AI-powered buyer personas instantly with sAInthetic.
            </p>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
              <a href="https://sainthetic.com/" className="synthetic-btn" style={{padding: '1.5rem 3rem'}}>
                Get Started Free →
              </a>
              <Link to={firstArticle.path} className="synthetic-btn" style={{borderColor: 'rgba(255,255,255,0.4)', background: 'transparent'}}>
                Read First Article
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

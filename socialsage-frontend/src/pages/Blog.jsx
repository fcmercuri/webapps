// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";

const firstArticle = {
  title: "Why Creating Buyer Personas Transforms Marketing Strategies for Expert Marketers",
  excerpt: "In the complex world of modern marketing, where consumer behaviors shift rapidly and competition intensifies daily, creating detailed buyer personas stands out as a foundational strategy that separates thriving campaigns from mediocre ones.",
  path: "/blog/why-buyer-personas-transform-marketing"
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  header: { backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)', borderBottom: '1px solid #e5e7eb' },
  headerContent: { maxWidth: '1152px', margin: '0 auto', padding: '0 16px', paddingTop: '24px', paddingBottom: '24px' },
  h1: { fontSize: '2.25rem', fontWeight: '800', color: '#111827', lineHeight: '1.25' },
  subtitle: { marginTop: '12px', fontSize: '1.25rem', color: '#4b5563' },
  section: { maxWidth: '1152px', margin: '0 auto', padding: '0 16px' },
  heroSection: { paddingTop: '80px', paddingBottom: '80px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' },
  lgGrid: { gridTemplateColumns: '1fr 1fr' },
  featuredBadge: { display: 'inline-block', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '0.875rem', fontWeight: '500', padding: '4px 12px', borderRadius: '9999px', marginBottom: '16px' },
  heroTitle: { fontSize: '2.25rem', fontWeight: '800', color: '#111827', marginBottom: '24px', lineHeight: '1.25' },
  mdHeroTitle: { fontSize: '3rem' },
  excerpt: { fontSize: '1.125rem', color: '#4b5563', marginBottom: '32px', lineHeight: '1.625' },
  ctaButton: { display: 'inline-flex', alignItems: 'center', padding: '12px 24px', background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', fontWeight: '500', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s' },
  ctaHover: { boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', transform: 'translateY(-2px)' },
  sidebar: { background: 'linear-gradient(to bottom right, rgba(168,85,247,0.2), rgba(59,130,246,0.2))', borderRadius: '16px', padding: '32px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
  sidebarIcon: { width: '96px', height: '96px', background: 'linear-gradient(to right, #3b82f6, #9333ea)', borderRadius: '9999px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  recentSection: { paddingTop: '80px', paddingBottom: '80px' },
  sectionTitle: { fontSize: '1.875rem', fontWeight: '800', color: '#111827', marginBottom: '16px', textAlign: 'center' },
  lgSectionTitle: { fontSize: '2.25rem' },
  sectionSubtitle: { fontSize: '1.25rem', color: '#4b5563', maxWidth: '672px', margin: '0 auto' },
  articlesGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginTop: '64px' },
  mdArticlesGrid: { gridTemplateColumns: '1fr 1fr' },
  lgArticlesGrid: { gridTemplateColumns: 'repeat(3, 1fr)' },
  articleCard: { backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', overflow: 'hidden', transition: 'all 0.3s' },
  cardHover: { boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', transform: 'translateY(-8px)' },
  cardContent: { padding: '32px' },
  latestBadge: { background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', fontSize: '0.75rem', fontWeight: '500', padding: '4px 12px', borderRadius: '9999px', marginBottom: '16px' },
  ctaSection: { background: 'linear-gradient(to right, #2563eb, #9333ea)', color: 'white', paddingTop: '80px', paddingBottom: '80px' },
  ctaContent: { maxWidth: '896px', margin: '0 auto', padding: '0 16px', textAlign: 'center' },
  ctaTitle: { fontSize: '1.875rem', fontWeight: '800', marginBottom: '24px' },
  lgCtaTitle: { fontSize: '2.25rem' },
  ctaSubtitle: { fontSize: '1.25rem', marginBottom: '32px', opacity: '0.9' },
  ctaButtons: { display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' },
  smCtaButtons: { flexDirection: 'row' }
};

export default function Blog() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.h1}>sAInthetic Blog</h1>
          <p style={styles.subtitle}>
            Insights on AI-generated personas, marketing strategies, and tools that resonate with your audience.
          </p>
        </div>
      </header>

      {/* Hero Featured Article */}
      <section style={{ ...styles.section, ...styles.heroSection }}>
        <div style={{ ...styles.grid, ...(window.innerWidth >= 1024 ? styles.lgGrid : {}) }}>
          <div>
            <span style={styles.featuredBadge}>Featured</span>
            <h2 
              style={{ 
                ...styles.heroTitle, 
                ...(window.innerWidth >= 768 ? styles.mdHeroTitle : {}) 
              }}
            >
              {firstArticle.title}
            </h2>
            <p style={styles.excerpt}>{firstArticle.excerpt}</p>
            <Link
              to={firstArticle.path}
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.ctaHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  ...styles.ctaButton,
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                  transform: 'none'
                });
              }}
            >
              Read the Article
              <svg style={{ width: '20px', height: '20px', marginLeft: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div style={styles.sidebar}>
            <div style={{ textAlign: 'center' }}>
              <div style={styles.sidebarIcon}>
                <svg style={{ width: '48px', height: '48px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>AI-Powered Personas</h3>
              <p style={{ color: '#4b5563', fontSize: '1rem' }}>Generated instantly for targeted marketing</p>
              <a 
                href="https://sainthetic.com/" 
                style={{ 
                  marginTop: '16px', 
                  display: 'inline-block', 
                  color: '#2563eb', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
              >
                Try sAInthetic →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Preview */}
      <section style={{ ...styles.section, ...styles.recentSection }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 
            style={{ 
              ...styles.sectionTitle, 
              ...(window.innerWidth >= 1024 ? styles.lgSectionTitle : {}) 
            }}
          >
            Recent Articles
          </h2>
          <p style={styles.sectionSubtitle}>
            Dive deeper into strategies that transform how you connect with customers.
          </p>
        </div>
        <div 
          style={{ 
            ...styles.articlesGrid, 
            ...(window.innerWidth >= 768 ? styles.mdArticlesGrid : {}),
            ...(window.innerWidth >= 1024 ? styles.lgArticlesGrid : {})
          }}
        >
          {/* Featured article card */}
          <article 
            style={styles.articleCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                ...styles.articleCard,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                transform: 'none'
              });
            }}
          >
            <div style={styles.cardContent}>
              <span style={styles.latestBadge}>Latest</span>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '800', 
                color: '#111827', 
                marginBottom: '16px',
                lineHeight: '1.25',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {firstArticle.title}
              </h3>
              <p style={{ 
                color: '#4b5563', 
                marginBottom: '24px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.625'
              }}>
                {firstArticle.excerpt}
              </p>
              <Link
                to={firstArticle.path}
                style={{ 
                  color: '#2563eb', 
                  fontWeight: '500', 
                  display: 'flex', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}
              >
                Read more
                <svg style={{ width: '16px', height: '16px', marginLeft: '4px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
          {/* Placeholder cards with pulse animation */}
          {[1, 2].map((i) => (
            <article key={i} style={styles.articleCard}>
              <div style={{ height: '192px', background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)', backgroundSize: '200% 100%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={styles.cardContent}>
                <span style={{ display: 'inline-block', backgroundColor: '#e5e7eb', height: '20px', width: '80px', borderRadius: '9999px', marginBottom: '16px', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '32px', backgroundColor: '#e5e7eb', borderRadius: '6px', marginBottom: '16px', animation: 'pulse 2s infinite' }} />
                <p style={{ height: '80px', backgroundColor: '#e5e7eb', borderRadius: '6px', marginBottom: '24px', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '24px', backgroundColor: '#e5e7eb', width: '96px', borderRadius: '6px', animation: 'pulse 2s infinite' }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 
            style={{ 
              ...styles.ctaTitle, 
              ...(window.innerWidth >= 1024 ? styles.lgCtaTitle : {}) 
            }}
          >
            Ready to create personas that convert?
          </h2>
          <p style={styles.ctaSubtitle}>
            Generate AI-powered buyer personas instantly with sAInthetic.
          </p>
          <div style={{ ...styles.ctaButtons, ...(window.innerWidth >= 640 ? styles.smCtaButtons : {}) }}>
            <a
              href="https://sainthetic.com/"
              style={{
                padding: '16px 32px',
                backgroundColor: 'white',
                color: '#2563eb',
                fontWeight: '700',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                fontSize: '1.125rem',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 35px 60px -12px rgba(0,0,0,0.3)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
                e.target.style.transform = 'none';
              }}
            >
              Get Started Free
            </a>
            <Link
              to={firstArticle.path}
              style={{
                padding: '16px 32px',
                border: '2px solid white',
                color: 'white',
                fontWeight: '700',
                borderRadius: '12px',
                fontSize: '1.125rem',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              Read First Article
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @media (min-width: 1024px) { .lg\:grid-cols-2 > * { grid-column: span 1 / span 1; } }
        @media (min-width: 768px) { .md\:grid-cols-2 > * { grid-column: span 1 / span 1; } }
      `}</style>
    </div>
  );
}

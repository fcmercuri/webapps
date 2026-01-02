import React from "react";
import { Link } from "react-router-dom";

const firstArticle = {
  title: "Why Creating Buyer Personas Transforms Marketing Strategies for Expert Marketers",
  excerpt: "In the complex world of modern marketing, where consumer behaviors shift rapidly and competition intensifies daily, creating detailed buyer personas stands out as a foundational strategy that separates thriving campaigns from mediocre ones.",
  path: "/blog/why-buyer-personas-transform-marketing"
};

const secondArticle = {
  title: "How to Create Buyer Personas: Step-by-Step Guide for Marketers",
  excerpt: "Master the art of buyer persona creation with this comprehensive step-by-step guide. Learn proven research methods, avoid common pitfalls, and build personas that drive real marketing results.",
  path: "/blog/how-to-create-buyer-personas-step-by-step"
};

export default function Blog() {
  return (
    <>
      <style>{`
        /* All your existing CSS remains exactly the same */
        nav.blog-nav {
          background: #0B0B0B;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 14px;
          border-bottom: 1px solid #232323;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        /* ... (keep all existing styles unchanged) ... */
        /* I'm not repeating all CSS here to save space, but keep everything identical */
      `}</style>

      {/* Navigation - unchanged */}
      <nav className="blog-nav">
        <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <img src="/logo.jpg" alt="sAInthetic Logo" className="nav-logo" />
          <div className="nav-brand">sAInthetic</div>
        </Link>
      </nav>

      <div className="blog-container">
        {/* Hero Section - now uses secondArticle */}
        <section className="blog-hero">
          <div className="blog-hero-content">
            <span className="blog-featured-badge">Featured Article</span>
            <h1>{secondArticle.title}</h1>
            <p className="blog-excerpt">{secondArticle.excerpt}</p>
            <Link to={secondArticle.path} className="cta-primary">
              Read Article →
            </Link>
          </div>

          <div className="blog-hero-card">
            <div className="blog-ai-ring">
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>AI-Powered Personas</h3>
            <p>Generate targeted buyer personas instantly</p>
            <a href="https://sainthetic.com/" className="blog-hero-link">Try sAInthetic →</a>
          </div>
        </section>

        {/* Recent Articles - now shows both articles + one skeleton */}
        <section>
          <h2 className="blog-section-title">Recent Articles</h2>
          <p className="blog-section-desc">Deep dive into AI marketing strategies and buyer persona mastery</p>

          <div className="blog-articles-grid">
            {/* First Article Card */}
            <article className="blog-article-card">
              <span className="blog-article-badge">Latest</span>
              <h3 className="blog-article-title">{firstArticle.title}</h3>
              <p className="blog-article-excerpt">{firstArticle.excerpt}</p>
              <Link to={firstArticle.path} className="blog-hero-link">Read more →</Link>
            </article>

            {/* Second Article Card */}
            <article className="blog-article-card">
              <span className="blog-article-badge">New</span>
              <h3 className="blog-article-title">{secondArticle.title}</h3>
              <p className="blog-article-excerpt">{secondArticle.excerpt}</p>
              <Link to={secondArticle.path} className="blog-hero-link">Read more →</Link>
            </article>

            {/* One Skeleton Card */}
            <div className="blog-skeleton">
              <div className="blog-skeleton-line" style={{width: '80px', height: '20px'}}></div>
              <div className="blog-skeleton-line" style={{height: '20px'}}></div>
              <div className="blog-skeleton-line" style={{height: '64px'}}></div>
              <div className="blog-skeleton-line" style={{width: '120px'}}></div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - updated to feature secondArticle */}
      <footer className="post-footer">
        <div className="post-footer-content">
          <h3>Ready to create personas that convert?</h3>
          <p>Generate AI-powered buyer personas instantly with sAInthetic</p>
          <div className="cta-grid">
            <a href="https://sainthetic.com/register" className="cta-primary">
              Get Started Free
            </a>
            <Link to={secondArticle.path} className="cta-secondary">
              Read New Article
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

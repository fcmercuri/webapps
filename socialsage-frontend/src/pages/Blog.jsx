import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const firstArticle = {
  title: "Why Creating Buyer Personas Transforms Marketing Strategies for Expert Marketers",
  excerpt:
    "In the complex world of modern marketing, where consumer behaviors shift rapidly and competition intensifies daily, creating detailed buyer personas stands out as a foundational strategy that separates thriving campaigns from mediocre ones.",
  path: "/blog/why-buyer-personas-transform-marketing",
};

const secondArticle = {
  title: "How AI Personas Supercharge Content Creation",
  excerpt:
    "Discover how AI-generated personas can help you ideate, structure, and scale content that feels hyper-personalized while saving hours every week.",
  path: "/blog/how-ai-personas-supercharge-content-creation",
};

const thirdArticle = {
  title: "From AI Personas to a Full Content Engine: How Expert Marketers Turn Insights into Revenue",
  excerpt: "Discover how to turn AI-generated buyer personas into a living content engine that powers your entire go-to-market motion, from LinkedIn posts to sales enablement.",
  path: "/blog/ai-personas-to-content-engine"
};

// ✅ NEW: Blog Hub SEO Meta
const blogMeta = {
  title: "sAInthetic Blog | AI Personas & Marketing Strategies for SaaS Growth",
  description: "Master buyer personas and AI content strategies. Learn how expert marketers use personas to 2X ROI, personalize at scale, and align sales teams.",
};

export default function Blog() {
  return (
    <>
      {/* ✅ HELMET SEO FOR BLOG HUB */}
      <Helmet>
        <title>{blogMeta.title}</title>
        <meta name="description" content={blogMeta.description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={blogMeta.title} />
        <meta property="og:description" content={blogMeta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sainthetic.com/blog" />
        <meta property="og:image" content="https://sainthetic.com/blog-hero.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogMeta.title} />
        <meta name="twitter:description" content={blogMeta.description} />
        <meta name="twitter:image" content="https://sainthetic.com/blog-hero.jpg" />
      </Helmet>

      <style>{`
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
.nav-left {
display: flex;
align-items: center;
gap: 14px;
}
.nav-logo {
width: 36px;
height: 36px;
background: linear-gradient(135deg, #ffd945, #34c759);
border-radius: 8px;
cursor: pointer;
transition: transform 0.2s ease;
}
.nav-logo:hover {
transform: scale(1.05);
}
.nav-brand {
font-size: 1.35rem;
font-weight: 700;
color: #fff;
letter-spacing: -0.5px;
cursor: pointer;
transition: color 0.2s ease;
}
.nav-brand:hover {
color: #ffd945;
}

.blog-container {
padding: 4rem 2rem;
max-width: 1200px;
margin: 0 auto;
min-height: calc(100vh - 100px);
}
.blog-hero {
display: grid;
grid-template-columns: 1fr 420px;
gap: 4rem;
align-items: start;
margin-bottom: 6rem;
}
.blog-hero-content h1 {
font-size: clamp(2.2rem, 5vw, 3.8rem);
font-weight: 800;
line-height: 1.1;
margin-bottom: 1.2rem;
background: linear-gradient(96deg, #fff 30%, #ffd945 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
}
.blog-hero-content .blog-excerpt {
font-size: 1.2rem;
color: #bdbdbd;
line-height: 1.7;
margin-bottom: 2.5rem;
max-width: 28rem;
}
.blog-featured-badge {
display: inline-flex;
background: #171717;
color: #ffd945;
font-weight: 700;
padding: 0.6rem 1.4rem;
border-radius: 25px;
font-size: 0.9rem;
margin-bottom: 1.5rem;
box-shadow: 0 4px 16px rgba(255,217,69,0.2);
}
.blog-hero-card {
background: linear-gradient(135deg, #151516 0%, #232835 100%);
border-radius: 1.25rem;
padding: 2.5rem 2rem;
box-shadow: 0 12px 56px rgba(0,0,0,0.4);
border: 1px solid #232323;
height: fit-content;
text-align: center;
}
.blog-ai-ring {
width: 80px;
height: 80px;
margin: 0 auto 1.5rem;
background: linear-gradient(135deg, #ffd945, #ff9f43);
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 0 32px rgba(255,217,69,0.4);
}
.blog-ai-ring svg {
width: 32px;
height: 32px;
stroke: #191919;
stroke-width: 2;
}
.blog-hero-card h3 {
font-size: 1.6rem;
font-weight: 800;
margin-bottom: 0.8rem;
color: #fff;
}
.blog-hero-card p {
color: #bdbdbd;
font-size: 1.05rem;
margin-bottom: 1.8rem;
}
.blog-hero-link {
color: #ffd945;
font-weight: 700;
font-size: 1.05rem;
text-decoration: none;
}
.blog-section-title {
font-size: clamp(2rem, 4vw, 3rem);
font-weight: 800;
text-align: center;
margin-bottom: 1rem;
background: linear-gradient(96deg, #fff 30%, #ffd945 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
}
.blog-section-desc {
font-size: 1.25rem;
color: #bdbdbd;
text-align: center;
max-width: 36rem;
margin: 0 auto 4rem;
}
.blog-articles-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
gap: 2rem;
}
.blog-article-card {
background: linear-gradient(135deg, #151516 0%, #232835 100%);
border-radius: 1.25rem;
padding: 2.5rem 2rem;
box-shadow: 0 12px 56px rgba(0,0,0,0.4);
border: 1px solid #232323;
height: 100%;
transition: all 0.3s ease;
}
.blog-article-card:hover {
transform: translateY(-8px);
box-shadow: 0 24px 72px rgba(0,0,0,0.5), 0 0 32px rgba(255,217,69,0.15);
border-color: rgba(255,217,69,0.3);
}
.blog-article-badge {
background: linear-gradient(135deg, #ffd945, #ff9f43);
color: #191919;
font-weight: 700;
padding: 0.5rem 1.2rem;
border-radius: 20px;
font-size: 0.85rem;
display: inline-block;
margin-bottom: 1.2rem;
box-shadow: 0 4px 16px rgba(255,217,69,0.3);
}
.blog-article-title {
font-size: 1.4rem;
font-weight: 800;
line-height: 1.3;
margin-bottom: 1.2rem;
color: #fff;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
.blog-article-excerpt {
color: #bdbdbd;
line-height: 1.6;
margin-bottom: 1.8rem;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
}

/* Footer */
.post-footer {
background: linear-gradient(135deg, #151516 0%, #232835 100%);
border-top: 1px solid #232323;
padding: 4rem 2rem;
margin-top: 4rem;
}
.post-footer-content {
max-width: 896px;
margin: 0 auto;
text-align: center;
}
.post-footer h3 {
font-size: clamp(1.75rem, 4vw, 2.25rem);
font-weight: 800;
color: #fff;
margin-bottom: 1rem;
}
.post-footer p {
color: #bdbdbd;
font-size: 1.2rem;
margin-bottom: 2.5rem;
max-width: 32rem;
margin-left: auto;
margin-right: auto;
}
.cta-grid {
display: grid;
grid-template-columns: 1fr;
gap: 1.5rem;
max-width: 500px;
margin: 0 auto;
}
@media (min-width: 640px) {
.cta-grid {
grid-template-columns: 1fr 1fr;
}
}
.cta-primary {
padding: 1.25rem 2.5rem;
background: linear-gradient(135deg, #ffd945, #ff9f43);
color: #191919 !important;
font-weight: 800;
border-radius: 12px;
text-decoration: none;
font-size: 1.15rem;
box-shadow: 0 12px 32px rgba(255,217,69,0.4);
transition: all 0.25s ease;
display: block;
text-align: center;
}
.cta-primary:hover {
background: linear-gradient(135deg, #ffe267, #ffb347);
transform: translateY(-2px);
box-shadow: 0 20px 40px rgba(255,217,69,0.5);
}
.cta-secondary {
padding: 1.25rem 2.5rem;
border: 2px solid #ffd945;
color: #ffd945;
font-weight: 700;
border-radius: 12px;
text-decoration: none;
font-size: 1.15rem;
transition: all 0.25s ease;
display: block;
text-align: center;
}
.cta-secondary:hover {
background: #ffd945;
color: #191919 !important;
transform: translateY(-2px);
}

.blog-skeleton {
background: linear-gradient(135deg, #151516 0%, #232835 100%);
border-radius: 1.25rem;
border: 1px solid #232323;
padding: 2.5rem 2rem;
box-shadow: 0 12px 56px rgba(0,0,0,0.4);
animation: pulse 2s infinite;
}
.blog-skeleton-line {
height: 16px;
background: linear-gradient(90deg, #232323 0%, #2a2a35 50%, #232323 100%);
border-radius: 8px;
margin-bottom: 1rem;
animation: shimmer 1.5s infinite;
}
.blog-skeleton-line:last-child {
width: 60%;
margin-bottom: 0;
}
@keyframes shimmer {
0% { background-position: -200% 0; }
100% { background-position: 200% 0; }
}
@keyframes pulse {
0%, 100% { opacity: 1; }
50% { opacity: 0.5; }
}
@media (max-width: 768px) {
.blog-container { padding: 2rem 1rem; }
.blog-hero { grid-template-columns: 1fr; gap: 2.5rem; }
.blog-articles-grid { grid-template-columns: 1fr; }
nav.blog-nav { padding: 1rem; }
.post-footer { padding: 2rem 1rem; }
}
@media (max-width: 600px) {
.cta-grid { grid-template-columns: 1fr; }
}
`}</style>

<nav className="blog-nav">
  <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px'}}>
    <img 
      src="/logo.jpg"  // Your logo file
      alt="sAInthetic" 
      className="nav-logo"
    />
    <div className="nav-brand">sAInthetic</div>
  </Link>
</nav>


      <div className="blog-container">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="blog-hero-content">
            <span className="blog-featured-badge">Featured Article</span>
            <h1>{firstArticle.title}</h1>
            <p className="blog-excerpt">{firstArticle.excerpt}</p>
            <Link to={firstArticle.path} className="cta-primary">
              Read Article →
            </Link>
          </div>

          <div className="blog-hero-card">
            <div className="blog-ai-ring">
              <svg fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3>AI-Powered Personas</h3>
            <p>Generate targeted buyer personas instantly</p>
            <a href="https://sainthetic.com/" className="blog-hero-link">
              Try sAInthetic →
            </a>
          </div>
        </section>

        {/* Recent Articles */}
        <section>
          <h2 className="blog-section-title">Recent Articles</h2>
          <p className="blog-section-desc">
            Deep dive into AI marketing strategies and buyer persona mastery
          </p>

          <div className="blog-articles-grid">
            {/* Featured Article Card */}
            <article className="blog-article-card">
              <span className="blog-article-badge">Latest</span>
              <h3 className="blog-article-title">{firstArticle.title}</h3>
              <p className="blog-article-excerpt">{firstArticle.excerpt}</p>
              <Link to={firstArticle.path} className="blog-hero-link">
                Read more →
              </Link>
            </article>

            {/* Second Article Card */}
            <article className="blog-article-card">
              <span className="blog-article-badge">New</span>
              <h3 className="blog-article-title">{secondArticle.title}</h3>
              <p className="blog-article-excerpt">{secondArticle.excerpt}</p>
              <Link to={secondArticle.path} className="blog-hero-link">
                Read more →
              </Link>
            </article>

             {/* Third Article Card */}
            <article className="blog-article-card">
              <span className="blog-article-badge">New</span>
              <h3 className="blog-article-title">{thirdArticle.title}</h3>
              <p className="blog-article-excerpt">{thirdArticle.excerpt}</p>
              <Link to={thirdArticle.path} className="blog-hero-link">
                Read more →
              </Link>
            </article>

            {/* Skeleton Cards */}
            <div className="blog-skeleton">
              <div
                className="blog-skeleton-line"
                style={{ width: "80px", height: "20px" }}
              ></div>
              <div
                className="blog-skeleton-line"
                style={{ height: "20px" }}
              ></div>
              <div
                className="blog-skeleton-line"
                style={{ height: "64px" }}
              ></div>
              <div
                className="blog-skeleton-line"
                style={{ width: "120px" }}
              ></div>
            </div>

            <div className="blog-skeleton">
              <div
                className="blog-skeleton-line"
                style={{ width: "80px", height: "20px" }}
              ></div>
              <div
                className="blog-skeleton-line"
                style={{ height: "20px" }}
              ></div>
              <div
                className="blog-skeleton-line"
                style={{ height: "64px" }}
              ></div>
              <div
                className="blog-skeleton-line"
                style={{ width: "120px" }}
              ></div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Footer */}
      <footer className="post-footer">
        <div className="post-footer-content">
          <h3>Ready to create personas that convert?</h3>
          <p>Generate AI-powered buyer personas instantly with sAInthetic</p>
          <div className="cta-grid">
            <a href="https://sainthetic.com/register" className="cta-primary">
              Get Started Free
            </a>
            <Link to={firstArticle.path} className="cta-secondary">
              Read First Article
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

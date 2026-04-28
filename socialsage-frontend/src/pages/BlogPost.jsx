import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SANITY_PROJECT_ID = "ziow5svx";
const SANITY_DATASET = "production";

function blocksToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block") {
        const tag = block.style === "h2" ? "h2"
          : block.style === "h3" ? "h3"
          : block.style === "h4" ? "h4"
          : block.style === "blockquote" ? "blockquote"
          : "p";
        const text = (block.children || [])
          .map((child) => {
            let t = child.text || "";
            if (child.marks?.includes("strong")) t = `<strong>${t}</strong>`;
            if (child.marks?.includes("em")) t = `<em>${t}</em>`;
            if (child.marks?.includes("code")) t = `<code>${t}</code>`;
            return t;
          })
          .join("");
        return `<${tag}>${text}</${tag}>`;
      }
      return "";
    })
    .join("\n");
}

function wrapTables(html) {
  return html.replace(/<table/g, '<div class="table-wrapper"><table').replace(/<\/table>/g, '</table></div>');
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Canonical is always derived from slug — available immediately, before fetch
  const canonicalUrl = `https://sainthetic.com/blog/${slug}`;

  useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "post" && slug.current == "${slug}"][0]{ _id, title, slug, excerpt, content, contentHtml, publishedAt, author, readTime, metaTitle, metaDescription }`
    );
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setPost(data.result);
        } else {
          setError("Post not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post.");
        setLoading(false);
      });
  }, [slug]);

  const clean = (val) => (typeof val === "string" && val.startsWith("=") ? val.slice(1) : val ?? "");

  const rawHtml = post?.contentHtml ? clean(post.contentHtml) : post?.content ? blocksToHtml(post.content) : "";
  const htmlContent = wrapTables(rawHtml);

  // Resolved meta values — fall back to slug-based defaults so Helmet always has something unique
  const metaTitle = post?.metaTitle || post?.title || `sAInthetic Blog | ${slug}`;
  const metaDescription = post?.metaDescription || post?.excerpt || "AI-powered buyer personas and marketing strategies for SaaS growth.";

  return (
    <>
      {/*
        IMPORTANT SEO FIX:
        Helmet is rendered unconditionally so Googlebot always sees the canonical,
        title, and meta description — even before the Sanity fetch completes.
        The canonical is derived from `slug` (from useParams) which is available
        immediately, guaranteeing each page gets its own unique canonical URL.
      */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

      <style>{`
nav.blog-nav {
background: #0B0B0B;
padding: 1rem 2rem;
display: flex;
align-items: center;
gap: 14px;
border-bottom: 1px solid #232323;
position: sticky;
top: 0;
z-index: 100;
}
.nav-logo { width: 36px; height: 36px; border-radius: 8px; }
.nav-brand { font-size: 1.35rem; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
.nav-brand:hover { color: #ffd945; }
.post-container {
max-width: 800px;
margin: 0 auto;
padding: 4rem 2rem;
}
.post-back {
color: #ffd945;
text-decoration: none;
font-weight: 600;
font-size: 0.95rem;
display: inline-flex;
align-items: center;
gap: 6px;
margin-bottom: 2.5rem;
opacity: 0.8;
transition: opacity 0.2s;
}
.post-back:hover { opacity: 1; }
.post-header { margin-bottom: 3rem; }
.post-badge {
background: linear-gradient(135deg, #ffd945, #ff9f43);
color: #191919;
font-weight: 700;
padding: 0.4rem 1rem;
border-radius: 20px;
font-size: 0.85rem;
display: inline-block;
margin-bottom: 1.2rem;
}
.post-title {
font-size: clamp(2rem, 5vw, 3rem);
font-weight: 800;
line-height: 1.15;
margin-bottom: 1.5rem;
background: linear-gradient(96deg, #fff 30%, #ffd945 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
}
.post-meta {
display: flex;
gap: 1.5rem;
color: #888;
font-size: 0.95rem;
flex-wrap: wrap;
}
.post-divider {
height: 1px;
background: linear-gradient(90deg, #ffd945, transparent);
margin: 2.5rem 0;
}
.post-body {
color: #d0d0d0;
font-size: 1.1rem;
line-height: 1.85;
}
.post-body h2 {
font-size: 1.8rem;
font-weight: 800;
color: #fff;
margin: 2.5rem 0 1rem;
}
.post-body h3 {
font-size: 1.4rem;
font-weight: 700;
color: #fff;
margin: 2rem 0 0.8rem;
}
.post-body h4 {
font-size: 1.15rem;
font-weight: 700;
color: #ffd945;
margin: 1.5rem 0 0.5rem;
}
.post-body p { margin-bottom: 1.5rem; }
.post-body strong { color: #fff; font-weight: 700; }
.post-body em { color: #ffd945; font-style: italic; }
.post-body code {
background: #1a1a2e;
color: #ffd945;
padding: 0.2rem 0.5rem;
border-radius: 4px;
font-size: 0.9em;
}
.post-body blockquote {
border-left: 4px solid #ffd945;
padding: 1rem 1.5rem;
margin: 2rem 0;
background: rgba(255,217,69,0.05);
border-radius: 0 8px 8px 0;
color: #bdbdbd;
font-style: italic;
}
.post-body ul, .post-body ol {
margin: 1rem 0 1.5rem 1.5rem;
}
.post-body li { margin-bottom: 0.5rem; }
.post-body a {
color: #ffd945;
text-decoration: underline;
text-decoration-color: rgba(255,217,69,0.4);
text-underline-offset: 3px;
transition: text-decoration-color 0.2s;
}
.post-body a:hover { text-decoration-color: #ffd945; }
.table-wrapper {
overflow-x: auto;
-webkit-overflow-scrolling: touch;
margin: 2rem 0;
border-radius: 10px;
border: 1px solid #2a2a2a;
}
.post-body table {
width: 100%;
border-collapse: collapse;
font-size: 0.95rem;
min-width: 500px;
}
.post-body .table-wrapper table { margin: 0; }
.post-body th {
background: linear-gradient(135deg, #ffd945, #ff9f43);
color: #191919;
font-weight: 700;
padding: 0.85rem 1rem;
text-align: left;
white-space: nowrap;
}
.post-body td {
padding: 0.75rem 1rem;
border-bottom: 1px solid #232323;
color: #d0d0d0;
vertical-align: top;
}
.post-body tr:last-child td { border-bottom: none; }
.post-body tr:nth-child(even) td { background: rgba(255,255,255,0.03); }
.post-body tr:hover td { background: rgba(255,217,69,0.05); transition: background 0.2s; }
.post-footer {
background: linear-gradient(135deg, #151516 0%, #232835 100%);
border-top: 1px solid #232323;
padding: 4rem 2rem;
margin-top: 4rem;
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
}
.cta-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1.5rem;
max-width: 500px;
margin: 0 auto;
}
.cta-primary {
padding: 1.25rem 2.5rem;
background: linear-gradient(135deg, #ffd945, #ff9f43);
color: #191919 !important;
font-weight: 800;
border-radius: 12px;
text-decoration: none;
font-size: 1.15rem;
display: block;
text-align: center;
transition: all 0.25s ease;
}
.cta-primary:hover { transform: translateY(-2px); }
.cta-secondary {
padding: 1.25rem 2.5rem;
border: 2px solid #ffd945;
color: #ffd945;
font-weight: 700;
border-radius: 12px;
text-decoration: none;
font-size: 1.15rem;
display: block;
text-align: center;
transition: all 0.25s ease;
}
.cta-secondary:hover { background: #ffd945; color: #191919 !important; }
.skeleton-block {
background: linear-gradient(135deg, #151516, #232835);
border-radius: 8px;
margin-bottom: 1rem;
animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.error-msg { color: #ff6b6b; text-align: center; padding: 4rem 2rem; font-size: 1.2rem; }
@media (max-width: 768px) {
.post-container { padding: 2rem 1rem; }
.cta-grid { grid-template-columns: 1fr; }
nav.blog-nav { padding: 1rem; }
.post-body table { font-size: 0.82rem; }
.post-body th, .post-body td { padding: 0.6rem 0.75rem; }
}
      `}</style>

      <nav className="blog-nav">
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "14px" }}>
          <img src="/logo.jpg" alt="sAInthetic" className="nav-logo" />
          <div className="nav-brand">sAInthetic</div>
        </Link>
      </nav>

      <div className="post-container">
        <Link to="/blog" className="post-back">← Back to Blog</Link>

        {loading && (
          <>
            <div className="skeleton-block" style={{ height: "24px", width: "80px" }} />
            <div className="skeleton-block" style={{ height: "60px", marginTop: "1rem" }} />
            <div className="skeleton-block" style={{ height: "20px", width: "200px" }} />
            <div className="skeleton-block" style={{ height: "400px", marginTop: "2rem" }} />
          </>
        )}

        {error && <p className="error-msg">{error}</p>}

        {post && (
          <>
            <header className="post-header">
              <span className="post-badge">Article</span>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                {post.publishedAt && <span>📅 {new Date(clean(post.publishedAt)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>}
                {post.author && <span>✍️ {clean(post.author)}</span>}
                {post.readTime && <span>⏱ {clean(post.readTime)}</span>}
              </div>
            </header>

            <div className="post-divider" />

            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </>
        )}
      </div>

      <footer className="post-footer">
        <div>
          <h3>Ready to create personas that convert?</h3>
          <p>Generate AI-powered buyer personas instantly with sAInthetic</p>
          <div className="cta-grid">
            <a href="https://sainthetic.com/register" className="cta-primary">Get Started Free</a>
            <Link to="/blog" className="cta-secondary">More Articles</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';
import PersonaTryDemo from "../components/PersonaTryDemo";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const personaCaption = "Build a buyer persona set that feels like your real customers.";
  const [typedPersonaCaption, setTypedPersonaCaption] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedPersonaCaption(personaCaption);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTypedPersonaCaption(personaCaption.slice(0, i));
      if (i >= personaCaption.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  async function handleUpgrade(priceId) {
    if (!user?.email) {
      localStorage.setItem('upgradePriceId', priceId);
      navigate('/register');
      return;
    }
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, customerEmail: user.email }),
    });
    const { url } = await res.json();
    window.location = url;
  }

  // --- Cookie Consent Banner ---
  function USCookieConsent() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      try {
        const dismissed = localStorage.getItem("us_cookie_consent_dismissed");
        if (!dismissed) setVisible(true);
      } catch (e) { setVisible(true); }
    }, []);
    const dismiss = () => {
      try { localStorage.setItem("us_cookie_consent_dismissed", "true"); } catch (e) {}
      setVisible(false);
    };
    if (!visible) return null;
    return (
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a1a2e", borderTop: "1px solid #333", padding: "1rem 1.5rem", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span style={{ color: "#aaa", fontSize: "0.82rem" }}>We use cookies to improve your experience. By using this site you consent to our use of cookies.</span>
        <button onClick={dismiss} style={{ background: "#ffd945", color: "#000", border: "none", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>Got it</button>
      </div>
    );
  }

  const cards = [
    {
      title: "AI Persona Builder",
      desc: "Create customer avatars, generate AI bios, lead score, and unlock segments with a click",
      expandedContent: [
        "✓ Generate detailed customer personas per industry instantly",
        "✓ AI-powered demographics, psychographics, goals, and pain points",
        "✓ Premium personas with advanced behavioral insights",
        "✓ Export personas to CSV or integrate with your CRM",
        "✓ Customizable persona templates for any niche"
      ]
    },
    {
      title: "Topic Prompts Generator",
      desc: "Get trending content ideas based on synthetic queries and LLM prompts",
      expandedContent: [
        "✓ Real-time trending topics from AI search queries",
        "✓ Discover what your customers are asking ChatGPT & Perplexity",
        "✓ Synthetic persona queries reveal hidden demand",
        "✓ Turn insights into viral content angles",
        "✓ Track topic performance and engagement metrics"
      ]
    },
    {
      title: "Instant Content Briefs",
      desc: "AI-powered copy and post outlines tailored to your niche and always fresh",
      expandedContent: [
        "✓ Generate 1,000-1,500 word conversion-ready copy in seconds",
        "✓ SEO blog posts, social captions, email sequences, FAQs, and schema markup",
        "✓ Content personalized to each persona's needs",
        "✓ One-click regeneration with different angles",
        "✓ Save, edit, and export to your favorite tools"
      ]
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(1);
  

  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const personaTitleRef = useRef(null);
  const personaTitleInView = useInView(personaTitleRef, { once: true, margin: "-40px" });
  const caseMetricsRef = useRef(null);
  const caseMetricsInView = useInView(caseMetricsRef, { once: true, margin: "-80px" });
  const [caseMetricCounts, setCaseMetricCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!caseMetricsInView) return undefined;
    const targets = [3, 68, 41, 5];
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      setCaseMetricCounts(targets);
      return undefined;
    }
    let frame;
    const duration = 1600;
    let startTime;
    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCaseMetricCounts(targets.map((target) => Math.round(target * eased)));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [caseMetricsInView]);

  const step1InView = useInView(step1Ref, { once: false, margin: "-100px" });
  const step2InView = useInView(step2Ref, { once: false, margin: "-100px" });
  const step3InView = useInView(step3Ref, { once: false, margin: "-100px" });
  const step4InView = useInView(step4Ref, { once: false, margin: "-100px" });

  const faqItems = [
    {
      question: "What are persona-driven AI prompts?",
      answer: "Persona-driven AI prompts are LLM prompts built around a specific customer persona's goals, pain points, and intent. Instead of using generic prompts, persona-driven prompts guide AI tools to produce content that matches how a real audience thinks, searches, and decides."
    },
    {
      question: "How is this different from a regular AI prompt generator?",
      answer: "Most AI prompt generators create one-off or generic prompts. sAInthetic connects AI-generated customer personas to reusable prompt libraries, so every prompt stays consistent with your target audience and brand voice."
    },
    {
      question: "How does sAInthetic generate customer personas?",
      answer: (<>sAInthetic uses AI to synthesize personas based on:<br /><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Industry context</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Role-specific goals and pain points</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Common customer behaviors and intent patterns</span></>)
    },
    {
      question: "Are these personas based on real customer data?",
      answer: "The personas are synthetic, meaning they are generated using AI models trained on broad patterns rather than individual user data. This allows you to explore realistic audience behavior without collecting or storing personal data."
    },
    {
      question: "Can I use sAInthetic with ChatGPT or other LLMs?",
      answer: "Yes. sAInthetic generates ready-to-use prompts that work with popular LLMs like ChatGPT and similar AI tools. You can copy prompts directly or adapt them to your existing AI workflows."
    },
    {
      question: "Who is sAInthetic built for?",
      answer: (<>sAInthetic is made for:<br /><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; SaaS founders</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Marketing teams</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Content strategists</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Product marketers</span></>)
    },
    {
      question: "Is there a free plan available?",
      answer: (<>Yes. The free plan lets you:<br /><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Generate 1 AI persona</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Access a limited set of prompts and content ideas</span><br /><span style={{ color: "#ffd945", fontWeight: 600 }}>&bull; Test persona-driven prompt workflows</span></>)
    },
    {
      question: "Is my data safe?",
      answer: "Yes. sAInthetic does not require sensitive customer data to generate personas or prompts. Any inputs you provide are used only to improve your experience and are not shared."
    },
    {
      question: "We already know our ICP. Do we still need sAInthetic?",
      answer: "Knowing your ICP is a useful starting point. sAInthetic helps you go further by uncovering the specific questions your buyers ask tools like ChatGPT and Perplexity. These questions reveal content gaps your competitors may have missed and give your team clearer ideas for what to create next."
    },
    {
      question: "Will AI-generated content sound generic?",
      answer: "Not with sAInthetic. Content ideas are informed by each persona's goals, pain points and search questions, rather than a generic prompt. This gives your writers a clear audience and purpose to work from, while leaving them in control of the final content."
    },
    {
      question: "We already have writers. How does sAInthetic fit into our workflow?",
      answer: "sAInthetic makes your writers faster and more strategic, not redundant. Instead of spending hours researching what to write, your team gets a ready-made brief: the persona, the questions they ask, and the angle that converts. Writers focus on craft; sAInthetic handles the intelligence layer."
    }
  ];

  return (
    <div id="sainthetic-home" style={{ minHeight: "100vh", minWidth: "100vw", margin: 0, padding: 0, background: "#fff", display: "flex", flexDirection: "column" }}>
      <NavigationBar />

      <style>{`
        /* Compact, aligned hero CTAs: never stack on tablet/desktop. */
        #sainthetic-home .reference-actions {
          display:flex !important; flex-flow:row nowrap !important; align-items:center !important;
          gap:10px !important; width:100% !important; max-width:100% !important;
        }
        #sainthetic-home .reference-actions a.reference-primary {
          box-sizing:border-box !important; display:inline-flex !important; flex:1 1 0 !important;
          align-items:center !important; justify-content:space-between !important; gap:8px !important;
          width:auto !important; min-width:0 !important; min-height:64px !important;
          padding:0 16px !important; border:1px solid #191a26 !important; border-radius:16px !important;
          background:#191a26 !important; color:#fff !important; box-shadow:0 10px 24px rgba(20,22,34,.12) !important;
          font-size:clamp(13px,1.55vw,19px) !important; font-weight:800 !important;
          line-height:1.12 !important; letter-spacing:-.025em !important; text-align:left !important;
          white-space:normal !important; text-decoration:none !important;
        }
        #sainthetic-home .reference-actions a.reference-primary span {
          flex:0 0 auto !important; color:#fff !important; font-size:30px !important;
          font-weight:500 !important; line-height:1 !important; margin-left:auto !important;
        }
        #sainthetic-home .reference-actions a.reference-secondary {
          box-sizing:border-box !important; display:inline-flex !important; flex:0 0 180px !important;
          align-items:center !important; justify-content:center !important; gap:12px !important;
          width:180px !important; min-width:0 !important; min-height:64px !important;
          padding:0 14px !important; border:2px solid #1b263f !important; border-radius:999px !important;
          background:#fff !important; color:#111a30 !important; box-shadow:none !important;
          font-size:clamp(14px,1.55vw,19px) !important; font-weight:750 !important;
          line-height:1 !important; letter-spacing:-.02em !important; text-decoration:none !important;
        }
        #sainthetic-home .reference-actions a.reference-secondary .play-icon {
          position:relative !important; display:inline-block !important; flex:0 0 18px !important;
          width:18px !important; height:20px !important; padding:0 !important;
          overflow:visible !important; font-size:0 !important; line-height:0 !important;
        }
        #sainthetic-home .reference-actions a.reference-secondary .play-icon::before {
          content:"" !important; position:absolute !important; left:1px !important; top:1px !important;
          width:0 !important; height:0 !important; border-top:9px solid transparent !important;
          border-bottom:9px solid transparent !important; border-left:17px solid #111a30 !important;
        }
        #sainthetic-home .reference-actions a.reference-secondary .play-icon::after {
          content:"" !important; position:absolute !important; left:2px !important; top:5px !important;
          width:0 !important; height:0 !important; border-top:5px solid transparent !important;
          border-bottom:5px solid transparent !important; border-left:10px solid #fff !important;
        }
        #sainthetic-home .reference-actions a.reference-primary:hover { background:#252735 !important; transform:translateY(-2px) !important; }
        #sainthetic-home .reference-actions a.reference-secondary:hover { background:#f8f9fc !important; transform:translateY(-2px) !important; }
        /* Use the uploaded high-resolution community portrait strip. */
        #sainthetic-home#sainthetic-home .growth-avatars span {
          background-image:url('/community-avatars-clean.webp?v=20261102') !important;
          background-repeat:no-repeat !important;
          /* Zoom into each portrait so the decorative halo baked into the source is cropped out. */
          background-size:500% 130% !important;
          background-position-y:50% !important;
        }
        #sainthetic-home#sainthetic-home .growth-avatars span:nth-child(1) { background-position-x:3.125% !important; }
        #sainthetic-home#sainthetic-home .growth-avatars span:nth-child(2) { background-position-x:34.375% !important; }
        #sainthetic-home#sainthetic-home .growth-avatars span:nth-child(3) { background-position-x:65.625% !important; }
        #sainthetic-home#sainthetic-home .growth-avatars span:nth-child(4) { background-position-x:96.875% !important; }
        #sainthetic-home#sainthetic-home .growth-avatars img { display:none !important; }
        /* Keep visible breathing room between the feature row and community bar. */
        #sainthetic-home#sainthetic-home .reference-features {
          padding-bottom:24px !important;
          margin-bottom:24px !important;
        }
        /* Clean white FAQ cards. Remove the old grey gradient treatment. */
        #sainthetic-home#sainthetic-home #faq > div > div > div {
          background:#fff !important; background-image:none !important; border:1px solid #e4e9f0 !important;
          border-radius:16px !important; box-shadow:0 5px 18px rgba(31,42,68,.045) !important;
        }
        #sainthetic-home#sainthetic-home #faq button { background:transparent !important; color:#172033 !important; }
        #sainthetic-home#sainthetic-home #faq p { color:#526079 !important; }
        @media (max-width:560px) {
          #sainthetic-home .reference-actions { flex-direction:column !important; align-items:stretch !important; }
          #sainthetic-home .reference-actions a.reference-primary,
          #sainthetic-home .reference-actions a.reference-secondary { width:100% !important; flex:1 1 auto !important; }
        }
      `}</style>

      <style>{`
        /* sAInthetic white editorial redesign for the homepage. */
        #sainthetic-home {
          background: #ffffff !important;
          color: #171b2b !important;
          min-height: 100vh;
          overflow: hidden;
        }
        #sainthetic-home > div {
          background: #ffffff !important;
          color: #171b2b !important;
        }
        #sainthetic-home > div > div[style*="position: fixed"] { display: none !important; }
        #sainthetic-home nav.main-nav {
          position: sticky !important;
          top: 0;
          z-index: 100;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 20px;
          padding: 18px clamp(20px, 5vw, 64px) !important;
          background: rgba(255,255,255,.94) !important;
          border: 0 !important;
          border-bottom: 1px solid #edf0f5 !important;
          box-shadow: 0 8px 30px rgba(22,30,55,.035);
          backdrop-filter: blur(16px);
        }
        #sainthetic-home .nav-left { justify-content: flex-start !important; margin: 0 !important; gap: 12px; }
        #sainthetic-home .nav-logo { width: 42px !important; height: 42px !important; border-radius: 12px !important; }
        #sainthetic-home .nav-brand { color: #171b2b !important; font-size: 1.5rem !important; font-weight: 800 !important; }
        #sainthetic-home .nav-spacer { display: block !important; }
        #sainthetic-home .nav-right { flex-direction: row; align-items: center; gap: 10px !important; width: auto; }
        #sainthetic-home .nav-right a,
        #sainthetic-home .desktop-nav .nav-link {
          color: #3f4658 !important;
          font-size: .96rem !important;
          font-weight: 650 !important;
          padding: 11px 13px !important;
          text-decoration: none;
          border-radius: 999px !important;
        }
        #sainthetic-home .nav-right a:hover { background: #fff8dc !important; color: #171b2b !important; }
        #sainthetic-home .nav-right a.cta {
          color: #fff !important;
          background: #171b2b !important;
          padding: 13px 22px !important;
          border-radius: 999px !important;
          box-shadow: none !important;        }
        #sainthetic-home .nav-right a.cta:hover { background: #30384d !important; }
        #sainthetic-home .sainthetic-menu-toggle { display: none; }
        #sainthetic-home header#hero {
          max-width: 1080px !important;
          padding: clamp(54px, 8vw, 100px) 24px 36px !important;
        }
        #sainthetic-home header#hero > div:first-child {
          background: #fff8df !important;
          color: #22283a !important;
          border: 1px solid #ffe69a !important;
          border-radius: 999px !important;
          padding: 10px 22px !important;
          box-shadow: 0 5px 0 rgba(255,217,69,.12);
          font-size: .95rem !important;
        }
        #sainthetic-home #hero h1 {
          color: #171b2b !important;
          background: none !important;
          -webkit-text-fill-color: #171b2b !important;
          font-size: clamp(2.8rem, 6.5vw, 5.2rem) !important;
          line-height: 1.02 !important;
          letter-spacing: -.065em !important;
          max-width: 950px;
          margin: 24px auto 22px !important;
        }
        #sainthetic-home #hero h1 span {
          color: #171b2b !important;
          -webkit-text-fill-color: #171b2b !important;
          background: linear-gradient(transparent 64%, #ffedaa 64%) !important;
        }
        #sainthetic-home #hero > p {
          color: #555d70 !important;
          font-size: clamp(1.05rem, 2vw, 1.3rem) !important;
          line-height: 1.7 !important;
          max-width: 720px !important;
        }
        #sainthetic-home #hero a[href="/register"] {
          color: #171b2b !important;
          background: linear-gradient(110deg, #ffdf62, #ffc84d) !important;
          border: 1px solid #ffd34e !important;
          border-radius: 20px !important;
          box-shadow: 0 12px 28px rgba(255,197,55,.22) !important;
          padding: 19px 30px !important;
          font-size: 1.12rem !important;
        }
        #sainthetic-home #hero a[href="/register"]:hover { transform: translateY(-2px); }
        #sainthetic-home #hero p[style*="color"] { color: #70788b !important; }
        #sainthetic-home .hero-trust-strip { gap: 16px 26px !important; margin-top: 28px !important; }
        #sainthetic-home .hero-trust-strip > div { color: #657087 !important; }
        #sainthetic-home header#hero > div[style*="radial-gradient"] {
          background: #ffffff !important;
          border: 1px solid #e9edf3 !important;
          border-radius: 24px !important;
          box-shadow: 0 24px 70px rgba(31,42,68,.10) !important;
          color: #171b2b !important;
          padding: 26px !important;
        }
        #sainthetic-home header#hero > div[style*="radial-gradient"] [style*="rgba(255,255,255,0.04)"] {
          background: #f5f7fb !important;
        }
        #sainthetic-home header#hero > div[style*="radial-gradient"] [style*="color"] { color: #465066 !important; }
        #sainthetic-home #features { gap: 18px !important; margin-top: 5rem !important; }
        #sainthetic-home .feature-card {
          background: #ffffff !important;
          color: #171b2b !important;
          border: 1px solid #e9edf3 !important;
          border-radius: 22px !important;
          box-shadow: 0 12px 36px rgba(31,42,68,.07) !important;
          padding: 30px 24px !important;
        }
        #sainthetic-home .feature-card h3 { color: #171b2b !important; }
        #sainthetic-home .feature-card p,
        #sainthetic-home .feature-card li { color: #586176 !important; }
        #sainthetic-home section { scroll-margin-top: 100px; }
        #sainthetic-home section h2,
        #sainthetic-home section h3,
        #sainthetic-home section h4 { color: #171b2b !important; }
        #sainthetic-home section p { color: #586176 !important; }
        #sainthetic-home .how-step-wrapper { gap: 3.5rem !important; margin-bottom: 6rem !important; }
        #sainthetic-home .step-image {
          border: 1px solid #e7ebf2 !important;
          box-shadow: 0 18px 45px rgba(31,42,68,.10) !important;
          border-radius: 22px !important;
          background: #fff !important;
        }
        #sainthetic-home .step-text h3 { color: #171b2b !important; }
        #sainthetic-home .step-text p { color: #586176 !important; }
        #sainthetic-home section > div[style*="linear-gradient(135deg,#13131f"],
        #sainthetic-home section > div[style*="linear-gradient(135deg, #13131f"] {
          background: #fff !important;
          border: 1px solid #e8ecf2 !important;
          box-shadow: 0 18px 55px rgba(31,42,68,.08) !important;
        }
        #sainthetic-home .cs-metric-cell { border-color: #e8ecf2 !important; }
        #sainthetic-home .cs-metric-cell div[style*="color:"] { color: #343d53 !important; }
        #sainthetic-home #pricing > div[style*="linear-gradient"] {
          background: #fff8df !important;
          color: #3c455b !important;
          border-color: #ffe69a !important;
        }
        #sainthetic-home #pricing > div[style*="display: flex"] > div {
          background: #fff !important;
          color: #171b2b !important;
          border: 1px solid #e6eaf1 !important;
          border-radius: 22px !important;
          box-shadow: 0 14px 40px rgba(31,42,68,.07) !important;
        }
        #sainthetic-home #pricing h3 { color: #171b2b !important; }
        #sainthetic-home #pricing ul { color: #586176 !important; }
        #sainthetic-home #pricing ul li { color: #586176 !important; }
        #sainthetic-home #pricing button,
        #sainthetic-home #pricing a[href="/register"] {
          color: #171b2b !important;
          background: #ffdc60 !important;
          border: 0 !important;
          border-radius: 12px !important;
        }
        #sainthetic-home #pricing > p { color: #697287 !important; }
        #sainthetic-home section[style*="max-width: 1000px"][style*="borderRadius"] {
          background: #fff !important;
          border: 1px solid #e8ecf2 !important;
          box-shadow: 0 16px 50px rgba(31,42,68,.07) !important;
        }
        #sainthetic-home section[style*="max-width: 1000px"] > div > div[style*="rgba(23,22,29"] {
          background: #f7f8fb !important;
          border: 1px solid #edf0f5 !important;
        }
        #sainthetic-home #case-study > div[style*="linear-gradient(135deg,#13131f"] {
          background: #fff !important;
          border: 1px solid #e8ecf2 !important;
          box-shadow: 0 18px 55px rgba(31,42,68,.08) !important;
        }
        #sainthetic-home #case-study [style*="rgba(255,255,255,0.06)"] { border-color: #e9edf3 !important; }
        #sainthetic-home #case-study [style*="color:"] { color: #4c566c !important; }
        #sainthetic-home #case-study h2,
        #sainthetic-home #case-study h3,
        #sainthetic-home #case-study h4 { color: #171b2b !important; }
        #sainthetic-home #case-study a { color: #171b2b !important; }
        #sainthetic-home #faq > div > div > div {
          background: #fff !important;
          border: 1px solid #e8ecf2 !important;
          box-shadow: 0 8px 24px rgba(31,42,68,.04);
        }
        #sainthetic-home #faq button { color: #171b2b !important; background: #fff !important; }
        #sainthetic-home #faq p { color: #586176 !important; }
        #sainthetic-home footer {
          background: transparent !important;
          color: #657087 !important;
          border-color: #e8ecf2 !important;
        }
        #sainthetic-home footer div { color: #657087 !important; }
        #sainthetic-home button { color: #171b2b; }
        #sainthetic-home [style*="background: rgba(255,255,255"] { background: #f5f7fb !important; }
        #sainthetic-home [style*="background: rgba(24,24,36"],
        #sainthetic-home [style*="background: linear-gradient(135deg,rgba(24,24,36"] {
          background: #fff !important;
          border-color: #e8ecf2 !important;
        }

        #sainthetic-home .persona-try-demo {
          background: #ffffff !important;
          color: #171b2b !important;
          border: 1px solid #e8ecf2 !important;
          box-shadow: 0 18px 55px rgba(31,42,68,.07);
          padding: clamp(22px, 4vw, 42px) !important;
        }
        #sainthetic-home .persona-try-demo h2,
        #sainthetic-home .persona-try-demo h3 { color: #171b2b !important; }
        #sainthetic-home .persona-try-demo p,
        #sainthetic-home .persona-try-demo li { color: #586176 !important; }
        #sainthetic-home .persona-try-demo input,
        #sainthetic-home .persona-try-demo select {
          background: #f7f8fb !important;
          color: #171b2b !important;
          border: 1px solid #e1e6ef !important;
        }
        #sainthetic-home .persona-try-demo input::placeholder { color: #9299a8 !important; }
        #sainthetic-home .persona-try-demo > button,
        #sainthetic-home .persona-try-demo button {
          background: #ffdc60 !important;
          color: #171b2b !important;
          border-radius: 12px !important;
          box-shadow: none !important;
        }
        #sainthetic-home .persona-try-demo > div[style*="rgba(255,255,255"] {
          background: #f7f8fb !important;
          border-color: #e4e8ef !important;
        }
        @media (max-width: 800px) {
          #sainthetic-home nav.main-nav { padding: 14px 20px !important; flex-direction: row !important; }
          #sainthetic-home .nav-left { justify-content: flex-start !important; margin: 0 !important; }
          #sainthetic-home .nav-spacer { display: block !important; }
          #sainthetic-home .sainthetic-menu-toggle {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            padding: 0 !important;            margin: 0 !important;
            border: 1px solid #e4e8ef !important;
            border-radius: 50% !important;
            background: #fff !important;
            color: #171b2b !important;
            box-shadow: none !important;
          }
          #sainthetic-home .mobile-dropdown {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            background: #fff !important;
            border: 1px solid #edf0f5 !important;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 18px 30px rgba(31,42,68,.08);
            padding: 14px 20px 20px !important;
          }
          #sainthetic-home .mobile-dropdown a { color: #30384d !important; background: transparent !important; }
          #sainthetic-home .mobile-dropdown a.cta { color: #fff !important; background: #171b2b !important; }
          #sainthetic-home header#hero { padding: 48px 20px 24px !important; }
          #sainthetic-home #hero h1 { font-size: clamp(2.45rem, 10vw, 3.7rem) !important; line-height: 1.04 !important; }
          #sainthetic-home #hero a[href="/register"] { width: 100%; box-sizing: border-box; padding: 18px 16px !important; }
          #sainthetic-home .hero-trust-strip { gap: 12px 18px !important; }
          #sainthetic-home header#hero > div[style*="radial-gradient"] { padding: 20px !important; }
          #sainthetic-home #features { margin-top: 3rem !important; padding: 0 18px !important; }
          #sainthetic-home .feature-card { min-width: 0 !important; max-width: none !important; flex-basis: 100% !important; }
          #sainthetic-home section { margin-top: 4.5rem !important; padding-left: 18px !important; padding-right: 18px !important; }
          #sainthetic-home .how-step-wrapper { display: flex !important; flex-direction: column !important; gap: 20px !important; margin-bottom: 4rem !important; }
          #sainthetic-home .how-step-wrapper .step-text { order: 1 !important; text-align: left !important; }
          #sainthetic-home .how-step-wrapper .step-image { order: 2 !important; width: 100% !important; }
          #sainthetic-home #pricing > div[style*="display: flex"] { gap: 18px !important; }
          #sainthetic-home #pricing > div[style*="display: flex"] > div { width: 100%; max-width: 420px !important; min-width: 0 !important; box-sizing: border-box; }
          #sainthetic-home section[style*="max-width: 1000px"][style*="borderRadius"] { margin-left: 18px !important; margin-right: 18px !important; padding: 26px 18px !important; }
          #sainthetic-home #case-study > div[style*="linear-gradient(135deg,#13131f"] { overflow: hidden; }
          #sainthetic-home #faq button { padding: 18px 16px !important; font-size: 1rem !important; }
          #sainthetic-home #faq [style*="padding: 0px 2rem"] { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (min-width: 801px) {          #sainthetic-home .sainthetic-menu-toggle { display: none !important; }
        }
      `}</style>

      <style>{`
        .hero-trust-strip { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; margin-top: 20px; }
        .logo-strip { display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap; margin-top: 12px; opacity: 0.5; }
        .how-step-wrapper { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 5rem; text-align: left; }
        @media (min-width: 768px) {
          .how-step-wrapper { grid-template-columns: 1fr 1fr; align-items: center; }
          .how-step-wrapper:nth-child(even) .step-image { order: 2; }
          .how-step-wrapper:nth-child(even) .step-text { order: 1; }
        }
        .cs-metrics { display: grid; grid-template-columns: 1fr 1fr; }
        .cs-metric-cell { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .cs-metric-cell:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.06); }
        .cs-body { display: grid; grid-template-columns: 1fr; }
        .cs-challenge { padding: 1.8rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .cs-steps { padding: 1.8rem 1.5rem; }
        @media (min-width: 700px) {
          .cs-metrics { grid-template-columns: repeat(4, 1fr); }
          .cs-metric-cell { border-bottom: none; }
          .cs-metric-cell:nth-child(odd) { border-right: none; }
          .cs-metric-cell:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.06); }
          .cs-body { grid-template-columns: 1fr 1fr; }
          .cs-challenge { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.06); padding: 2.5rem; }
          .cs-steps { padding: 2.5rem; }
        }
        .feature-card { background: linear-gradient(120deg,#191924b7 85%,#232845c7 100%); min-width: 300px; max-width: 340px; flex: 1 1 260px; border-radius: 1.3rem; padding: 2.4rem 1.6rem 1.8rem 1.6rem; color: #fff; cursor: pointer; display: flex; flex-direction: column; align-items: center; text-align: center; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      <style>{`
        /* Editorial visual refinement inspired by the supplied HeyCatch reference.
           Intentionally visual-only: all existing sAInthetic copy and functionality remain unchanged. */
        #sainthetic-home {
          font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          background: #fff !important;
          color: #191b29 !important;
        }
        #sainthetic-home nav.main-nav {
          width: min( calc(100% - 40px), 1440px ) !important;
          margin: 18px auto 0 !important;
          padding: 14px 22px !important;
          border: 1px solid rgba(25,27,41,.045) !important;
          border-radius: 999px !important;
          background: rgba(255,255,255,.92) !important;
          box-shadow: 0 12px 40px rgba(29,34,58,.055) !important;
        }
        #sainthetic-home .nav-logo { border-radius: 13px !important; }
        #sainthetic-home .nav-brand { letter-spacing: -.045em !important; }
        #sainthetic-home header#hero {
          max-width: 1120px !important;
          padding: clamp(90px, 13vw, 176px) 28px 90px !important;
          text-align: center !important;
        }
        #sainthetic-home header#hero > div:first-child {
          background: #f7f7f9 !important;
          border: 1px solid #ededf1 !important;
          box-shadow: none !important;
          color: #4d5265 !important;
          padding: 10px 18px !important;
          font-size: .88rem !important;
          letter-spacing: .01em !important;        }
        #sainthetic-home #hero h1 {
          max-width: 1040px !important;
          font-size: clamp(3.25rem, 8.3vw, 7.2rem) !important;
          font-weight: 650 !important;
          line-height: .99 !important;
          letter-spacing: -.078em !important;
          margin: 30px auto 28px !important;
          text-wrap: balance !important;
        }
        #sainthetic-home #hero h1 span {
          background: none !important;
          color: #45495f !important;
          -webkit-text-fill-color: #45495f !important;
        }
        #sainthetic-home #hero > p {
          max-width: 690px !important;
          font-size: clamp(1.15rem, 2vw, 1.5rem) !important;
          line-height: 1.55 !important;
          color: #50556a !important;
          margin: 0 auto 34px !important;
        }
        #sainthetic-home #hero a[href="/register"] {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 64px !important;
          min-width: 220px !important;
          padding: 18px 34px !important;
          border-radius: 999px !important;
          background: #191b29 !important;
          border: 1px solid #191b29 !important;
          color: #fff !important;
          box-shadow: none !important;
          font-weight: 650 !important;
        }
        #sainthetic-home #hero a[href="/register"]:hover,
        #sainthetic-home a[href="/register"]:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(25,27,41,.12) !important;
        }
        #sainthetic-home .hero-trust-strip { margin-top: 42px !important; }
        #sainthetic-home .hero-trust-strip > div { color: #777d91 !important; }
        #sainthetic-home header#hero > div[style*="radial-gradient"] {
          border-radius: 30px !important;
          box-shadow: 0 24px 80px rgba(29,34,58,.075) !important;
        }
        #sainthetic-home section {
          margin-top: clamp(88px, 11vw, 156px) !important;
        }
        #sainthetic-home section h2 {
          font-size: clamp(2.35rem, 5vw, 4.5rem) !important;
          font-weight: 600 !important;
          line-height: 1.04 !important;
          letter-spacing: -.065em !important;
          text-wrap: balance !important;
        }
        #sainthetic-home #features {
          max-width: 1180px !important;
          padding: 0 24px !important;
          gap: 22px !important;
        }
        #sainthetic-home .feature-card {
          border-radius: 30px !important;
          padding: 36px 30px !important;
          box-shadow: 0 14px 50px rgba(29,34,58,.055) !important;
          border: 1px solid #f0f0f3 !important;
          text-align: left !important;
          align-items: flex-start !important;
          transition: transform .25s ease, box-shadow .25s ease !important;
        }
        #sainthetic-home .feature-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 20px 60px rgba(29,34,58,.09) !important;
        }
        #sainthetic-home .how-step-wrapper { margin-bottom: 8rem !important; }
        #sainthetic-home .step-image {
          border-radius: 30px !important;
          box-shadow: 0 18px 60px rgba(29,34,58,.075) !important;
        }
        #sainthetic-home #pricing > div[style*="display: flex"] > div {
          border-radius: 30px !important;
          padding: 2.6rem 2rem !important;
          box-shadow: 0 14px 50px rgba(29,34,58,.06) !important;
        }
        #sainthetic-home #pricing button,
        #sainthetic-home #pricing a[href="/register"] {
          border-radius: 999px !important;
          min-height: 54px !important;
          background: #191b29 !important;
          color: #fff !important;
          font-weight: 650 !important;
        }
        #sainthetic-home section[style*="max-width: 1000px"][style*="borderRadius"] {
          border-radius: 32px !important;
        }
        #sainthetic-home #case-study > div {
          border-radius: 32px !important;
          box-shadow: 0 18px 65px rgba(29,34,58,.065) !important;
        }
        #sainthetic-home #faq > div > div > div {
          border-radius: 22px !important;
          box-shadow: 0 8px 30px rgba(29,34,58,.035) !important;
        }
        #sainthetic-home #faq button {
          padding: 24px 28px !important;
          font-size: 1.12rem !important;
          font-weight: 550 !important;
        }
        #sainthetic-home footer {
          padding-top: 30px !important;
          margin-top: 90px !important;
        }
        @media (max-width: 800px) {
          #sainthetic-home nav.main-nav {
            width: calc(100% - 28px) !important;
            margin-top: 14px !important;
            padding: 12px 16px !important;
            min-height: 76px !important;
            border-radius: 999px !important;
          }
          #sainthetic-home .nav-logo { width: 42px !important; height: 42px !important; }
          #sainthetic-home .nav-brand { font-size: 1.32rem !important; }
          #sainthetic-home header#hero {
            padding: 112px 24px 60px !important;
          }
          #sainthetic-home #hero h1 {
            font-size: clamp(3rem, 12vw, 5.2rem) !important;
            line-height: 1.02 !important;
            letter-spacing: -.075em !important;
            margin: 28px auto 24px !important;
          }
          #sainthetic-home #hero > p {
            font-size: 1.16rem !important;
            line-height: 1.55 !important;
            margin-bottom: 30px !important;
          }
          #sainthetic-home #hero a[href="/register"] {
            width: 100% !important;
            min-height: 64px !important;
            border-radius: 999px !important;
          }
          #sainthetic-home .hero-trust-strip { margin-top: 32px !important; }
          #sainthetic-home section { margin-top: 92px !important; }
          #sainthetic-home section h2 {
            font-size: clamp(2.5rem, 10vw, 3.6rem) !important;
            line-height: 1.04 !important;
          }
          #sainthetic-home #features { padding: 0 20px !important; }
          #sainthetic-home .feature-card {
            border-radius: 28px !important;
            padding: 30px 24px !important;
          }
          #sainthetic-home .how-step-wrapper { margin-bottom: 5rem !important; }
          #sainthetic-home #pricing > div[style*="display: flex"] > div {
            border-radius: 28px !important;
            padding: 2.1rem 1.5rem !important;
          }
          #sainthetic-home #faq button { padding: 20px 18px !important; }
          #sainthetic-home footer { margin-top: 64px !important; }
        }
      `}</style>

      <style>{`
        /* Premium visual system for presentation. Page copy and behaviour stay intact. */
        #sainthetic-home {
          --ink: #171925;
          --muted: #697083;
          --line: #e9eaf0;
          --paper: #ffffff;
          --canvas: #f7f8fb;
          --accent: #f4c94f;
          font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          color: var(--ink) !important;
          background: var(--canvas) !important;
          overflow: clip !important;
        }
        #sainthetic-home > div[style*="linear-gradient"] {
          background: var(--canvas) !important;
          overflow: visible !important;
          isolation: isolate;
        }
        #sainthetic-home > div > div[style*="position: fixed"] { display: none !important; }
        #sainthetic-home nav.main-nav {
          width: min(calc(100% - 64px), 1320px) !important;
          min-height: 76px;
          margin: 18px auto 0 !important;
          padding: 12px 24px !important;
          border: 1px solid rgba(23,25,37,.07) !important;
          border-radius: 20px !important;
          background: rgba(255,255,255,.88) !important;
          box-shadow: 0 8px 30px rgba(22,28,45,.045) !important;
          backdrop-filter: blur(18px);
        }
        #sainthetic-home .nav-logo { width: 42px !important; height: 42px !important; border-radius: 12px !important; }
        #sainthetic-home .nav-brand { color: var(--ink) !important; font-size: 1.38rem !important; font-weight: 760 !important; letter-spacing: -.055em !important; }
        #sainthetic-home .nav-right { gap: 5px !important; }
        #sainthetic-home .nav-right a,
        #sainthetic-home .desktop-nav .nav-link {
          color: #555b6c !important; font-size: .9rem !important; font-weight: 600 !important;
          padding: 11px 14px !important; border-radius: 10px !important;
        }
        #sainthetic-home .nav-right a:hover { background: #f4f5f8 !important; color: var(--ink) !important; }
        #sainthetic-home .nav-right a.cta {
          color: #fff !important; background: var(--ink) !important; padding: 12px 20px !important;
          border-radius: 11px !important; box-shadow: 0 5px 14px rgba(23,25,37,.12) !important;
        }
        #sainthetic-home header#hero {
          max-width: 1120px !important;
          padding: clamp(82px, 10vw, 132px) 28px 72px !important;
        }
        #sainthetic-home header#hero > div:first-child {
          background: #fff !important; border: 1px solid #ececf1 !important;
          color: #555b6c !important; box-shadow: 0 3px 12px rgba(23,25,37,.035) !important;
          padding: 9px 16px !important; font-size: .82rem !important; font-weight: 650 !important;
        }
        #sainthetic-home #hero h1 {
          max-width: 1020px !important; margin: 28px auto 24px !important;
          color: var(--ink) !important; -webkit-text-fill-color: var(--ink) !important;
          background: none !important; font-size: clamp(3.5rem, 7.1vw, 6.7rem) !important;
          line-height: .99 !important; letter-spacing: -.082em !important; font-weight: 680 !important;
          text-wrap: balance !important;
        }
        #sainthetic-home #hero h1 span {
          color: #62677a !important; -webkit-text-fill-color: #62677a !important;
          background: none !important;
        }
        #sainthetic-home #hero > p {
          max-width: 690px !important; color: #62697b !important;
          font-size: clamp(1.08rem, 1.7vw, 1.28rem) !important;
          line-height: 1.7 !important; margin: 0 auto 30px !important;
        }
        #sainthetic-home #hero a[href="/register"] {
          display: inline-flex !important; align-items: center !important; justify-content: center !important;
          min-height: 58px !important; padding: 16px 26px !important; border-radius: 12px !important;
          background: var(--ink) !important; border: 1px solid var(--ink) !important;
          color: #fff !important; box-shadow: 0 8px 22px rgba(23,25,37,.13) !important;
          font-size: 1rem !important; font-weight: 650 !important;
        }
        #sainthetic-home #hero a[href="/register"]:hover,
        #sainthetic-home a[href="/register"]:hover { background: #303449 !important; }
        #sainthetic-home #hero p[style*="color"] { color: #8a8f9e !important; }
        #sainthetic-home .hero-trust-strip { gap: 12px 25px !important; margin-top: 28px !important; }
        #sainthetic-home .hero-trust-strip > div { color: #777e8f !important; font-size: .78rem !important; }
        #sainthetic-home header#hero > div[style*="radial-gradient"] {
          max-width: 850px !important; margin: 54px auto 0 !important; padding: 26px !important;
          background: #fff !important; border: 1px solid #e8eaf0 !important;
          border-radius: 22px !important; box-shadow: 0 26px 75px rgba(30,36,57,.09) !important;
          color: var(--ink) !important;
        }
        #sainthetic-home header#hero > div[style*="radial-gradient"] [style*="rgba(255,255,255"] {
          background: #f6f7fa !important; border-color: #eceef3 !important;
        }
        #sainthetic-home header#hero > div[style*="radial-gradient"] [style*="color"] { color: #555d70 !important; }
        #sainthetic-home .persona-try-demo {
          max-width: 1080px !important; margin: 28px auto 0 !important;
          padding: clamp(24px, 4vw, 48px) !important; background: #fff !important;
          border: 1px solid var(--line) !important; border-radius: 24px !important;
          box-shadow: 0 18px 60px rgba(30,36,57,.055) !important;
        }
        #sainthetic-home .persona-try-demo h2 { font-size: clamp(2rem,4vw,3rem) !important; letter-spacing: -.06em !important; }
        #sainthetic-home .persona-try-demo input,
        #sainthetic-home .persona-try-demo select {
          min-height: 54px !important; background: #f8f9fb !important; color: var(--ink) !important;
          border: 1px solid #e5e7ed !important; border-radius: 11px !important;
        }
        #sainthetic-home .persona-try-demo > button,
        #sainthetic-home .persona-try-demo button {
          min-height: 50px !important; padding: 13px 22px !important; border-radius: 11px !important;
          background: var(--ink) !important; color: #fff !important; box-shadow: none !important;
        }
        #sainthetic-home .persona-try-demo > div[style*="rgba(255,255,255"],
        #sainthetic-home .persona-try-demo [style*="rgba(255,255,255"] {
          background: #f7f8fa !important; border-color: #e9ebf0 !important; color: var(--ink) !important;
        }
        #sainthetic-home .persona-try-demo [style*="color: #aaa"],
        #sainthetic-home .persona-try-demo [style*="color: #888"] { color: #737a8b !important; }
        #sainthetic-home #features {
          max-width: 1160px !important; padding: 0 28px !important;
          margin: 105px auto 0 !important; gap: 18px !important;
        }
        #sainthetic-home .feature-card {
          min-width: 0 !important; max-width: none !important; flex: 1 1 280px !important;
          padding: 30px !important; align-items: flex-start !important; text-align: left !important;
          color: var(--ink) !important; background: #fff !important;
          border: 1px solid #e9eaf0 !important; border-radius: 18px !important;
          box-shadow: 0 8px 28px rgba(30,36,57,.035) !important;
        }
        #sainthetic-home .feature-card h3 { color: var(--ink) !important; font-size: 1.18rem !important; letter-spacing: -.035em !important; }
        #sainthetic-home .feature-card p,
        #sainthetic-home .feature-card li { color: #697083 !important; text-align: left !important; line-height: 1.65 !important; }
        #sainthetic-home .feature-card li:last-child { color: #777d8d !important; }
        #sainthetic-home section {
          scroll-margin-top: 110px; color: var(--ink) !important;
          margin-top: clamp(92px, 10vw, 142px) !important;
        }
        #sainthetic-home section h2 {
          color: var(--ink) !important; font-size: clamp(2.5rem,5vw,4.25rem) !important;
          font-weight: 650 !important; letter-spacing: -.07em !important; line-height: 1.04 !important;
          text-wrap: balance !important;
        }
        #sainthetic-home section h3,
        #sainthetic-home section h4 { color: var(--ink) !important; }
        #sainthetic-home section p { color: #697083 !important; }
        #sainthetic-home #how-it-works,
        #sainthetic-home #pricing,
        #sainthetic-home #case-study,
        #sainthetic-home #faq { max-width: 1160px !important; }
        #sainthetic-home #how-it-works > p { color: #777d8d !important; }
        #sainthetic-home .how-step-wrapper { gap: clamp(32px,6vw,90px) !important; margin-bottom: 7rem !important; }
        #sainthetic-home .step-image {
          border: 1px solid #e8eaf0 !important; border-radius: 20px !important;
          box-shadow: 0 18px 55px rgba(30,36,57,.075) !important; overflow: hidden !important;
        }
        #sainthetic-home .step-image img { display: block; width: 100%; }
        #sainthetic-home .step-text h3 { font-size: clamp(1.8rem,3vw,2.55rem) !important; letter-spacing: -.055em !important; }
        #sainthetic-home .step-text p { color: #697083 !important; line-height: 1.75 !important; }
        #sainthetic-home .step-text > div:first-child {
          background: #f6f1df !important; color: #67531c !important;
          border: 1px solid #eee4c5 !important; border-radius: 8px !important;
          font-size: .72rem !important; letter-spacing: .08em !important;
        }
        #sainthetic-home section > div[style*="paddingBottom: \"56.25%\""] {
          border: 1px solid #e6e8ee !important; border-radius: 20px !important;
          box-shadow: 0 18px 55px rgba(30,36,57,.08) !important;
        }
        #sainthetic-home section > div[style*="linear-gradient(135deg,#13131f"],
        #sainthetic-home section > div[style*="linear-gradient(135deg, #13131f"],
        #sainthetic-home #case-study > div {
          background: #fff !important; border: 1px solid #e8eaf0 !important;
          border-radius: 22px !important; box-shadow: 0 16px 55px rgba(30,36,57,.055) !important;
        }
        #sainthetic-home .cs-metric-cell { border-color: #eceef2 !important; }
        #sainthetic-home .cs-metric-cell div[style*="color:"] { color: #30364a !important; }
        #sainthetic-home #pricing > div[style*="linear-gradient"] {
          background: #f7f3e7 !important; border: 1px solid #eee5cd !important;
          color: #62552f !important; border-radius: 999px !important;
        }
        #sainthetic-home #pricing > div[style*="display: flex"] > div {
          min-width: 250px !important; max-width: 340px !important; flex: 1 1 270px !important;
          padding: 34px 28px !important; background: #fff !important; color: var(--ink) !important;
          border: 1px solid #e7e9ef !important; border-radius: 20px !important;
          box-shadow: 0 10px 35px rgba(30,36,57,.045) !important;
        }
        #sainthetic-home #pricing > div[style*="display: flex"] > div[style*="border: 2px solid"] {
          border-color: #d8bd66 !important; box-shadow: 0 18px 48px rgba(30,36,57,.09) !important;
        }
        #sainthetic-home #pricing h3 { color: var(--ink) !important; }
        #sainthetic-home #pricing > div[style*="display: flex"] > div > div[style*="fontSize: 32"] { color: var(--ink) !important; }
        #sainthetic-home #pricing ul,
        #sainthetic-home #pricing ul li { color: #646b7d !important; line-height: 1.9 !important; }
        #sainthetic-home #pricing button,
        #sainthetic-home #pricing a[href="/register"] {
          background: var(--ink) !important; color: #fff !important; border: 0 !important;
          border-radius: 10px !important; min-height: 50px !important;
        }
        #sainthetic-home #pricing > p { color: #777d8d !important; }
        #sainthetic-home section[style*="max-width: 1000px"][style*="borderRadius"] {
          background: #fff !important; border: 1px solid #e8eaf0 !important;
          border-radius: 22px !important; box-shadow: 0 16px 55px rgba(30,36,57,.05) !important;
        }
        #sainthetic-home section[style*="max-width: 1000px"] > div > div > div[style*="rgba(23,22,29"] {
          background: #f8f9fb !important; border: 1px solid #eceef2 !important;
        }
        #sainthetic-home #case-study > div { overflow: hidden !important; }
        #sainthetic-home #case-study > div > div:first-child,
        #sainthetic-home #case-study > div > div:last-child {
          background: #fafafc !important; border-color: #eceef2 !important;
        }
        #sainthetic-home #case-study [style*="rgba(255,255,255"] { border-color: #e8eaf0 !important; }
        #sainthetic-home #case-study [style*="color:"] { color: #626a7d !important; }
        #sainthetic-home #case-study h2,
        #sainthetic-home #case-study h3,
        #sainthetic-home #case-study h4 { color: var(--ink) !important; }
        #sainthetic-home #case-study a { color: var(--ink) !important; }
        #sainthetic-home #faq > div > div > div {
          background: #fff !important; border: 1px solid #e8eaf0 !important;
          border-radius: 14px !important; box-shadow: 0 5px 18px rgba(30,36,57,.025) !important;
        }
        #sainthetic-home #faq button {
          background: #fff !important; color: var(--ink) !important;
          padding: 21px 24px !important; font-size: 1rem !important; font-weight: 620 !important;
        }
        #sainthetic-home #faq button span:last-child { color: #8b7440 !important; }
        #sainthetic-home #faq p { color: #697083 !important; }
        #sainthetic-home footer {
          background: transparent !important; color: #858b99 !important;
          border-color: #e8eaf0 !important; padding-top: 28px !important;
        }
        #sainthetic-home footer div { color: #858b99 !important; }
        #sainthetic-home section[style*="padding: \"6rem 20px 3rem 20px\""] {
          padding-top: 110px !important;
        }
        #sainthetic-home section[style*="padding: \"6rem 20px 3rem 20px\""] a[href="/register"] {
          background: var(--ink) !important; color: #fff !important; border-radius: 12px !important;
          box-shadow: 0 8px 22px rgba(23,25,37,.12) !important;
        }
        @media (max-width: 800px) {
          #sainthetic-home nav.main-nav {
            width: calc(100% - 28px) !important; margin-top: 12px !important;
            min-height: 66px !important; padding: 10px 14px !important; border-radius: 15px !important;
          }
          #sainthetic-home .nav-brand { font-size: 1.2rem !important; }
          #sainthetic-home .sainthetic-menu-toggle {
            display: inline-flex !important; align-items: center; justify-content: center;
            width: 42px; height: 42px; border: 1px solid #e8eaf0 !important;
            border-radius: 10px !important; background: #fff !important; color: var(--ink) !important;
          }
          #sainthetic-home .mobile-dropdown {
            background: #fff !important; border: 1px solid #e8eaf0 !important;
            border-radius: 0 0 16px 16px !important; box-shadow: 0 16px 30px rgba(30,36,57,.08) !important;
          }
          #sainthetic-home .mobile-dropdown a { color: var(--ink) !important; }
          #sainthetic-home .mobile-dropdown a.cta { color: #fff !important; background: var(--ink) !important; }
          #sainthetic-home header#hero { padding: 88px 22px 48px !important; }
          #sainthetic-home #hero h1 { font-size: clamp(3.05rem, 12vw, 5rem) !important; letter-spacing: -.075em !important; }
          #sainthetic-home #hero > p { font-size: 1.05rem !important; }
          #sainthetic-home #hero a[href="/register"] { width: 100% !important; box-sizing: border-box; }
          #sainthetic-home .hero-trust-strip { gap: 11px 16px !important; }
          #sainthetic-home header#hero > div[style*="radial-gradient"] { padding: 18px !important; margin-top: 38px !important; }
          #sainthetic-home .persona-try-demo { margin: 20px 16px 0 !important; padding: 24px 18px !important; }
          #sainthetic-home #features { margin-top: 76px !important; padding: 0 18px !important; }
          #sainthetic-home .feature-card { flex-basis: 100% !important; padding: 25px !important; }
          #sainthetic-home section { margin-top: 82px !important; padding-left: 18px !important; padding-right: 18px !important; }
          #sainthetic-home section h2 { font-size: clamp(2.35rem, 10vw, 3.4rem) !important; }
          #sainthetic-home .how-step-wrapper { display: flex !important; flex-direction: column !important; gap: 22px !important; margin-bottom: 4.5rem !important; }
          #sainthetic-home .how-step-wrapper .step-text { order: 1 !important; text-align: left !important; }
          #sainthetic-home .how-step-wrapper .step-image { order: 2 !important; width: 100% !important; }
          #sainthetic-home #pricing > div[style*="display: flex"] { gap: 14px !important; }
          #sainthetic-home #pricing > div[style*="display: flex"] > div { width: 100% !important; max-width: 440px !important; min-width: 0 !important; }
          #sainthetic-home section[style*="max-width: 1000px"][style*="borderRadius"] { margin-left: 16px !important; margin-right: 16px !important; padding: 26px 18px !important; }
          #sainthetic-home #faq button { padding: 18px 16px !important; }
          #sainthetic-home footer { margin-top: 55px !important; }
        }
      `}</style>

      <style>{`
        /* Reference-led sAInthetic landing page composition */        #sainthetic-home { background:#fff !important; color:#111827 !important; min-width:0 !important; overflow:hidden; }
        #sainthetic-home > div[style*="flex: 1"] { background:#fff !important; overflow:visible !important; }
        #sainthetic-home > div[style*="flex: 1"] > div[style*="position: fixed"] { display:none !important; }
        #sainthetic-home nav.main-nav {
          box-sizing:border-box; width:calc(100% - 64px); max-width:1280px; margin:12px auto 0;
          padding:12px 18px !important; min-height:74px; border:1px solid #edf0f5 !important;
          border-radius:28px !important; background:rgba(255,255,255,.94) !important;
          box-shadow:0 12px 36px rgba(18,27,48,.07) !important; backdrop-filter:blur(18px);
          position:relative !important; z-index:20;
        }
        #sainthetic-home .nav-left { align-items:center; gap:12px !important; margin:0 !important; }
        #sainthetic-home .nav-logo { width:38px !important; height:38px !important; border-radius:11px !important; object-fit:cover; }
        #sainthetic-home .nav-brand { color:#111827 !important; font-size:1.45rem !important; font-weight:850 !important; letter-spacing:-.05em; }
        #sainthetic-home .nav-spacer { display:none !important; }
        #sainthetic-home .nav-right { align-items:center; gap:5px !important; }
        #sainthetic-home .desktop-nav { margin-left:auto; }
        #sainthetic-home .nav-right a, #sainthetic-home .desktop-nav .nav-link {
          color:#273044 !important; padding:11px 13px !important; border-radius:999px !important;
          font-size:.94rem !important; font-weight:600 !important; text-decoration:none;
        }
        #sainthetic-home .nav-right a:hover { background:#fff7dc !important; color:#111827 !important; }
        #sainthetic-home .nav-right a.cta { background:#111827 !important; color:#fff !important; padding:13px 22px !important; border-radius:999px !important; box-shadow:none !important; }
        #sainthetic-home .nav-right a.cta:hover { background:#273044 !important; }
        #sainthetic-home .sainthetic-menu-toggle { color:#111827 !important; border:1px solid #e8ebf1 !important; background:#fff !important; border-radius:14px !important; }
        #sainthetic-home header#hero {
          display:grid !important; grid-template-columns:minmax(0,1.02fr) minmax(420px,.98fr);
          grid-template-areas:"badge preview" "headline preview" "copy preview" "actions preview" "trust preview";
          align-items:center; column-gap:clamp(34px,5vw,76px); row-gap:0;
          width:100% !important; max-width:1280px !important; box-sizing:border-box;
          padding:74px 28px 52px !important; margin:0 auto !important; text-align:left !important;
        }
        #sainthetic-home header#hero > :nth-child(1) { grid-area:badge; justify-self:start; margin:0 0 24px !important; }
        #sainthetic-home #hero h1 {
          grid-area:headline; max-width:650px; margin:0 0 22px !important;
          color:#111827 !important; background:none !important; -webkit-text-fill-color:#111827 !important;
          font-size:clamp(3rem,5.4vw,5.2rem) !important; font-weight:850 !important;
          letter-spacing:-.075em !important; line-height:.99 !important; text-align:left !important;
        }
        #sainthetic-home #hero h1 span {
          color:#111827 !important; -webkit-text-fill-color:#111827 !important;
          background:linear-gradient(transparent 64%,#ffe58b 64%) !important;
          box-decoration-break:clone; -webkit-box-decoration-break:clone;
        }
        #sainthetic-home #hero > p { grid-area:copy; max-width:600px !important; margin:0 0 26px !important; color:#48536a !important; font-size:1.12rem !important; line-height:1.6 !important; text-align:left !important; }
        #sainthetic-home #hero > div:nth-of-type(2) { grid-area:actions; align-items:flex-start !important; flex-direction:row !important; flex-wrap:wrap; gap:14px !important; }
        #sainthetic-home #hero > div:nth-of-type(2) > a {
          background:#111827 !important; color:#fff !important; border:1px solid #111827 !important;
          border-radius:999px !important; box-shadow:0 9px 24px rgba(17,24,39,.15) !important;
          padding:16px 25px !important; font-size:1rem !important;
        }
        #sainthetic-home #hero > div:nth-of-type(2) > p { flex-basis:100%; color:#566176 !important; text-align:left !important; margin:0 !important; }
        #sainthetic-home #hero > div:nth-of-type(2) > div { justify-content:flex-start !important; }
        #sainthetic-home #hero > div:nth-of-type(2) > div span { color:#69748a !important; }
        #sainthetic-home #hero .hero-trust-strip { grid-area:trust; justify-content:flex-start !important; gap:10px 18px !important; margin-top:18px !important; flex-wrap:wrap; }
        #sainthetic-home #hero .hero-trust-strip > div { color:#657087 !important; font-size:.78rem !important; }
        #sainthetic-home #hero > div:nth-of-type(4) {
          grid-area:preview; align-self:center; width:100%; box-sizing:border-box; position:relative;
          margin:0 !important; padding:56px 22px 24px 158px !important;
          background:#fff !important; color:#111827 !important; border:1px solid #e7ebf2 !important;
          border-radius:26px !important; box-shadow:0 26px 70px rgba(31,42,68,.14) !important;
          transform:rotate(-1.2deg); min-height:360px;
        }        #sainthetic-home #hero > div:nth-of-type(4)::before {
          content:"●  ●  ●"; position:absolute; top:17px; left:22px; right:22px; height:25px;
          border-bottom:1px solid #edf0f5; color:#f46b68; font-size:13px; letter-spacing:5px;
        }
        #sainthetic-home #hero .hero-app-sidebar {
          position:absolute; top:58px; bottom:20px; left:18px; width:124px;
          display:flex; flex-direction:column; gap:14px; padding:8px 7px;
          color:#4a556b; font-size:.72rem; font-weight:600; border-right:1px solid #edf0f5;
        }
        #sainthetic-home #hero .hero-app-sidebar strong { color:#111827; font-size:.83rem; margin-bottom:10px; }
        #sainthetic-home #hero .hero-app-sidebar span { padding:8px 7px; border-radius:9px; white-space:nowrap; }
        #sainthetic-home #hero .hero-app-sidebar span.active { background:#fff1b8; color:#111827; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:not(.hero-app-sidebar) { position:relative; z-index:1; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:nth-child(2) { margin-bottom:16px !important; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:nth-child(2) > div:first-child { background:#fff0bd !important; color:#111827 !important; box-shadow:none !important; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:nth-child(2) > div:nth-child(2) div { color:#111827 !important; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:nth-child(2) > div:nth-child(2) div:nth-child(2) { color:#b08000 !important; }
        #sainthetic-home #hero > div:nth-of-type(4) [style*="rgba(255,255,255,0.04)"] { background:#f5f7fb !important; }
        #sainthetic-home #hero > div:nth-of-type(4) [style*="color:"] { color:#273044 !important; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:last-child { background:#f5f7fb !important; border:1px solid #e9edf3 !important; }
        #sainthetic-home #hero > div:nth-of-type(4) > div:last-child span { color:#364158 !important; }
        #sainthetic-home #features { max-width:1200px !important; margin:28px auto 0 !important; gap:18px !important; align-items:stretch; }
        #sainthetic-home .feature-card {
          min-width:0 !important; max-width:none !important; flex:1 1 250px !important;
          align-items:flex-start !important; text-align:left !important; justify-content:flex-start !important;
          background:#fff !important; color:#111827 !important; border:1px solid #edf0f5 !important;
          border-radius:22px !important; box-shadow:0 12px 32px rgba(31,42,68,.06) !important;
          padding:28px 24px !important;
        }
        #sainthetic-home .feature-card h3 { color:#111827 !important; }
        #sainthetic-home .feature-card p, #sainthetic-home .feature-card li { color:#59647a !important; text-align:left !important; }
        #sainthetic-home #how-it-works, #sainthetic-home #pricing, #sainthetic-home #case-study, #sainthetic-home #faq { scroll-margin-top:100px; }
        #sainthetic-home section h2, #sainthetic-home section h3, #sainthetic-home section h4 { color:#111827 !important; }
        #sainthetic-home section p { color:#59647a !important; }
        #sainthetic-home section[style*="max-width: 900px"]:has(.cs-metrics) > div:first-child {
          background:#fff !important; border:1px solid #e9edf3 !important; border-radius:24px !important;
          box-shadow:0 12px 34px rgba(31,42,68,.07) !important; padding:24px 20px !important;
        }
        #sainthetic-home section[style*="max-width: 900px"]:has(.cs-metrics) > div:first-child > div:first-child {
          color:#59647a !important; letter-spacing:.08em;
        }
        #sainthetic-home section[style*="max-width: 900px"]:has(.cs-metrics) .cs-metric-cell { border-color:#e9edf3 !important; }
        #sainthetic-home section[style*="max-width: 900px"]:has(.cs-metrics) .cs-metric-cell div { color:#111827 !important; }
        #sainthetic-home section[style*="max-width: 900px"]:has(.cs-metrics) a { color:#8a6500 !important; }
        #sainthetic-home #pricing { max-width:1180px !important; margin-top:6rem !important; }
        #sainthetic-home #pricing h2 { color:#111827 !important; font-size:clamp(2.1rem,4vw,3rem) !important; letter-spacing:-.06em !important; }
        #sainthetic-home #pricing > div[style*="display: flex"] > div {
          background:#fff !important; color:#111827 !important; border:1px solid #e9edf3 !important;
          border-radius:24px !important; box-shadow:0 12px 36px rgba(31,42,68,.07) !important;
        }
        #sainthetic-home #pricing h3 { color:#111827 !important; }
        #sainthetic-home #pricing ul, #sainthetic-home #pricing ul li { color:#4e596f !important; }
        #sainthetic-home #pricing button, #sainthetic-home #pricing a[href="/register"] { border-radius:999px !important; }
        #sainthetic-home #case-study > div[style*="linear-gradient"], #sainthetic-home #faq > div > div > div {
          background:#fff !important; border:1px solid #e9edf3 !important; box-shadow:0 12px 34px rgba(31,42,68,.06) !important;
        }
        #sainthetic-home footer { color:#5b6579 !important; border-color:#e9edf3 !important; }
        @media (max-width:900px) {
          #sainthetic-home nav.main-nav { width:calc(100% - 28px); margin-top:10px; border-radius:22px !important; }
          #sainthetic-home header#hero {
            grid-template-columns:minmax(0,1fr); grid-template-areas:"badge" "headline" "copy" "actions" "preview" "trust";
            max-width:720px !important; padding:54px 24px 36px !important; row-gap:0;
          }
          #sainthetic-home #hero h1 { font-size:clamp(2.8rem,9vw,4.3rem) !important; }
          #sainthetic-home #hero > div:nth-of-type(4) { margin-top:38px !important; transform:none; }
          #sainthetic-home #hero .hero-trust-strip { margin-top:24px !important; }
          #sainthetic-home #features { padding:0 22px !important; }
        }
        @media (max-width:560px) {
          #sainthetic-home nav.main-nav { min-height:62px; padding:9px 12px !important; }
          #sainthetic-home .nav-brand { font-size:1.2rem !important; }
          #sainthetic-home .nav-logo { width:34px !important; height:34px !important; }
          #sainthetic-home header#hero { padding:42px 20px 30px !important; }
          #sainthetic-home #hero > div:nth-of-type(2) { flex-direction:column !important; align-items:stretch !important; }
          #sainthetic-home #hero > div:nth-of-type(2) > a { text-align:center; }
          #sainthetic-home #hero > div:nth-of-type(4) { padding:54px 14px 18px 14px !important; min-height:0; }
          #sainthetic-home #hero .hero-app-sidebar { display:none; }
          #sainthetic-home #hero > div:nth-of-type(4) > div:nth-child(2) { gap:8px; }
          #sainthetic-home #hero > div:nth-of-type(4) > div:nth-child(2) > div:last-child { display:none; }
          #sainthetic-home .feature-card { flex-basis:100% !important; }
          #sainthetic-home #pricing > div[style*="display: flex"] > div { min-width:0 !important; width:100%; }
        }
      `}</style>
      <style>{`
        #sainthetic-home { --ref-ink:#111827; --ref-muted:#33415f; --ref-yellow:#ffeaa3; background:#fff !important; color:var(--ref-ink) !important; min-width:0 !important; overflow:hidden; font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
        #sainthetic-home > div[style*="flex: 1"] { background:#fff !important; overflow:visible !important; }
        #sainthetic-home > div[style*="flex: 1"] > div[style*="position: fixed"] { display:none !important; }
        #sainthetic-home nav.main-nav { box-sizing:border-box; width:calc(100% - 80px); max-width:1240px; min-height:74px; margin:4px auto 0; padding:10px 18px !important; border:1px solid #eef0f5 !important; border-radius:32px !important; background:rgba(255,255,255,.96) !important; box-shadow:0 12px 34px rgba(25,35,60,.08) !important; position:relative !important; z-index:30; display:flex !important; flex-direction:row !important; align-items:center !important; justify-content:space-between !important; }
        #sainthetic-home .nav-left { align-items:center; gap:12px !important; margin:0 !important; }
        #sainthetic-home .nav-logo { width:38px !important; height:38px !important; border-radius:10px !important; object-fit:cover; }
        #sainthetic-home .nav-brand { color:#111827 !important; font-size:1.45rem !important; font-weight:850 !important; letter-spacing:-.05em; }
        #sainthetic-home .nav-spacer { display:none !important; }
        #sainthetic-home .nav-right { display:flex !important; flex-direction:row !important; align-items:center !important; gap:6px !important; margin-left:auto; }
        #sainthetic-home .nav-right a,#sainthetic-home .desktop-nav .nav-link { color:#111827 !important; padding:11px 13px !important; border-radius:999px !important; font-size:.94rem !important; font-weight:550 !important; text-decoration:none; white-space:nowrap; }
        #sainthetic-home .nav-right a:hover { background:#fff7dc !important; }
        #sainthetic-home .nav-right a.cta { color:#fff !important; background:#090e1d !important; padding:13px 22px !important; border-radius:999px !important; margin-left:8px; }
        #sainthetic-home .sainthetic-menu-toggle { display:none; color:#111827 !important; background:#fff !important; border:1px solid #e8ebf1 !important; border-radius:12px !important; }
        #sainthetic-home .sainthetic-reference-top { width:100%; max-width:1240px; margin:0 auto; padding:0 28px 30px; box-sizing:border-box; }
        #sainthetic-home .reference-hero { position:relative; display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.06fr); align-items:center; gap:20px; min-height:610px; padding:48px 12px 24px; box-sizing:border-box; }
        #sainthetic-home .reference-hero-copy { position:relative; z-index:2; min-width:0; }
        #sainthetic-home .reference-eyebrow { display:inline-flex; align-items:center; gap:9px; padding:9px 15px; border-radius:999px; background:#fff5cf; color:#111827; font-size:14px; font-weight:700; margin:0 0 24px; box-shadow:0 5px 16px rgba(243,205,93,.12); }
        #sainthetic-home .reference-eyebrow span { display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:#ffe18a; color:#d89b00; font-size:15px; }
        #sainthetic-home .reference-hero h1 { margin:0 0 24px !important; max-width:540px; color:#101522 !important; font-size:clamp(2.9rem,5.2vw,4.15rem) !important; line-height:1.02 !important; font-weight:850 !important; letter-spacing:-.065em !important; background:none !important; -webkit-text-fill-color:#101522 !important; text-align:left !important; }
        #sainthetic-home .reference-hero h1 span { display:inline; color:#101522 !important; -webkit-text-fill-color:#101522 !important; background:linear-gradient(transparent 61%,#ffe28a 61%,#ffe28a 92%,transparent 92%) !important; padding:0 .02em; }
        #sainthetic-home .reference-subtitle { max-width:540px; margin:0 0 22px !important; color:#34415f !important; font-size:1.06rem !important; line-height:1.48 !important; font-weight:450; }
        #sainthetic-home .reference-actions { display:flex; align-items:center; flex-wrap:wrap; gap:14px; }
        #sainthetic-home .reference-actions a { min-height:48px; display:inline-flex; align-items:center; justify-content:center; gap:13px; box-sizing:border-box; padding:0 23px; border-radius:999px; font-size:.98rem; font-weight:750; text-decoration:none; white-space:nowrap; }
        #sainthetic-home .reference-primary { background:#090e1d; color:#fff !important; box-shadow:0 5px 12px rgba(17,24,39,.12); }
        #sainthetic-home .reference-primary span { font-size:1.2rem; }
        #sainthetic-home .reference-secondary { border:1.5px solid #111827; color:#111827 !important; background:#fff; }
        #sainthetic-home .play-icon { font-size:1.2rem; }
        #sainthetic-home .reference-reassurance { display:flex; flex-wrap:wrap; gap:12px 22px; margin-top:21px; color:#27334d; font-size:.83rem; font-weight:500; }
        #sainthetic-home .reference-visual { position:relative; min-height:470px; display:flex; align-items:center; justify-content:center; }
        #sainthetic-home .reference-glow { position:absolute; border-radius:50%; background:linear-gradient(135deg,#fff4c8,#ffedaa); opacity:.8; z-index:0; }
        #sainthetic-home .reference-glow-one { width:210px; height:330px; right:0; top:-20px; transform:rotate(25deg); }
        #sainthetic-home .reference-glow-two { width:230px; height:270px; left:5px; bottom:-5px; transform:rotate(35deg); }
        #sainthetic-home .reference-app-window { position:relative; z-index:1; display:grid; grid-template-columns:140px minmax(0,1fr); width:100%; max-width:560px; min-height:345px; padding:45px 16px 18px; box-sizing:border-box; border:1px solid #e6e9ef; border-radius:28px; background:linear-gradient(135deg,#fff,#f6f7fa); box-shadow:0 25px 55px rgba(35,44,65,.18); transform:rotate(-2.5deg); }
        #sainthetic-home .reference-window-dots { position:absolute; top:16px; left:24px; display:flex; gap:7px; }
        #sainthetic-home .reference-window-dots i { width:10px; height:10px; border-radius:50%; background:#fa625c; }
        #sainthetic-home .reference-window-dots i:nth-child(2) { background:#ffc43d; }
        #sainthetic-home .reference-window-dots i:nth-child(3) { background:#39bd36; }
        #sainthetic-home .reference-app-sidebar { display:flex; flex-direction:column; gap:13px; padding:4px 10px 0 0; border-right:1px solid #edf0f4; color:#172033; font-size:.73rem; font-weight:550; }
        #sainthetic-home .reference-mini-brand { display:flex; align-items:center; gap:7px; margin-bottom:15px; font-size:.85rem; font-weight:800; white-space:nowrap; }
        #sainthetic-home .mini-logo { display:grid; place-items:center; width:19px; height:19px; border-radius:6px; background:#ffe28a; color:#111827; font-size:10px; }
        #sainthetic-home .reference-app-sidebar > div:not(:first-child) { padding:8px 7px; border-radius:8px; white-space:nowrap; }
        #sainthetic-home .reference-app-sidebar .active { background:#ffedac; font-weight:750; }
        #sainthetic-home .reference-persona-panel { margin-left:12px; padding:8px 12px 10px; border:1px solid #eceff4; border-radius:18px; background:rgba(255,255,255,.88); box-shadow:0 7px 22px rgba(28,38,60,.08); color:#101522; }
        #sainthetic-home .reference-persona-panel h3 { margin:0 0 17px !important; font-size:1rem !important; font-weight:800 !important; color:#101522 !important; letter-spacing:-.03em; }
        #sainthetic-home .reference-persona-profile { display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid #e9edf2; }
        #sainthetic-home .reference-persona-avatar { position:relative; display:block; width:54px; height:54px; flex:0 0 54px; border-radius:50%; overflow:hidden; background-color:#e8e9ec; background-image:url("/community-avatars-clean.webp?v=20261106"); background-repeat:no-repeat; background-size:500% 130%; background-position:3.125% 50%; }
        #sainthetic-home .reference-persona-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
        #sainthetic-home .reference-person-0 { object-position:0% 50%; }
        #sainthetic-home .reference-person-1 { object-position:25% 50%; }
        #sainthetic-home .reference-person-2 { object-position:50% 50%; }
        #sainthetic-home .reference-person-3 { object-position:75% 50%; }
        #sainthetic-home .reference-person-4 { object-position:100% 50%; }\n        #sainthetic-home .reference-persona-profile strong { font-size:.82rem; letter-spacing:-.03em; white-space:nowrap; }
        #sainthetic-home .reference-tags { display:flex; gap:5px; margin-top:8px; }
        #sainthetic-home .reference-tags span { padding:5px 9px; border-radius:999px; background:#f0f2f6; color:#253149; font-size:.66rem; }
        #sainthetic-home .reference-question-title { margin:17px 0 9px; font-size:.9rem; font-weight:800; letter-spacing:-.03em; }
        #sainthetic-home .reference-question { display:flex; align-items:center; gap:9px; padding:7px 0; color:#172033; font-size:.73rem; white-space:nowrap; }
        #sainthetic-home .reference-question span { display:grid; place-items:center; width:24px; height:24px; flex:0 0 24px; border-radius:50%; background:#f1f3f7; color:#34415c; font-size:1.1rem; }
        #sainthetic-home .reference-features { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:28px; padding:0 30px 18px; margin:4px 0 35px; }
        #sainthetic-home .reference-features article { text-align:left; }
        #sainthetic-home .reference-feature-icon { display:grid; place-items:center; width:52px; height:52px; border-radius:14px; margin-bottom:9px; background:#fff0b9; color:#101522; font-size:1.8rem; font-weight:700; }
        #sainthetic-home .reference-features h3 { margin:0 0 5px !important; color:#101522 !important; font-size:1.42rem !important; font-weight:850 !important; letter-spacing:-.055em !important; }
        #sainthetic-home .reference-features p { margin:0 !important; color:#34415f !important; font-size:1.03rem !important; line-height:1.38 !important; }
        #sainthetic-home .reference-growth-bar { display:grid; grid-template-columns:1.15fr 1.1fr .9fr; align-items:center; gap:20px; min-height:104px; padding:16px 30px; margin:0 0 38px; box-sizing:border-box; border:1px solid #edf0f5; border-radius:24px; background:rgba(255,255,255,.9); box-shadow:0 10px 26px rgba(31,42,68,.07); }
        #sainthetic-home .growth-message { display:flex; align-items:center; gap:16px; padding-right:24px; border-right:1px solid #d9deea; }
        #sainthetic-home .growth-icon { display:grid; place-items:center; flex:0 0 52px; width:52px; height:52px; border-radius:14px; background:#fff0b9; font-size:1.8rem; overflow:hidden; }
        #sainthetic-home .growth-message strong { color:#101522; font-size:1.28rem; line-height:1.12; letter-spacing:-.05em; }
        #sainthetic-home .growth-count { display:flex; flex-direction:column; gap:3px; }
        #sainthetic-home .growth-count strong { color:#101522; font-size:1.8rem; font-weight:850; letter-spacing:-.06em; }
        #sainthetic-home .growth-count span { color:#34415f; font-size:.98rem; }
        #sainthetic-home .growth-avatars { display:flex; justify-content:flex-end; padding-right:8px; }
        #sainthetic-home .growth-avatars span { display:grid; place-items:center; width:55px; height:55px; margin-left:-8px; border:2px solid white; border-radius:50%; background:#f1dfcf; box-shadow:0 3px 8px #1b27401c; font-size:1.8rem; }
        #sainthetic-home .growth-avatars img { width:100%; height:100%; object-fit:cover; display:block; border-radius:50%; }\n        #sainthetic-home .growth-avatars span:nth-child(2) { background:#f4d7c2; }
        #sainthetic-home .growth-avatars span:nth-child(3) { background:#e9d7c7; }
        #sainthetic-home .growth-avatars span:nth-child(4) { background:#e8d6c9; }
        #sainthetic-home .reference-pricing { max-width:1160px; margin:0 auto; padding:0 10px; text-align:center; }
        #sainthetic-home .reference-pricing h2 { margin:0 0 10px !important; color:#101522 !important; font-size:clamp(2.3rem,4vw,3rem) !important; line-height:1.1 !important; font-weight:850 !important; letter-spacing:-.065em !important; }
        #sainthetic-home .pricing-intro { margin:0 0 28px !important; color:#34415f !important; font-size:1.12rem !important; }
        #sainthetic-home .reference-pricing-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:22px; align-items:stretch; text-align:left; }
        #sainthetic-home .reference-price-card { position:relative; display:flex; flex-direction:column; min-height:350px; padding:22px 25px 20px; box-sizing:border-box; border:1px solid #e9edf3; border-radius:25px; background:#fff; box-shadow:0 9px 20px rgba(27,38,64,.06); }
        #sainthetic-home .reference-price-card.featured { background:linear-gradient(145deg,#fff9e4,#fffdf5); border-color:#fff2c8; }
        #sainthetic-home .reference-price-card h3 { margin:0 0 5px !important; color:#101522 !important; font-size:1.65rem !important; font-weight:850 !important; letter-spacing:-.06em; }
        #sainthetic-home .reference-price-card p { margin:0 0 15px !important; min-height:44px; color:#34415f !important; font-size:.95rem !important; line-height:1.4 !important; }
        #sainthetic-home .reference-price { margin:0 0 14px; color:#101522; font-size:2.65rem; font-weight:850; letter-spacing:-.06em; }
        #sainthetic-home .reference-price span { font-size:.95rem; font-weight:450; letter-spacing:-.02em; }
        #sainthetic-home .reference-price-card ul { display:flex; flex-direction:column; gap:8px; list-style:none; margin:0 0 22px !important; padding:0 !important; color:#111827 !important; font-size:.88rem; }
        #sainthetic-home .reference-price-card li { display:flex; align-items:flex-start; gap:10px; color:#111827 !important; }
        #sainthetic-home .reference-price-card li:before { content:"✓"; font-weight:800; }
        #sainthetic-home .reference-price-card > a,#sainthetic-home .reference-price-card > button { display:flex; align-items:center; justify-content:center; gap:12px; min-height:44px; width:100%; box-sizing:border-box; margin-top:auto; border:1.4px solid #111827; border-radius:999px; background:#fff; color:#111827 !important; font:700 .88rem Inter,ui-sans-serif,system-ui,sans-serif; text-decoration:none; cursor:pointer; }
        #sainthetic-home .reference-price-card.featured > button { background:#090e1d; color:#fff !important; border-color:#090e1d; }
        #sainthetic-home .reference-popular { position:absolute; top:16px; right:16px; padding:7px 13px; border-radius:999px; background:#ffe28a; color:#111827; font-size:.72rem; font-weight:750; }
        #sainthetic-home .reference-price-card.featured h3 { padding-right:112px; }
        #sainthetic-home .reference-price-card.featured > button span { color:#ffe28a; font-size:1.1rem; }
        #sainthetic-home #product-demo { scroll-margin-top:100px; }
        #sainthetic-home #product-demo + section, #sainthetic-home #how-it-works, #sainthetic-home #case-study, #sainthetic-home #faq { scroll-margin-top:100px; }
        #sainthetic-home #how-it-works, #sainthetic-home #case-study, #sainthetic-home #faq { color:#111827; }
        #sainthetic-home #how-it-works h2, #sainthetic-home #case-study h2, #sainthetic-home #faq h2 { color:#111827 !important; }
        #sainthetic-home #how-it-works p, #sainthetic-home #case-study p, #sainthetic-home #faq p { color:#4b5872 !important; }
        #sainthetic-home #case-study > div[style*="linear-gradient"], #sainthetic-home #faq > div > div > div { background:#fff !important; border:1px solid #e9edf3 !important; box-shadow:0 12px 34px rgba(31,42,68,.06) !important; }
        #sainthetic-home footer { color:#5b6579 !important; border-color:#e9edf3 !important; }
        /* Tablet / compact-desktop correction: the legacy #hero media rule was forcing the approved two-column hero into one column. */
        @media (min-width:701px) and (max-width:900px) {
          #sainthetic-home header#hero.reference-hero {
            display:grid !important;
            grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important;
            grid-template-areas:none !important;
            align-items:center !important;
            gap:16px !important;
            min-height:560px !important;
            padding:36px 12px 24px !important;
          }
          #sainthetic-home header#hero.reference-hero > .reference-hero-copy,
          #sainthetic-home header#hero.reference-hero > .reference-visual {
            grid-area:auto !important;
            width:auto !important;
            min-width:0 !important;
          }
          #sainthetic-home .reference-hero h1 {
            font-size:clamp(2.35rem,5.2vw,3.1rem) !important;
          }
          #sainthetic-home .reference-visual { min-height:0 !important; margin-top:0 !important; }
        }
        @media (max-width:900px) {
          #sainthetic-home nav.main-nav { width:calc(100% - 32px); }
          #sainthetic-home .reference-hero { grid-template-columns:1fr 1fr; gap:12px; min-height:560px; }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.5rem,5.6vw,3.3rem) !important; }
          #sainthetic-home .reference-app-window { grid-template-columns:112px minmax(0,1fr); padding-left:12px; padding-right:10px; }
          #sainthetic-home .reference-app-sidebar { font-size:.65rem; }
          #sainthetic-home .reference-persona-panel { margin-left:8px; padding:8px; }
          #sainthetic-home .reference-question { font-size:.64rem; }
          #sainthetic-home .reference-features { padding:0 15px; }
          #sainthetic-home .reference-growth-bar { padding:15px 18px; grid-template-columns:1fr 1fr .8fr; }
        }
        @media (max-width:700px) {
          #sainthetic-home nav.main-nav { width:calc(100% - 24px); min-height:62px; padding:8px 12px !important; }
          #sainthetic-home .desktop-nav { display:none !important; }
          #sainthetic-home .sainthetic-menu-toggle { display:block !important; }
          #sainthetic-home .reference-hero { grid-template-columns:1fr; padding:38px 0 16px; }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.7rem,11vw,4rem) !important; }
          #sainthetic-home .reference-visual { min-height:360px; margin-top:20px; }
          #sainthetic-home .reference-app-window { max-width:560px; transform:rotate(-1deg); }
          #sainthetic-home .reference-features { grid-template-columns:1fr; gap:24px; padding:0 6px; }
          #sainthetic-home .reference-features p br { display:none; }
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr 1fr; gap:12px; }
          #sainthetic-home .growth-message { border:0; padding:0; }
          #sainthetic-home .growth-avatars { grid-column:1/-1; justify-content:flex-start; }
          #sainthetic-home .reference-pricing-grid { grid-template-columns:1fr; }
          #sainthetic-home .reference-price-card { min-height:0; }
          #sainthetic-home .sainthetic-reference-top { padding:0 20px 24px; }
        }
        @media (max-width:420px) {
          #sainthetic-home .reference-app-window { grid-template-columns:92px minmax(0,1fr); padding:42px 8px 12px; }
          #sainthetic-home .reference-app-sidebar { font-size:.58rem; gap:10px; }
          #sainthetic-home .reference-persona-profile { gap:7px; }
          #sainthetic-home .reference-persona-avatar { width:40px; height:40px; flex-basis:40px; font-size:24px; }
          #sainthetic-home .reference-persona-profile strong { font-size:.67rem; }
          #sainthetic-home .reference-tags span { font-size:.55rem; padding:4px 6px; }
          #sainthetic-home .reference-question { font-size:.56rem; white-space:normal; }
          #sainthetic-home .reference-reassurance { gap:9px 13px; font-size:.75rem; }
        }

        /* Desktop correction: override the older #hero grid-area rules that displaced the reference layout. */
        @media (min-width:901px) {
          #sainthetic-home header#hero.reference-hero {
            display:grid !important;
            grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important;
            grid-template-areas:none !important;
            grid-auto-flow:row !important;
            align-items:center !important;
            column-gap:clamp(28px,4vw,64px) !important;
            row-gap:0 !important;
            width:100% !important;
            max-width:1280px !important;
            min-height:0 !important;
            padding:38px 28px 24px !important;
            margin:0 auto !important;
            text-align:left !important;
          }
          #sainthetic-home header#hero.reference-hero > .reference-hero-copy,
          #sainthetic-home header#hero.reference-hero > .reference-visual {
            grid-area:auto !important;
            align-self:center !important;
            width:auto !important;
            min-width:0 !important;
            margin:0 !important;
          }
          #sainthetic-home header#hero.reference-hero > .reference-visual { min-height:0 !important; }
        }
        #sainthetic-home .nav-logo { width:38px !important; height:38px !important; border-radius:11px !important; object-fit:contain !important; background:transparent !important; }
        #sainthetic-home .nav-brand { color:#111827 !important; font-size:1.5rem !important; font-weight:850 !important; letter-spacing:-.055em !important; }

        /* Remove the inherited section spacing above the homepage hero. */
        #sainthetic-home > div[style*="flex: 1"] > .sainthetic-reference-top {
          margin-top:0 !important;
          padding-top:0 !important;
        }
        @media (min-width:901px) {
          #sainthetic-home .sainthetic-reference-top > header#hero.reference-hero {
            padding-top:20px !important;
          }
        }

        /* Final reference proportions: five-line headline, lifted dashboard, tighter vertical rhythm. */
        @media (min-width:901px) {
          #sainthetic-home .sainthetic-reference-top > header#hero.reference-hero {
            grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr) !important;
            column-gap:clamp(28px,3.2vw,44px) !important;
            min-height:0 !important;
            padding-top:20px !important;
            padding-bottom:14px !important;
          }
          #sainthetic-home .reference-hero-copy { min-width:0 !important; }
          #sainthetic-home .reference-hero h1 {
            max-width:none !important;
            font-size:clamp(2.8rem,4.75vw,3.35rem) !important;
            line-height:1.0 !important;
            letter-spacing:-.067em !important;
            margin-bottom:18px !important;
          }
          #sainthetic-home .reference-visual {
            min-height:0 !important;
            transform:translateY(-30px) !important;
          }
          #sainthetic-home .reference-app-window {
            max-width:100% !important;
          }
          #sainthetic-home .reference-features {
            margin-top:0 !important;
            margin-bottom:24px !important;
            gap:24px !important;
          }
          #sainthetic-home .reference-growth-bar {
            min-height:92px !important;
            margin-bottom:28px !important;
          }
          #sainthetic-home .reference-pricing {
            margin-top:0 !important;
          }
        }
        @media (min-width:901px) and (max-width:1100px) {
          #sainthetic-home .sainthetic-reference-top > header#hero.reference-hero {
            grid-template-columns:minmax(0,1.16fr) minmax(0,.84fr) !important;
            column-gap:24px !important;
          }
          #sainthetic-home .reference-hero h1 {
            font-size:clamp(2.7rem,4.55vw,3.05rem) !important;
          }
          #sainthetic-home .reference-visual { transform:translateY(-24px) !important; }
        }

        /* Approved clean-white reference layout: final overrides for the homepage. */
        #sainthetic-home { width:100% !important; min-width:0 !important; background:#fff !important; color:#101522 !important; overflow:hidden !important; font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; }
        #sainthetic-home > div[style*="flex: 1"] { background:#fff !important; overflow:visible !important; }
        #sainthetic-home nav.main-nav { display:flex !important; flex-direction:row !important; align-items:center !important; justify-content:space-between !important; width:calc(100% - 80px) !important; max-width:1240px !important; min-height:72px !important; margin:8px auto 0 !important; padding:10px 18px !important; border:1px solid #edf0f5 !important; border-radius:30px !important; background:rgba(255,255,255,.97) !important; box-shadow:0 12px 34px rgba(25,35,60,.07) !important; position:relative !important; z-index:30 !important; }
        #sainthetic-home .nav-logo { width:38px !important; height:38px !important; border-radius:11px !important; object-fit:contain !important; }
        #sainthetic-home .nav-brand { color:#101522 !important; font-size:1.45rem !important; font-weight:850 !important; letter-spacing:-.055em !important; }
        #sainthetic-home .nav-spacer { display:none !important; }
        #sainthetic-home .nav-right { display:flex !important; flex-direction:row !important; align-items:center !important; gap:6px !important; margin-left:auto !important; }
        #sainthetic-home .nav-right a { color:#182033 !important; padding:11px 13px !important; border-radius:999px !important; font-size:.94rem !important; font-weight:600 !important; text-decoration:none !important; white-space:nowrap !important; }
        #sainthetic-home .nav-right a:hover { background:#fff7dc !important; color:#101522 !important; }
        #sainthetic-home .nav-right a.cta { color:#fff !important; background:#090e1d !important; padding:13px 22px !important; border-radius:999px !important; margin-left:8px !important; box-shadow:none !important; }
        #sainthetic-home .sainthetic-reference-top { width:100% !important; max-width:1240px !important; margin:0 auto !important; padding:0 28px 24px !important; box-sizing:border-box !important; }
        #sainthetic-home header#hero.reference-hero { display:grid !important; grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr) !important; grid-template-areas:none !important; align-items:center !important; gap:clamp(28px,4vw,54px) !important; min-height:0 !important; padding:34px 12px 26px !important; margin:0 auto !important; box-sizing:border-box !important; text-align:left !important; }
        #sainthetic-home .reference-hero::before, #sainthetic-home .reference-hero::after, #sainthetic-home .reference-hero-copy::before, #sainthetic-home .reference-hero-copy::after { content:none !important; display:none !important; }
        #sainthetic-home .reference-hero-copy { min-width:0 !important; }
        #sainthetic-home .reference-eyebrow { margin:0 0 20px !important; }
        #sainthetic-home .reference-hero h1 { max-width:590px !important; margin:0 0 20px !important; color:#101522 !important; -webkit-text-fill-color:#101522 !important; font-size:clamp(3.05rem,4.65vw,4.05rem) !important; line-height:1 !important; font-weight:850 !important; letter-spacing:-.068em !important; text-align:left !important; }
        #sainthetic-home .reference-hero h1 span { color:#101522 !important; -webkit-text-fill-color:#101522 !important; background:linear-gradient(transparent 62%,#ffe28a 62%,#ffe28a 93%,transparent 93%) !important; }
        #sainthetic-home .reference-subtitle { max-width:540px !important; margin:0 0 20px !important; color:#34415f !important; font-size:1.04rem !important; line-height:1.48 !important; }
        #sainthetic-home .reference-actions { display:flex !important; flex-direction:row !important; align-items:center !important; flex-wrap:wrap !important; gap:13px !important; }
        #sainthetic-home .reference-actions a { min-height:46px !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; padding:0 22px !important; border-radius:999px !important; font-size:.96rem !important; font-weight:750 !important; white-space:nowrap !important; }
        #sainthetic-home .reference-primary { background:#090e1d !important; color:#fff !important; }
        #sainthetic-home .reference-secondary { background:#fff !important; color:#101522 !important; border:1.5px solid #111827 !important; }
        #sainthetic-home .reference-reassurance { display:flex !important; flex-wrap:wrap !important; gap:10px 18px !important; margin-top:17px !important; color:#27334d !important; font-size:.82rem !important; }
        #sainthetic-home .reference-visual { min-width:0 !important; min-height:390px !important; display:flex !important; align-items:center !important; justify-content:center !important; transform:translateY(-8px) !important; }
        #sainthetic-home .reference-app-window { width:100% !important; max-width:560px !important; min-height:345px !important; display:grid !important; grid-template-columns:138px minmax(0,1fr) !important; padding:45px 16px 18px !important; border:1px solid #e6e9ef !important; border-radius:28px !important; background:linear-gradient(135deg,#fff,#f6f7fa) !important; box-shadow:0 25px 55px rgba(35,44,65,.16) !important; transform:rotate(-2deg) !important; box-sizing:border-box !important; }
        #sainthetic-home .reference-persona-panel { min-width:0 !important; }
        #sainthetic-home .reference-persona-avatar img, #sainthetic-home .growth-avatars img { image-rendering:auto !important; }
        #sainthetic-home .reference-features { display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:30px !important; padding:0 34px !important; margin:6px 0 30px !important; }
        #sainthetic-home .reference-features article { min-width:0 !important; text-align:left !important; }
        #sainthetic-home .reference-feature-icon { width:50px !important; height:50px !important; margin-bottom:9px !important; border-radius:14px !important; background:#fff0b9 !important; color:#101522 !important; }
        #sainthetic-home .reference-features h3 { margin:0 0 5px !important; color:#101522 !important; font-size:1.35rem !important; font-weight:850 !important; letter-spacing:-.055em !important; }
        #sainthetic-home .reference-features p { margin:0 !important; color:#34415f !important; font-size:1rem !important; line-height:1.38 !important; }
        #sainthetic-home .reference-growth-bar { display:grid !important; grid-template-columns:1.15fr 1.1fr .9fr !important; align-items:center !important; gap:20px !important; min-height:98px !important; padding:15px 28px !important; margin:0 0 34px !important; border:1px solid #edf0f5 !important; border-radius:24px !important; background:#fff !important; box-shadow:0 10px 26px rgba(31,42,68,.065) !important; }
        #sainthetic-home .growth-message { display:flex !important; align-items:center !important; gap:15px !important; padding-right:22px !important; border-right:1px solid #d9deea !important; }
        #sainthetic-home .growth-message strong, #sainthetic-home .growth-count strong { color:#101522 !important; }
        #sainthetic-home .growth-count span { color:#34415f !important; }
        #sainthetic-home .growth-avatars { display:flex !important; justify-content:flex-end !important; }
        #sainthetic-home .growth-avatars span { display:block !important; width:54px !important; height:54px !important; overflow:hidden !important; margin-left:-8px !important; border:2px solid #fff !important; border-radius:50% !important; }
        #sainthetic-home .growth-avatars img { width:100% !important; height:100% !important; object-fit:cover !important; display:block !important; border-radius:50% !important; }
        #sainthetic-home .reference-pricing { max-width:1160px !important; margin:0 auto !important; padding:0 10px !important; text-align:center !important; }
        #sainthetic-home .reference-pricing h2 { margin:0 0 10px !important; color:#101522 !important; font-size:clamp(2.3rem,4vw,3rem) !important; line-height:1.1 !important; font-weight:850 !important; letter-spacing:-.065em !important; }
        #sainthetic-home .pricing-intro { margin:0 0 28px !important; color:#34415f !important; font-size:1.1rem !important; }
        #sainthetic-home .reference-pricing-grid { display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:22px !important; align-items:stretch !important; }
        #sainthetic-home .reference-price-card { display:flex !important; flex-direction:column !important; min-height:340px !important; padding:22px 24px 20px !important; border:1px solid #e9edf3 !important; border-radius:24px !important; background:#fff !important; box-shadow:0 9px 20px rgba(27,38,64,.055) !important; box-sizing:border-box !important; }
        #sainthetic-home .reference-price-card.featured { background:linear-gradient(145deg,#fff9e4,#fffdf5) !important; border-color:#fff0c3 !important; }
        #sainthetic-home .reference-price-card h3 { color:#101522 !important; font-size:1.6rem !important; }
        #sainthetic-home .reference-price-card p { color:#34415f !important; }
        #sainthetic-home .reference-price-card ul, #sainthetic-home .reference-price-card li { color:#111827 !important; }
        #sainthetic-home .reference-price-card > a, #sainthetic-home .reference-price-card > button { min-height:44px !important; margin-top:auto !important; border-radius:999px !important; }
        #sainthetic-home .reference-price-card.featured > button { background:#090e1d !important; color:#fff !important; }
        #sainthetic-home .reference-how-it-works { max-width:1160px !important; margin:30px auto 0 !important; padding:25px 28px 24px !important; box-sizing:border-box !important; border:1px solid #e7ebf2 !important; border-radius:24px !important; background:#fff !important; box-shadow:0 12px 30px rgba(31,42,68,.065) !important; text-align:center !important; }
        #sainthetic-home .reference-how-it-works h2 { margin:0 0 7px !important; color:#101522 !important; font-size:clamp(2rem,3.5vw,2.65rem) !important; font-weight:850 !important; letter-spacing:-.06em !important; }
        #sainthetic-home .reference-how-it-works > p { margin:0 0 22px !important; color:#34415f !important; font-size:1rem !important; }
        #sainthetic-home .reference-how-grid { display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:24px !important; text-align:left !important; }
        #sainthetic-home .reference-how-grid article { display:flex !important; align-items:flex-start !important; gap:12px !important; min-width:0 !important; }
        #sainthetic-home .reference-how-grid article > span { display:grid !important; place-items:center !important; flex:0 0 42px !important; width:42px !important; height:42px !important; border-radius:50% !important; background:#ffe28a !important; color:#101522 !important; font-size:1.2rem !important; font-weight:850 !important; }
        #sainthetic-home .reference-how-grid h3 { margin:5px 0 !important; color:#101522 !important; font-size:1.05rem !important; font-weight:800 !important; }
        #sainthetic-home .reference-how-grid p { margin:0 !important; color:#34415f !important; font-size:.92rem !important; line-height:1.42 !important; }
        #sainthetic-home #product-walkthrough { max-width:1200px !important; margin:54px auto 0 !important; padding:0 20px !important; text-align:center !important; }
        #sainthetic-home #product-walkthrough h2, #sainthetic-home #product-demo h2, #sainthetic-home #case-study h2, #sainthetic-home #faq h2 { color:#101522 !important; }
        #sainthetic-home #product-walkthrough p, #sainthetic-home #product-demo p, #sainthetic-home #case-study p, #sainthetic-home #faq p { color:#4b5872 !important; }
        #sainthetic-home .how-step-wrapper { display:grid !important; grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important; align-items:center !important; gap:44px !important; margin:0 auto 52px !important; text-align:left !important; }
        #sainthetic-home .step-image { border:1px solid #e8edf4 !important; box-shadow:0 12px 30px rgba(31,42,68,.08) !important; }
        #sainthetic-home .step-text h3 { color:#101522 !important; }
        #sainthetic-home .step-text p { color:#4b5872 !important; }
        #sainthetic-home #product-demo, #sainthetic-home #case-study, #sainthetic-home #faq { scroll-margin-top:100px; }
        #sainthetic-home #product-demo { margin:58px auto 0 !important; }
        #sainthetic-home #case-study, #sainthetic-home #faq { margin:70px auto 0 !important; }
        #sainthetic-home #case-study > div[style*="linear-gradient"], #sainthetic-home #faq > div > div > div { background:#fff !important; border:1px solid #e9edf3 !important; box-shadow:0 12px 34px rgba(31,42,68,.06) !important; }
        #sainthetic-home #case-study [style*="color:"], #sainthetic-home #faq [style*="color:"] { color:#34415f !important; }
        #sainthetic-home #faq button { color:#101522 !important; background:#fff !important; }
        #sainthetic-home footer { color:#5b6579 !important; border-color:#e9edf3 !important; background:#fff !important; }
        #sainthetic-home section h2, #sainthetic-home section h3, #sainthetic-home section h4 { color:#101522 !important; }
        #sainthetic-home section p { color:#4b5872 !important; }
        #sainthetic-home .persona-try-demo { background:#fff !important; color:#101522 !important; border:1px solid #e7ebf2 !important; box-shadow:0 12px 30px rgba(31,42,68,.06) !important; }
        #sainthetic-home .persona-try-demo h2, #sainthetic-home .persona-try-demo h3 { color:#101522 !important; }
        #sainthetic-home .persona-try-demo p, #sainthetic-home .persona-try-demo li { color:#4b5872 !important; }
        #sainthetic-home .persona-try-demo input, #sainthetic-home .persona-try-demo select { background:#fff !important; color:#101522 !important; border:1px solid #dfe5ee !important; }
        #sainthetic-home .persona-try-demo input::placeholder { color:#7c879b !important; }
        #sainthetic-home .persona-try-demo button { background:#090e1d !important; color:#fff !important; }
        #sainthetic-home #pricing, #sainthetic-home #how-it-works, #sainthetic-home #product-walkthrough { scroll-margin-top:100px; }
        @media (max-width:1000px) {
          #sainthetic-home nav.main-nav { width:calc(100% - 40px) !important; }
          #sainthetic-home header#hero.reference-hero { grid-template-columns:minmax(0,1fr) minmax(0,.95fr) !important; gap:24px !important; padding-top:28px !important; }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.8rem,5.3vw,3.55rem) !important; }
          #sainthetic-home .reference-app-window { grid-template-columns:108px minmax(0,1fr) !important; padding-left:12px !important; padding-right:10px !important; }
          #sainthetic-home .reference-app-sidebar { font-size:.64rem !important; gap:10px !important; }
          #sainthetic-home .reference-persona-panel { margin-left:8px !important; padding:8px !important; }
          #sainthetic-home .reference-question { font-size:.62rem !important; }
          #sainthetic-home .reference-growth-bar { padding:14px 18px !important; grid-template-columns:1fr 1fr .8fr !important; }
        }
        @media (max-width:760px) {
          #sainthetic-home nav.main-nav { width:calc(100% - 24px) !important; min-height:62px !important; padding:8px 12px !important; }
          #sainthetic-home .desktop-nav { display:none !important; }
          #sainthetic-home .sainthetic-menu-toggle { display:block !important; }
          #sainthetic-home header#hero.reference-hero { grid-template-columns:1fr !important; padding:34px 0 18px !important; gap:0 !important; }
          #sainthetic-home .reference-hero h1 { max-width:620px !important; font-size:clamp(2.7rem,9vw,4rem) !important; }
          #sainthetic-home .reference-visual { min-height:350px !important; margin-top:20px !important; transform:none !important; }
          #sainthetic-home .reference-app-window { max-width:560px !important; transform:rotate(-1deg) !important; }
          #sainthetic-home .reference-features { grid-template-columns:1fr !important; gap:22px !important; padding:0 8px !important; }
          #sainthetic-home .reference-features p br { display:none; }
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr 1fr !important; gap:12px !important; padding:16px !important; }
          #sainthetic-home .growth-message { border:0 !important; padding:0 !important; }
          #sainthetic-home .growth-avatars { grid-column:1/-1 !important; justify-content:flex-start !important; }
          #sainthetic-home .reference-pricing-grid { grid-template-columns:1fr !important; }          #sainthetic-home .reference-price-card { min-height:0 !important; }
          #sainthetic-home .reference-how-grid { grid-template-columns:1fr !important; gap:18px !important; }
          #sainthetic-home .sainthetic-reference-top { padding:0 20px 22px !important; }
          #sainthetic-home .reference-pricing { padding:0 !important; }
          #sainthetic-home .how-step-wrapper { grid-template-columns:1fr !important; gap:20px !important; margin-bottom:40px !important; }
          #sainthetic-home .how-step-wrapper:nth-of-type(even) .step-image { order:0 !important; }
        }
        @media (max-width:420px) {
          #sainthetic-home .nav-brand { font-size:1.2rem !important; }
          #sainthetic-home .nav-logo { width:34px !important; height:34px !important; }
          #sainthetic-home .reference-app-window { grid-template-columns:88px minmax(0,1fr) !important; padding:42px 8px 12px !important; }
          #sainthetic-home .reference-app-sidebar { font-size:.56rem !important; gap:9px !important; }
          #sainthetic-home .reference-persona-profile { gap:7px !important; }
          #sainthetic-home .reference-persona-avatar { width:40px !important; height:40px !important; flex-basis:40px !important; }
          #sainthetic-home .reference-persona-profile strong { font-size:.65rem !important; }
          #sainthetic-home .reference-tags span { font-size:.54rem !important; padding:4px 6px !important; }
          #sainthetic-home .reference-question { font-size:.55rem !important; white-space:normal !important; }
          #sainthetic-home .reference-reassurance { gap:8px 12px !important; font-size:.72rem !important; }
          #sainthetic-home .growth-avatars span { width:46px !important; height:46px !important; }
        }

        /* Final polish: align the three benefit cards, crop each portrait from the sprite,
           and keep the mobile navigation vertical, readable and fully inside the viewport. */
        #sainthetic-home .reference-features {
          align-items:stretch !important;
        }
        #sainthetic-home .reference-features article {
          display:flex !important;
          flex-direction:column !important;
          align-items:flex-start !important;
          min-height:176px !important;
          box-sizing:border-box !important;
        }
        #sainthetic-home .reference-features h3 {
          min-height:2.55em !important;
          display:flex !important;
          align-items:flex-start !important;
          margin-bottom:8px !important;
        }
        #sainthetic-home .reference-features p {
          min-height:4.2em !important;
          flex:1 1 auto !important;
          line-height:1.42 !important;
        }
        #sainthetic-home .reference-persona-avatar,
        #sainthetic-home .growth-avatars span {
          position:relative !important;
          overflow:hidden !important;
          isolation:isolate;
        }
        #sainthetic-home .reference-persona-avatar img,
        #sainthetic-home .growth-avatars img {
          position:absolute !important;
          top:0 !important;
          left:0 !important;
          width:500% !important;
          max-width:none !important;
          height:100% !important;
          object-fit:fill !important;
          border-radius:0 !important;
          image-rendering:auto !important;        }
        #sainthetic-home img.reference-person-0 { transform:translateX(0) !important; }
        #sainthetic-home img.reference-person-1 { transform:translateX(-20%) !important; }
        #sainthetic-home img.reference-person-2 { transform:translateX(-40%) !important; }
        #sainthetic-home img.reference-person-3 { transform:translateX(-60%) !important; }
        #sainthetic-home img.reference-person-4 { transform:translateX(-80%) !important; }
        @media (max-width:800px) {
          #sainthetic-home nav.main-nav {
            position:relative !important;
            z-index:1000 !important;
            overflow:visible !important;
          }
          #sainthetic-home .mobile-dropdown.nav-right {
            display:flex !important;
            flex-direction:column !important;
            align-items:stretch !important;
            justify-content:flex-start !important;
            position:absolute !important;
            top:calc(100% + 8px) !important;
            left:0 !important;
            right:0 !important;
            width:100% !important;
            max-height:calc(100vh - 100px) !important;
            overflow-y:auto !important;
            overflow-x:hidden !important;
            box-sizing:border-box !important;
            margin:0 !important;
            padding:10px !important;
            gap:4px !important;
            background:#fff !important;
            border:1px solid #e8ebf1 !important;
            border-radius:18px !important;
            box-shadow:0 18px 42px rgba(17,24,39,.14) !important;
            z-index:1001 !important;
          }
          #sainthetic-home .mobile-dropdown.nav-right a,
          #sainthetic-home .mobile-dropdown.nav-right a.cta {
            display:flex !important;
            align-items:center !important;
            justify-content:flex-start !important;
            width:100% !important;
            min-width:0 !important;
            min-height:48px !important;
            box-sizing:border-box !important;
            margin:0 !important;
            padding:13px 16px !important;
            border-radius:11px !important;
            font-size:1rem !important;
            line-height:1.35 !important;
            text-align:left !important;
            white-space:normal !important;
            overflow:visible !important;
            overflow-wrap:break-word !important;
            word-break:normal !important;
          }
          #sainthetic-home .mobile-dropdown.nav-right a.cta {
            justify-content:center !important;
            margin-top:5px !important;
            background:#090e1d !important;
            color:#fff !important;
          }
          #sainthetic-home .mobile-dropdown.nav-right a::after {
            display:none !important;
          }
        }

        /* Product walkthrough redesign */
        #sainthetic-home #product-walkthrough {
          max-width:1280px !important; margin:76px auto 0 !important;
          padding:0 clamp(20px,4vw,54px) !important; text-align:left !important;
        }
        #sainthetic-home #product-walkthrough > h2 {
          max-width:760px !important; margin:0 auto 12px !important;
          color:#111827 !important; font-size:clamp(2.25rem,4.2vw,3.45rem) !important;
          line-height:1.04 !important; letter-spacing:-.065em !important; text-align:center !important;
        }
        #sainthetic-home #product-walkthrough > p {
          max-width:680px !important; margin:0 auto 64px !important;
          color:#536078 !important; font-size:clamp(1rem,1.6vw,1.18rem) !important;
          line-height:1.6 !important; text-align:center !important;
        }
        #sainthetic-home .how-step-wrapper {
          display:grid !important; grid-template-columns:minmax(0,1.04fr) minmax(0,.96fr) !important;
          align-items:center !important; gap:clamp(34px,5vw,76px) !important;
          margin:0 auto 78px !important; padding:0 !important;
          border:0 !important; border-radius:0 !important; background:transparent !important; box-shadow:none !important;
        }
        #sainthetic-home .how-step-wrapper:nth-child(even) .step-image { order:2 !important; }
        #sainthetic-home .how-step-wrapper:nth-child(even) .step-text { order:1 !important; }
        #sainthetic-home .step-image {
          width:100% !important; min-width:0 !important; padding:0 !important; overflow:hidden !important;
          border:1px solid #dfe4ed !important; border-radius:24px !important; background:#111827 !important;
          box-shadow:0 22px 55px rgba(24,35,60,.16) !important; transform:translateZ(0);
        }
        #sainthetic-home .step-image img {
          display:block !important; width:100% !important; height:auto !important;
          max-width:100% !important; object-fit:contain !important;
        }
        #sainthetic-home .step-text { min-width:0 !important; padding:8px 0 !important; text-align:left !important; }
        #sainthetic-home .step-text > div:first-child {
          display:inline-flex !important; align-items:center !important; justify-content:center !important;
          min-width:88px !important; min-height:42px !important; box-sizing:border-box !important;
          margin:0 0 24px !important; padding:8px 17px !important; border:1px solid #f1dfaa !important;
          border-radius:12px !important; background:#fbf5e4 !important; color:#80601b !important;
          font-size:.88rem !important; font-weight:800 !important; letter-spacing:.08em !important;
        }
        #sainthetic-home .step-text h3 {
          margin:0 0 18px !important; color:#111827 !important;
          font-size:clamp(2.2rem,4.1vw,3.35rem) !important; line-height:1.04 !important;
          font-weight:850 !important; letter-spacing:-.065em !important; text-wrap:balance !important;
        }
        #sainthetic-home .step-text > p {
          max-width:640px !important; margin:0 !important; color:#536078 !important;
          font-size:clamp(1.02rem,1.65vw,1.2rem) !important; line-height:1.62 !important;
        }
        #sainthetic-home .step-highlights {
          display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:12px !important; margin-top:28px !important;
        }
        #sainthetic-home .step-highlight {
          display:flex !important; align-items:flex-start !important; gap:10px !important;
          min-width:0 !important; min-height:92px !important; box-sizing:border-box !important;
          padding:14px 12px !important; border:1px solid #e8edf4 !important; border-radius:17px !important;
          background:linear-gradient(180deg,#fff 0%,#fbfcfe 100%) !important;
          box-shadow:0 6px 18px rgba(26,39,67,.045) !important;
        }
        #sainthetic-home .step-highlight-icon {
          display:grid !important; place-items:center !important; flex:0 0 34px !important;
          width:34px !important; height:34px !important; border-radius:11px !important;
          background:#fff2c9 !important; color:#936600 !important; font-size:1.1rem !important; font-weight:800 !important;
        }
        #sainthetic-home .step-highlight-copy { display:flex !important; flex-direction:column !important; gap:4px !important; min-width:0 !important; }
        #sainthetic-home .step-highlight-copy strong { color:#111827 !important; font-size:.82rem !important; line-height:1.2 !important; font-weight:800 !important; }
        #sainthetic-home .step-highlight-copy small { color:#5b667b !important; font-size:.72rem !important; line-height:1.35 !important; }
        @media (max-width:1000px) {
          #sainthetic-home .how-step-wrapper { grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important; gap:28px !important; margin-bottom:62px !important; }
          #sainthetic-home .step-highlights { grid-template-columns:1fr !important; gap:9px !important; margin-top:22px !important; }
          #sainthetic-home .step-highlight { min-height:0 !important; padding:10px 12px !important; }
          #sainthetic-home .step-highlight-icon { flex-basis:30px !important; width:30px !important; height:30px !important; }
        }
        @media (max-width:700px) {
          #sainthetic-home #product-walkthrough { margin-top:54px !important; padding:0 18px !important; }
          #sainthetic-home #product-walkthrough > p { margin-bottom:38px !important; }
          #sainthetic-home .how-step-wrapper { display:flex !important; flex-direction:column !important; align-items:stretch !important; gap:24px !important; margin-bottom:54px !important; }
          #sainthetic-home .how-step-wrapper:nth-child(even) .step-image,
          #sainthetic-home .how-step-wrapper:nth-child(even) .step-text { order:initial !important; }
          #sainthetic-home .step-image { border-radius:18px !important; }
          #sainthetic-home .step-text { padding:0 2px !important; }
          #sainthetic-home .step-text > div:first-child { margin-bottom:16px !important; }
          #sainthetic-home .step-text h3 { font-size:clamp(2rem,9vw,2.8rem) !important; margin-bottom:13px !important; }
          #sainthetic-home .step-text > p { font-size:1rem !important; }
          #sainthetic-home .step-highlights { grid-template-columns:repeat(2,minmax(0,1fr)) !important; gap:9px !important; margin-top:20px !important; }
          #sainthetic-home .step-highlight { min-height:88px !important; padding:11px 9px !important; gap:8px !important; }
          #sainthetic-home .step-highlight-copy strong { font-size:.78rem !important; }
          #sainthetic-home .step-highlight-copy small { font-size:.68rem !important; }
        }
        @media (max-width:390px) {
          #sainthetic-home .step-highlights { grid-template-columns:1fr !important; }
          #sainthetic-home .step-highlight { min-height:0 !important; }
        }
      `}</style>







      <style>{`
        /* Warm, human-centred finishing system for the full landing page */
        #sainthetic-home {
          background:#fffdf8 !important;
          color:#172033 !important;
          --human-ink:#172033;
          --human-muted:#536078;
          --human-cream:#fff7df;
          --human-yellow:#f6d875;
        }
        #sainthetic-home > div[style*="flex: 1"] {
          background:linear-gradient(180deg,#fffdf8 0%,#ffffff 42%,#fffdf8 100%) !important;
        }
        #sainthetic-home nav.main-nav {
          background:rgba(255,255,255,.94) !important;
          border-color:#f0eadb !important;
          box-shadow:0 12px 32px rgba(47,48,55,.055) !important;
        }
        #sainthetic-home .reference-eyebrow,
        #sainthetic-home .reference-feature-icon,
        #sainthetic-home .growth-icon {
          background:#fff1c4 !important;
        }
        #sainthetic-home .reference-hero h1 { color:#182033 !important; }
        #sainthetic-home .reference-hero h1 span {
          background:linear-gradient(transparent 64%,#f8df8d 64%,#f8df8d 92%,transparent 92%) !important;
        }
        #sainthetic-home .reference-subtitle,
        #sainthetic-home .reference-reassurance,
        #sainthetic-home .reference-features p,
        #sainthetic-home .reference-how-it-works > p { color:#58647a !important; }
        #sainthetic-home .reference-human-note {
          display:flex !important;
          align-items:center !important;
          gap:13px !important;
          margin-top:23px !important;
          padding:12px 15px !important;
          width:max-content !important;
          max-width:100% !important;
          border:1px solid #f0eadb !important;
          border-radius:16px !important;
          background:rgba(255,255,255,.82) !important;
          box-shadow:0 7px 22px rgba(48,48,55,.045) !important;
        }
        #sainthetic-home .reference-human-faces {
          display:flex !important;
          flex:0 0 auto !important;
          padding-left:4px !important;
        }
        #sainthetic-home .reference-human-faces span {
          position:relative !important;
          display:block !important;
          width:37px !important;
          height:37px !important;
          margin-left:-5px !important;
          overflow:hidden !important;
          border:2px solid #fff !important;
          border-radius:50% !important;
          background:#f3e5cf !important;
          box-shadow:0 2px 7px rgba(25,35,55,.12) !important;
        }
        #sainthetic-home .reference-human-faces img {
          position:absolute !important;
          top:0 !important;
          left:0 !important;
          width:500% !important;
          max-width:none !important;
          height:100% !important;
          object-fit:fill !important;
          border-radius:0 !important;
        }
        #sainthetic-home .reference-human-faces .reference-person-1 { transform:translateX(-20%) !important; }
        #sainthetic-home .reference-human-faces .reference-person-2 { transform:translateX(-40%) !important; }
        #sainthetic-home .reference-human-faces .reference-person-3 { transform:translateX(-60%) !important; }
        #sainthetic-home .reference-human-note p {
          margin:0 !important;
          color:#667085 !important;
          font-size:.78rem !important;
          line-height:1.35 !important;
        }
        #sainthetic-home .reference-human-note strong {
          color:#263149 !important;
          font-size:.84rem !important;
          font-weight:750 !important;
        }
        #sainthetic-home .reference-growth-bar,
        #sainthetic-home .reference-price-card,
        #sainthetic-home .feature-card {
          border-color:#eee9df !important;
          box-shadow:0 10px 28px rgba(54,49,38,.055) !important;
        }
        #sainthetic-home .reference-how-it-works {
          max-width:1190px !important;
          margin:46px auto 0 !important;
          padding:34px 30px 30px !important;
          border:1px solid #f0eadf !important;
          border-radius:28px !important;
          background:linear-gradient(180deg,#fffefa 0%,#fff 100%) !important;
          box-shadow:0 18px 42px rgba(47,48,55,.055) !important;
        }
        #sainthetic-home .reference-how-it-works h2 {
          font-size:clamp(2.15rem,3.5vw,2.8rem) !important;
          letter-spacing:-.065em !important;
        }
        #sainthetic-home .reference-how-it-works > p {
          margin-bottom:28px !important;
          font-size:1.03rem !important;
        }
        #sainthetic-home .reference-how-grid {
          display:grid !important;
          grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:18px !important;
          align-items:stretch !important;
        }
        #sainthetic-home .reference-how-grid .reference-how-card {
          display:flex !important;
          flex-direction:column !important;
          min-width:0 !important;
          overflow:hidden !important;
          border:1px solid #e8eaf0 !important;
          border-radius:21px !important;
          background:#fff !important;
          box-shadow:0 9px 24px rgba(31,42,68,.065) !important;
          transition:transform .22s ease,box-shadow .22s ease !important;
        }
        #sainthetic-home .reference-how-grid .reference-how-card:hover {
          transform:translateY(-4px) !important;
          box-shadow:0 16px 32px rgba(31,42,68,.11) !important;
        }
        #sainthetic-home .reference-how-image {
          position:relative !important;
          width:100% !important;
          aspect-ratio:1.55 / 1 !important;
          overflow:hidden !important;
          background:#171b2b !important;
          border-bottom:1px solid #e8eaf0 !important;
        }
        #sainthetic-home .reference-how-image img {
          display:block !important;
          width:100% !important;
          height:100% !important;
          object-fit:cover !important;
          object-position:top center !important;
          transition:transform .35s ease !important;
        }
        #sainthetic-home .reference-how-card:hover .reference-how-image img {
          transform:scale(1.035) !important;
        }
        #sainthetic-home .reference-how-card-copy {
          display:flex !important;
          align-items:flex-start !important;
          gap:13px !important;
          padding:20px 18px 21px !important;
          text-align:left !important;
        }
        #sainthetic-home .reference-how-number {
          display:grid !important;
          place-items:center !important;
          flex:0 0 36px !important;
          width:36px !important;
          height:36px !important;
          border-radius:12px !important;
          background:#fff0bd !important;
          color:#624b13 !important;
          font-size:.85rem !important;
          font-weight:850 !important;
        }
        #sainthetic-home .reference-how-card-copy h3 {
          margin:1px 0 6px !important;
          color:#182033 !important;
          font-size:1.08rem !important;
          font-weight:800 !important;
          letter-spacing:-.035em !important;
        }
        #sainthetic-home .reference-how-card-copy p {
          margin:0 !important;
          color:#657087 !important;
          font-size:.9rem !important;
          line-height:1.45 !important;
        }
        #sainthetic-home .reference-price-card.featured {
          background:linear-gradient(150deg,#fff9e8,#fffdf7) !important;
          border-color:#f1dc9d !important;
        }
        #sainthetic-home #product-walkthrough {
          margin-top:76px !important;
        }
        #sainthetic-home .step-image {
          border:1px solid #e9e5dc !important;
          border-radius:24px !important;
          background:#171b2b !important;
          box-shadow:0 20px 48px rgba(39,43,55,.13) !important;
        }
        #sainthetic-home .step-text > div:first-child {
          background:#fff3cd !important;
          border:1px solid #f0dfa9 !important;
          color:#755b1c !important;
        }
        #sainthetic-home #faq > div > div > div {
          overflow:hidden !important;
          border:1px solid #ece8df !important;
          border-radius:20px !important;
          box-shadow:0 8px 24px rgba(45,45,45,.045) !important;
        }
        #sainthetic-home #faq button {
          display:flex !important;
          align-items:center !important;
          gap:14px !important;
          min-height:76px !important;
          padding:17px 20px !important;
        }
        #sainthetic-home .faq-question-icon {
          display:grid !important;
          place-items:center !important;
          flex:0 0 42px !important;
          width:42px !important;
          height:42px !important;
          border-radius:13px !important;
          background:#fff2c8 !important;
          color:#71581d !important;
          font-size:1.25rem !important;
        }
        #sainthetic-home .faq-question-text {
          flex:1 1 auto !important;
          min-width:0 !important;
          color:#202b40 !important;
          font-size:1.03rem !important;
          font-weight:750 !important;
          line-height:1.35 !important;
          text-align:left !important;
        }
        #sainthetic-home .faq-chevron {
          flex:0 0 auto !important;
          margin-left:6px !important;
          color:#987a34 !important;
          font-size:1.7rem !important;
          line-height:1 !important;
        }
        #sainthetic-home #faq [style*="overflow: hidden"] p {
          padding-left:56px !important;
          color:#667085 !important;
        }
        #sainthetic-home footer {
          background:transparent !important;
          border-color:#eee9df !important;
        }
        @media (max-width:900px) {
          #sainthetic-home .reference-how-grid { grid-template-columns:1fr !important; }
          #sainthetic-home .reference-how-grid .reference-how-card { display:grid !important; grid-template-columns:minmax(0,.9fr) minmax(0,1fr) !important; }
          #sainthetic-home .reference-how-image { height:100% !important; min-height:170px !important; aspect-ratio:auto !important; border-bottom:0 !important; border-right:1px solid #e8eaf0 !important; }
          #sainthetic-home .reference-how-card-copy { align-items:center !important; padding:20px !important; }
        }
        @media (max-width:760px) {
          #sainthetic-home .reference-human-note { margin-top:18px !important; }
          #sainthetic-home .reference-how-it-works { margin:28px 16px 0 !important; padding:26px 16px 18px !important; }
          #sainthetic-home .reference-how-grid { gap:13px !important; }
          #sainthetic-home .reference-how-grid .reference-how-card { grid-template-columns:minmax(0,1fr) !important; }
          #sainthetic-home .reference-how-image { min-height:0 !important; aspect-ratio:1.55 / 1 !important; border-right:0 !important; border-bottom:1px solid #e8eaf0 !important; }
          #sainthetic-home .reference-how-card-copy { padding:15px 14px 17px !important; }
          #sainthetic-home .reference-how-card-copy h3 { font-size:1rem !important; }
          #sainthetic-home .reference-how-card-copy p { font-size:.84rem !important; }
          #sainthetic-home .faq-question-icon { flex-basis:36px !important; width:36px !important; height:36px !important; }
          #sainthetic-home #faq button { min-height:68px !important; padding:14px 13px !important; gap:10px !important; }
          #sainthetic-home .faq-question-text { font-size:.92rem !important; }
          #sainthetic-home #faq [style*="overflow: hidden"] p { padding-left:0 !important; }
        }
        @media (max-width:420px) {
          #sainthetic-home .reference-human-note { width:100% !important; box-sizing:border-box !important; }
          #sainthetic-home .reference-human-note p { font-size:.72rem !important; }
          #sainthetic-home .reference-human-note strong { font-size:.76rem !important; }
          #sainthetic-home .faq-question-text { font-size:.86rem !important; }
        }      
        /* Human buyer-persona preview: real portrait imagery alongside the product UI. */
        #sainthetic-home .reference-how-persona-preview {
          display:flex !important;
          flex-direction:column !important;
          align-items:stretch !important;
          justify-content:center !important;
          gap:11px !important;
          padding:14px !important;
          aspect-ratio:1.48 / 1 !important;
          background:linear-gradient(145deg,#f3f1eb,#faf8f2) !important;
        }
        #sainthetic-home .reference-how-screenshot-wrap {
          position:relative !important;
          flex:1 1 0 !important;
          min-height:0 !important;
          width:100% !important;
          height:62% !important;
          display:flex !important;
          align-items:center !important;
          justify-content:center !important;
        }
        #sainthetic-home .reference-how-screenshot-wrap .reference-how-persona-screenshot {
          width:100% !important;
          height:100% !important;
          object-fit:contain !important;
          object-position:center !important;
        }
        #sainthetic-home .reference-how-screenshot-portraits {
          position:absolute !important;
          inset:0 !important;
          pointer-events:none !important;
        }
        #sainthetic-home .reference-how-screenshot-portraits > span {
          position:absolute !important;
          top:7.2% !important;
          display:block !important;
          width:5.9% !important;
          aspect-ratio:1 !important;
          overflow:hidden !important;
          border-radius:50% !important;
          background:#d9c7ae !important;
          box-shadow:0 0 0 1px rgba(245,213,110,.6),0 2px 5px rgba(0,0,0,.22) !important;
        }
        #sainthetic-home .reference-how-screenshot-portraits .portrait-one { left:19.8% !important; }
        #sainthetic-home .reference-how-screenshot-portraits .portrait-two { left:47.3% !important; }
        #sainthetic-home .reference-how-screenshot-portraits .portrait-three { left:74.8% !important; }
        #sainthetic-home .reference-how-screenshot-portraits img {
          position:absolute !important;
          top:0 !important;
          left:0 !important;
          display:block !important;
          width:500% !important;
          max-width:none !important;
          height:100% !important;
          object-fit:fill !important;
          border:0 !important;
          border-radius:0 !important;
          box-shadow:none !important;
        }        #sainthetic-home .reference-how-screenshot-portraits .portrait-one img { transform:translateX(0) !important; }
        #sainthetic-home .reference-how-screenshot-portraits .portrait-two img { transform:translateX(-20%) !important; }
        #sainthetic-home .reference-how-screenshot-portraits .portrait-three img { transform:translateX(-40%) !important; }
        #sainthetic-home .reference-how-persona-screenshot {
          flex:1 1 0 !important;
          min-height:0 !important;
          width:100% !important;
          height:62% !important;
          object-fit:contain !important;
          object-position:center !important;
          border:1px solid rgba(32,39,53,.08) !important;
          border-radius:10px !important;
          background:#fff !important;
          box-shadow:0 6px 16px rgba(28,36,52,.09) !important;
        }
        #sainthetic-home .reference-how-people {
          display:grid !important;
          grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:7px !important;
          min-width:0 !important;
        }
        #sainthetic-home .reference-how-person {
          display:flex !important;
          align-items:center !important;
          gap:7px !important;
          min-width:0 !important;
          padding:7px 6px !important;
          border:1px solid #e8e2d5 !important;
          border-radius:11px !important;
          background:rgba(255,255,255,.94) !important;
          box-shadow:0 3px 9px rgba(34,39,50,.045) !important;
        }
        #sainthetic-home .reference-how-person > span {
          position:relative !important;
          display:block !important;
          flex:0 0 32px !important;
          width:32px !important;
          height:32px !important;
          overflow:hidden !important;
          border-radius:50% !important;
          background:#eadfce !important;
        }
        #sainthetic-home .reference-how-person > span img {
          position:absolute !important;
          top:0 !important;
          left:0 !important;
          width:500% !important;
          max-width:none !important;
          height:100% !important;
          object-fit:fill !important;
          border:0 !important;
          border-radius:0 !important;
          box-shadow:none !important;
        }
        #sainthetic-home .reference-how-person > div {
          display:flex !important;
          flex-direction:column !important;
          gap:2px !important;
          min-width:0 !important;
        }
        #sainthetic-home .reference-how-person strong {
          overflow:hidden !important;
          color:#293247 !important;
          font-size:.62rem !important;
          font-weight:800 !important;
          line-height:1.15 !important;
          text-overflow:ellipsis !important;
          white-space:nowrap !important;
        }
        #sainthetic-home .reference-how-person small {
          overflow:hidden !important;
          color:#7b8290 !important;
          font-size:.54rem !important;
          line-height:1.15 !important;
          text-overflow:ellipsis !important;
          white-space:nowrap !important;
        }
        @media (max-width:900px) {
          #sainthetic-home .reference-how-person > span { flex-basis:38px !important; width:38px !important; height:38px !important; }
          #sainthetic-home .reference-how-person strong { font-size:.7rem !important; }
          #sainthetic-home .reference-how-person small { font-size:.6rem !important; }
        }
        @media (max-width:600px) {
          #sainthetic-home .reference-how-persona-preview { aspect-ratio:1.38 / 1 !important; padding:10px !important; gap:8px !important; }
          #sainthetic-home .reference-how-person { gap:5px !important; padding:6px 4px !important; }
          #sainthetic-home .reference-how-person > span { flex-basis:30px !important; width:30px !important; height:30px !important; }
          #sainthetic-home .reference-how-person strong { font-size:.58rem !important; }
          #sainthetic-home .reference-how-person small { display:none !important; }
        }

        /* Premium product cards: show the real interface, not cropped thumbnails in generic boxes. */
        #sainthetic-home .reference-how-it-works {
          max-width:1240px !important;
          padding:clamp(28px,4vw,48px) !important;
          border:1px solid #eee8dc !important;
          border-radius:32px !important;
          background:linear-gradient(145deg,#fffefa 0%,#fff 58%,#fffaf0 100%) !important;
          box-shadow:0 22px 60px rgba(48,43,32,.07) !important;
        }
        #sainthetic-home .reference-how-it-works h2 { margin-bottom:10px !important; }
        #sainthetic-home .reference-how-it-works > p { margin-bottom:34px !important; }
        #sainthetic-home .reference-how-grid {
          grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:20px !important;
          align-items:stretch !important;
        }
        #sainthetic-home .reference-how-grid .reference-how-card {
          display:flex !important;
          flex-direction:column !important;
          min-width:0 !important;
          overflow:hidden !important;
          border:1px solid #e8e5dc !important;
          border-radius:24px !important;
          background:#fff !important;
          box-shadow:0 8px 22px rgba(35,39,49,.045) !important;
          transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease !important;
        }
        #sainthetic-home .reference-how-grid .reference-how-card:hover {
          transform:translateY(-6px) !important;
          border-color:#e4d5aa !important;
          box-shadow:0 22px 42px rgba(35,39,49,.11) !important;
        }
        #sainthetic-home .reference-how-card-top {
          display:flex !important;
          justify-content:space-between !important;
          align-items:center !important;
          gap:8px !important;
          min-height:48px !important;
          padding:0 17px !important;
          border-bottom:1px solid #efede7 !important;
          background:#fffefa !important;
          color:#7b6b48 !important;
          font-size:.67rem !important;
          font-weight:800 !important;
          letter-spacing:.09em !important;
        }
        #sainthetic-home .reference-how-live {
          display:inline-flex !important;
          align-items:center !important;
          gap:6px !important;
          color:#899080 !important;
          font-size:.58rem !important;
          letter-spacing:.07em !important;
          white-space:nowrap !important;
        }
        #sainthetic-home .reference-how-live i {
          width:6px !important;height:6px !important;border-radius:50% !important;
          background:#83a889 !important;display:inline-block !important;
        }
        #sainthetic-home .reference-how-image {
          display:flex !important;
          align-items:center !important;
          justify-content:center !important;
          aspect-ratio:1.48 / 1 !important;
          min-height:0 !important;
          padding:15px !important;
          box-sizing:border-box !important;
          overflow:hidden !important;
          background:linear-gradient(145deg,#f4f3ef,#f9f8f5) !important;
          border-bottom:1px solid #eeece6 !important;
        }
        #sainthetic-home .reference-how-image img {
          width:100% !important;
          height:100% !important;
          display:block !important;
          object-fit:contain !important;
          object-position:center !important;
          border:1px solid rgba(32,39,53,.08) !important;
          border-radius:10px !important;
          background:#fff !important;
          box-shadow:0 8px 22px rgba(28,36,52,.12) !important;
          transition:transform .35s ease !important;
        }
        #sainthetic-home .reference-how-card:hover .reference-how-image img { transform:translateY(-2px) scale(1.015) !important; }
        #sainthetic-home .reference-how-card-copy {
          display:grid !important;
          grid-template-columns:38px minmax(0,1fr) !important;
          align-items:start !important;
          gap:13px !important;
          flex:1 1 auto !important;
          padding:22px 19px 22px !important;
          text-align:left !important;
        }
        #sainthetic-home .reference-how-number {
          display:grid !important;
          place-items:center !important;
          width:38px !important;height:38px !important;
          border-radius:13px !important;
          background:#fff2cc !important;
          color:#70561b !important;
          font-size:.8rem !important;
          font-weight:850 !important;
        }
        #sainthetic-home .reference-how-card-copy h3 {
          margin:2px 0 9px !important;
          color:#172033 !important;
          font-size:clamp(1.08rem,1.45vw,1.28rem) !important;
          line-height:1.15 !important;
          font-weight:800 !important;
          letter-spacing:-.045em !important;
        }
        #sainthetic-home .reference-how-card-copy p {
          margin:0 !important;
          color:#667085 !important;
          font-size:.91rem !important;
          line-height:1.55 !important;
        }
        #sainthetic-home .reference-how-outcome {
          display:flex !important;
          justify-content:space-between !important;
          align-items:center !important;
          gap:8px !important;
          margin-top:17px !important;
          padding-top:13px !important;
          border-top:1px solid #f0eee8 !important;
          color:#8a7441 !important;
          font-size:.74rem !important;
          font-weight:700 !important;
        }
        #sainthetic-home .reference-how-outcome b { font-size:1rem !important; font-weight:600 !important; }
        @media (max-width:900px) {
          #sainthetic-home .reference-how-grid { grid-template-columns:1fr !important; gap:16px !important; }
          #sainthetic-home .reference-how-grid .reference-how-card { display:grid !important; grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr) !important; grid-template-rows:44px 1fr !important; }
          #sainthetic-home .reference-how-card-top { grid-column:1 / -1 !important; }
          #sainthetic-home .reference-how-image { grid-column:1 !important; grid-row:2 !important; height:100% !important; aspect-ratio:auto !important; border-right:1px solid #eeece6 !important; border-bottom:0 !important; }
          #sainthetic-home .reference-how-card-copy { grid-column:2 !important; grid-row:2 !important; align-content:center !important; padding:20px !important; }
        }
        @media (max-width:600px) {
          #sainthetic-home .reference-how-it-works { margin:28px 12px 0 !important; padding:26px 14px 16px !important; border-radius:24px !important; }
          #sainthetic-home .reference-how-it-works > p { margin-bottom:24px !important; }
          #sainthetic-home .reference-how-grid .reference-how-card { display:flex !important; }
          #sainthetic-home .reference-how-card-top { min-height:42px !important; padding:0 13px !important; }
          #sainthetic-home .reference-how-image { aspect-ratio:1.4 / 1 !important; padding:10px !important; border-right:0 !important; border-bottom:1px solid #eeece6 !important; }
          #sainthetic-home .reference-how-card-copy { padding:17px 15px 18px !important; }
          #sainthetic-home .reference-how-card-copy h3 { font-size:1.08rem !important; }
          #sainthetic-home .reference-how-card-copy p { font-size:.88rem !important; }
        }
      `}</style>


      <style>{`
        /* Founder-led hero: supplied portrait-based artwork and live LinkedIn attribution. */
        #sainthetic-home .reference-hero {
          grid-template-columns:minmax(0,.96fr) minmax(0,1.04fr) !important;
          gap:18px !important;
          min-height:570px !important;
          padding-top:30px !important;
          padding-bottom:18px !important;
        }
        #sainthetic-home .reference-hero h1 {
          font-size:clamp(2.65rem,4.7vw,3.85rem) !important;
          line-height:1.04 !important;
        }
        #sainthetic-home .reference-visual.reference-hero-photo {
          display:flex !important; flex-direction:column !important;
          align-items:center !important; justify-content:center !important;
          gap:12px !important; width:100% !important; min-width:0 !important;
          min-height:0 !important; padding:0 !important; overflow:visible !important;
          border:0 !important; border-radius:0 !important;
          background:transparent !important; box-shadow:none !important;
        }
        #sainthetic-home .reference-hero-photo-image {
          display:block !important; width:100% !important; height:auto !important;
          max-width:100% !important; aspect-ratio:400 / 336 !important;
          object-fit:cover !important; object-position:center !important;
          border:0 !important; border-radius:0 0 3px 3px !important; box-shadow:none !important;
        }
        #sainthetic-home .reference-linkedin-credit {
          display:inline-flex !important; align-items:center !important; justify-content:center !important;
          gap:10px !important; max-width:calc(100% - 20px) !important; min-height:42px !important;
          padding:6px 15px 6px 9px !important; margin-top:-3px !important;
          border:1px solid #e8ebf1 !important; border-radius:999px !important;
          background:rgba(255,255,255,.97) !important;
          box-shadow:0 8px 22px rgba(19,31,51,.11) !important;
          color:#172033 !important; font-size:.84rem !important; line-height:1.1 !important;
          text-decoration:none !important; transition:transform .2s ease,box-shadow .2s ease !important;
        }
        #sainthetic-home .reference-linkedin-credit:hover {
          transform:translateY(-2px) !important; box-shadow:0 11px 25px rgba(19,31,51,.16) !important;
        }
        #sainthetic-home .reference-linkedin-icon {
          display:grid !important; place-items:center !important; flex:0 0 25px !important;
          width:25px !important; height:25px !important; border-radius:5px !important;
          background:#0a66c2 !important; color:#fff !important; font-family:Arial,sans-serif !important;
          font-size:17px !important; font-weight:800 !important; letter-spacing:-1.2px !important;
        }
        #sainthetic-home .reference-linkedin-credit strong {
          color:#172033 !important; font-weight:750 !important; white-space:nowrap !important;
        }
        #sainthetic-home .reference-linkedin-external {
          color:#647087 !important; font-size:1rem !important; font-weight:700 !important;
        }
        @media (max-width:900px) {
          #sainthetic-home .reference-hero {
            grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important;
            min-height:0 !important; gap:12px !important;
          }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.15rem,5vw,3rem) !important; }
        }
        @media (max-width:760px) {
          #sainthetic-home .reference-hero {
            grid-template-columns:1fr !important; gap:22px !important; padding:30px 0 16px !important;
          }
          #sainthetic-home .reference-hero-copy { order:1 !important; }
          #sainthetic-home .reference-visual.reference-hero-photo { order:2 !important; }
          #sainthetic-home .reference-hero h1 {
            max-width:620px !important; font-size:clamp(2.5rem,9vw,3.55rem) !important;
          }
          #sainthetic-home .reference-hero-photo-image {
            width:100% !important; max-height:480px !important;
            object-fit:cover !important; object-position:33.333% center !important;
          }
          #sainthetic-home .reference-linkedin-credit { min-height:40px !important; font-size:.8rem !important; }
        }
      `}</style>


      <style>{`
        /* Final image rendering pass: keep product UI crisp and avoid enlarged, cropped thumbnails. */
        #sainthetic-home .reference-hero-photo-image {
          width:100% !important;
          height:auto !important;
          max-width:100% !important;
          aspect-ratio:400 / 336 !important;
          object-fit:contain !important;
          object-position:center !important;
          image-rendering:auto !important;
          border-radius:22px !important;
          background:#f6f4ee !important;
          box-shadow:0 20px 50px rgba(25,35,55,.12) !important;
        }
        #sainthetic-home .reference-how-image {
          background:#f8f9fb !important;
        }
        #sainthetic-home .reference-how-image > img,
        #sainthetic-home .reference-how-screenshot-wrap > img {
          width:100% !important;
          height:100% !important;
          max-width:100% !important;
          object-fit:contain !important;
          object-position:center !important;
          image-rendering:auto !important;
          background:#fff !important;
        }
        #sainthetic-home .step-image img {
          width:100% !important;
          height:auto !important;
          max-width:100% !important;
          object-fit:contain !important;
          image-rendering:auto !important;
        }
        #sainthetic-home .growth-avatars img,
        #sainthetic-home .reference-how-person > span img {
          image-rendering:auto !important;
          object-fit:cover !important;
        }
        @media (max-width:760px) {
          #sainthetic-home .reference-hero-photo-image {
            aspect-ratio:1.2 / 1 !important;
            object-fit:contain !important;
          }
        }
      `}</style>

      <style>{`
        /* Final accessibility and founder-hero presentation fixes. */
        #sainthetic-home .reference-linkedin-credit {
          min-height:64px !important;
          padding:12px 26px 12px 18px !important;
          gap:14px !important;
          background:#111827 !important;
          border:1px solid #111827 !important;
          box-shadow:0 14px 32px rgba(17,24,39,.2) !important;
          color:#fff !important;
          font-size:1.02rem !important;
        }
        #sainthetic-home .reference-linkedin-credit strong {
          color:#fff !important;
          font-size:1.02rem !important;
          font-weight:800 !important;
        }
        #sainthetic-home .reference-linkedin-external {
          color:#dbe4f0 !important;
          font-size:1.25rem !important;
          font-weight:800 !important;
        }
        #sainthetic-home .reference-linkedin-icon {
          flex-basis:34px !important;width:34px !important;height:34px !important;
          border-radius:8px !important;font-size:22px !important;
        }
        #sainthetic-home .reference-hero-photo-image {
          display:block !important;width:100% !important;height:auto !important;
          aspect-ratio:1 / 1 !important;object-fit:cover !important;object-position:center !important;
          border-radius:28px !important;background:#f6f4ee !important;
          box-shadow:0 20px 50px rgba(25,35,55,.12) !important;
        }
        @media (max-width:760px) {
          #sainthetic-home .reference-linkedin-credit {
            max-width:100% !important;min-height:56px !important;
            padding:10px 20px 10px 14px !important;gap:11px !important;
          }
          #sainthetic-home .reference-linkedin-credit strong { font-size:.9rem !important; }
          #sainthetic-home .reference-linkedin-icon {
            flex-basis:30px !important;width:30px !important;height:30px !important;font-size:20px !important;
          }
          #sainthetic-home .reference-hero-photo-image {
            aspect-ratio:1 / 1 !important;max-height:none !important;object-fit:cover !important;
          }
        }
      `}</style>

      <style>{`
        /* Final reference layout: crisp product hero, founder banner, light editorial finish. */
        #sainthetic-home { background:#fff !important; color:#111827 !important; }
        #sainthetic-home > div[style*="linear-gradient(135deg, #0b0b0b"] { background:#fff !important; overflow:visible !important; }
        #sainthetic-home > div[style*="position: fixed"] { display:none !important; }
        #sainthetic-home .sainthetic-reference-top { max-width:1200px !important; margin:0 auto !important; padding:0 26px !important; }
        #sainthetic-home header#hero.reference-hero { display:grid !important; grid-template-columns:minmax(0,.98fr) minmax(0,1.02fr) !important; gap:26px !important; min-height:0 !important; padding:42px 10px 26px !important; align-items:center !important; }
        #sainthetic-home .reference-hero h1 { max-width:570px !important; margin:0 0 18px !important; color:#111827 !important; font-size:clamp(2.8rem,5.3vw,4.15rem) !important; line-height:1.01 !important; letter-spacing:-.065em !important; font-weight:900 !important; }
        #sainthetic-home .reference-hero h1 span { color:#111827 !important; -webkit-text-fill-color:#111827 !important; background:linear-gradient(transparent 62%,#ffe28a 62%,#ffe28a 93%,transparent 93%) !important; }
        #sainthetic-home .reference-eyebrow { display:inline-flex !important; align-items:center !important; gap:8px !important; margin-bottom:18px !important; padding:8px 14px !important; border-radius:999px !important; background:#fff1bf !important; color:#171b2b !important; font-weight:800 !important; font-size:.84rem !important; }
        #sainthetic-home .reference-subtitle { max-width:540px !important; margin:0 0 22px !important; color:#34415f !important; font-size:1rem !important; line-height:1.5 !important; }
        #sainthetic-home .reference-actions { display:flex !important; flex-wrap:wrap !important; gap:12px !important; }
        #sainthetic-home .reference-primary { background:#111827 !important; color:#fff !important; border-radius:999px !important; box-shadow:0 7px 18px rgba(17,24,39,.14) !important; }
        #sainthetic-home .reference-secondary { border:1px solid #111827 !important; color:#111827 !important; border-radius:999px !important; background:#fff !important; }
        #sainthetic-home .reference-reassurance { display:flex !important; flex-wrap:wrap !important; gap:16px !important; margin-top:18px !important; color:#34415f !important; font-size:.8rem !important; }
        #sainthetic-home .reference-visual.reference-hero-dashboard { display:flex !important; align-items:center !important; justify-content:center !important; min-width:0 !important; width:100% !important; padding:0 !important; background:transparent !important; border:0 !important; box-shadow:none !important; overflow:visible !important; }
        #sainthetic-home .reference-hero-dashboard-image { display:block !important; width:100% !important; height:auto !important; max-width:650px !important; object-fit:contain !important; filter:drop-shadow(0 20px 25px rgba(30,41,59,.10)) !important; }
        #sainthetic-home .reference-features { display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:28px !important; max-width:1080px !important; margin:12px auto 28px !important; }
        #sainthetic-home .reference-features article { text-align:left !important; }
        #sainthetic-home .reference-features h3 { color:#111827 !important; font-size:1.35rem !important; font-weight:850 !important; letter-spacing:-.045em !important; margin:8px 0 4px !important; }
        #sainthetic-home .reference-features p { color:#34415f !important; line-height:1.35 !important; margin:0 !important; }
        #sainthetic-home .reference-feature-icon, #sainthetic-home .growth-icon { background:#ffe99c !important; color:#111827 !important; border-radius:12px !important; }
        #sainthetic-home .reference-growth-bar { display:grid !important; grid-template-columns:1fr 1fr auto !important; align-items:center !important; gap:20px !important; margin:28px auto 26px !important; padding:16px 24px !important; border:1px solid #e8edf4 !important; border-radius:22px !important; background:#fff !important; box-shadow:0 9px 25px rgba(31,42,68,.06) !important; }
        #sainthetic-home .growth-message strong, #sainthetic-home .growth-count strong { color:#111827 !important; }
        #sainthetic-home .growth-count span { color:#34415f !important; }
        #sainthetic-home .reference-pricing { max-width:1160px !important; margin:28px auto 0 !important; padding:0 10px !important; }
        #sainthetic-home .reference-pricing h2, #sainthetic-home .reference-how-it-works h2 { color:#111827 !important; }
        #sainthetic-home .pricing-intro { color:#34415f !important; }
        #sainthetic-home .reference-price-card { background:#fff !important; border:1px solid #e7ebf2 !important; box-shadow:0 10px 26px rgba(31,42,68,.055) !important; }
        #sainthetic-home .reference-price-card h3, #sainthetic-home .reference-price-card .reference-price { color:#111827 !important; }        #sainthetic-home .reference-price-card p, #sainthetic-home .reference-price-card ul { color:#34415f !important; }
        #sainthetic-home .reference-price-card a, #sainthetic-home .reference-price-card button { border-radius:999px !important; }
        #sainthetic-home .reference-price-card.featured { background:#fff9e6 !important; border-color:#ffe28a !important; }
        #sainthetic-home .reference-how-it-works { max-width:1160px !important; margin:28px auto 0 !important; padding:22px 26px !important; border:1px solid #e8edf4 !important; border-radius:24px !important; background:#fff !important; box-shadow:0 10px 26px rgba(31,42,68,.055) !important; text-align:center !important; }
        #sainthetic-home .reference-how-it-works h2 { margin:0 0 6px !important; font-size:clamp(2rem,3.5vw,2.6rem) !important; }
        #sainthetic-home .reference-how-it-works > p { margin:0 0 22px !important; color:#34415f !important; }
        #sainthetic-home .reference-how-steps { display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:24px !important; text-align:left !important; }
        #sainthetic-home .reference-how-steps article { display:flex !important; align-items:flex-start !important; gap:12px !important; min-width:0 !important; }
        #sainthetic-home .reference-how-steps article > span { display:grid !important; place-items:center !important; flex:0 0 38px !important; width:38px !important; height:38px !important; border-radius:50% !important; background:#ffe99c !important; color:#111827 !important; font-size:1.15rem !important; font-weight:900 !important; }
        #sainthetic-home .reference-how-steps h3 { margin:6px 0 4px !important; color:#111827 !important; font-size:1rem !important; font-weight:850 !important; }
        #sainthetic-home .reference-how-steps p { margin:0 !important; color:#34415f !important; font-size:.9rem !important; line-height:1.4 !important; }
        #sainthetic-home .reference-founder-banner { display:block !important; position:relative !important; max-width:1160px !important; margin:24px auto 16px !important; padding:0 20px !important; }
        #sainthetic-home .reference-founder-banner-link { display:block !important; width:100% !important; border-radius:28px !important; overflow:hidden !important; line-height:0 !important; box-shadow:0 12px 30px rgba(31,42,68,.08) !important; transition:transform .2s ease,box-shadow .2s ease !important; }
        #sainthetic-home .reference-founder-banner-link:hover { transform:translateY(-2px) !important; box-shadow:0 18px 38px rgba(31,42,68,.12) !important; }
        #sainthetic-home .reference-founder-banner img { display:block !important; width:100% !important; max-width:none !important; height:auto !important; aspect-ratio:1600 / 388 !important; object-fit:contain !important; border-radius:28px !important; }
        #sainthetic-home #product-walkthrough, #sainthetic-home #product-demo, #sainthetic-home #case-study, #sainthetic-home #faq { color:#111827 !important; }
        #sainthetic-home #product-walkthrough h2, #sainthetic-home #product-demo h2, #sainthetic-home #case-study h2, #sainthetic-home #faq h2 { color:#111827 !important; }
        #sainthetic-home #product-walkthrough h3, #sainthetic-home #product-walkthrough p, #sainthetic-home #product-demo p, #sainthetic-home #case-study p, #sainthetic-home #faq p { color:#34415f !important; }
        #sainthetic-home #product-walkthrough .step-text h3 { color:#111827 !important; }
        #sainthetic-home #product-walkthrough .step-image { border:1px solid #e8edf4 !important; box-shadow:0 12px 28px rgba(31,42,68,.08) !important; }
        #sainthetic-home #product-demo iframe { border:1px solid #e8edf4 !important; box-shadow:0 12px 28px rgba(31,42,68,.08) !important; }
        #sainthetic-home #case-study > div { background:#fff !important; border:1px solid #e8edf4 !important; box-shadow:0 12px 32px rgba(31,42,68,.07) !important; }
        #sainthetic-home #case-study [style*="color:"] { color:#34415f !important; }
        #sainthetic-home #case-study h2, #sainthetic-home #case-study h3, #sainthetic-home #case-study h4 { color:#111827 !important; }
        #sainthetic-home #case-study .cs-metrics { border-bottom:1px solid #e8edf4 !important; }
        #sainthetic-home #case-study .cs-metric-cell div:first-child { color:#111827 !important; }
        #sainthetic-home #case-study .cs-metric-cell div:nth-child(2) { color:#111827 !important; }
        #sainthetic-home #faq > div > div > div { background:#fff !important; border:1px solid #e1e6ee !important; box-shadow:0 7px 18px rgba(31,42,68,.05) !important; }
        #sainthetic-home #faq button { color:#172033 !important; }
        #sainthetic-home #faq p { color:#4b5872 !important; }
        #sainthetic-home section[style*="padding: 6rem 20px 3rem"] h2 { color:#111827 !important; }
        #sainthetic-home section[style*="padding: 6rem 20px 3rem"] p { color:#34415f !important; }
        #sainthetic-home footer { border-color:#e8edf4 !important; color:#647087 !important; }
        @media(max-width:900px) {
          #sainthetic-home .sainthetic-reference-top { padding:0 18px !important; }
          #sainthetic-home header#hero.reference-hero { grid-template-columns:1fr 1fr !important; gap:10px !important; }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.3rem,5.6vw,3.3rem) !important; }
          #sainthetic-home .reference-features { gap:16px !important; }
          #sainthetic-home .reference-how-steps { gap:14px !important; }
        }
        @media(max-width:700px) {
          #sainthetic-home header#hero.reference-hero { grid-template-columns:1fr !important; padding:30px 0 18px !important; }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.6rem,10vw,3.6rem) !important; }
          #sainthetic-home .reference-visual.reference-hero-dashboard { order:2 !important; }
          #sainthetic-home .reference-features { grid-template-columns:1fr !important; gap:20px !important; }
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr !important; text-align:center !important; justify-items:center !important; }
          #sainthetic-home .reference-how-steps { grid-template-columns:1fr !important; }
          #sainthetic-home .reference-founder-banner { padding:0 12px !important; margin:22px auto 4px !important; }
          #sainthetic-home .reference-founder-banner-link, #sainthetic-home .reference-founder-banner img { border-radius:18px !important; }
        }


        /* Refined buyer questions: strategy-grade, commercial and outcome-led. */
        #sainthetic-home .reference-glow { display:none !important; }
        #sainthetic-home .reference-visual { isolation:isolate !important; }
        #sainthetic-home .reference-question-title {
          margin:12px 0 7px !important; font-size:.72rem !important;
          line-height:1.2 !important; font-weight:850 !important; color:#10182c !important;
        }        #sainthetic-home .reference-question {
          display:flex !important; align-items:flex-start !important; gap:7px !important;
          padding:7px 8px !important; margin:5px 0 !important;
          border:1px solid #e4e9f0 !important; border-radius:11px !important;
          background:linear-gradient(180deg,#fff,#fafbfd) !important;
          box-shadow:0 2px 6px rgba(25,39,65,.045) !important;
          color:#172033 !important; font-size:.64rem !important;
          line-height:1.3 !important; white-space:normal !important;
        }
        #sainthetic-home .reference-question span {
          display:grid !important; place-items:center !important; flex:0 0 22px !important;
          width:22px !important; height:22px !important; margin-top:1px !important;
          border-radius:50% !important; background:#f0f3f8 !important;
          color:#172033 !important; font-size:.95rem !important;
        }
        /* Screenshot-accurate top composition: preserve every element and its relationship. */
        #sainthetic-home .sainthetic-reference-top {
          width:100% !important; max-width:1160px !important; margin:0 auto !important;
          padding:0 22px !important; box-sizing:border-box !important;
        }
        #sainthetic-home header#hero.reference-hero {
          display:grid !important; grid-template-columns:minmax(0,.98fr) minmax(0,1.02fr) !important;
          grid-template-areas:none !important; align-items:center !important;
          gap:18px !important; width:100% !important; max-width:none !important;
          min-height:0 !important; margin:0 !important; padding:18px 8px 10px !important;
          text-align:left !important; box-sizing:border-box !important;
        }
        #sainthetic-home .reference-hero-copy { min-width:0 !important; width:auto !important; }
        #sainthetic-home .reference-eyebrow {
          display:inline-flex !important; align-items:center !important; gap:6px !important;
          margin:0 0 12px !important; padding:6px 11px !important;
          border-radius:999px !important; background:#fff0b8 !important;
          color:#172033 !important; font-size:.76rem !important; line-height:1 !important;
          font-weight:800 !important;
        }
        #sainthetic-home .reference-hero h1 {
          max-width:560px !important; margin:0 0 12px !important;
          color:#101a31 !important; font-size:clamp(2.75rem,4.45vw,3.55rem) !important;
          line-height:.99 !important; letter-spacing:-.067em !important; font-weight:900 !important;
        }
        #sainthetic-home .reference-hero h1 span {
          color:#101a31 !important; -webkit-text-fill-color:#101a31 !important;
          background:linear-gradient(transparent 60%,#ffd84d 60%,#ffd84d 94%,transparent 94%) !important;
        }
        #sainthetic-home .reference-subtitle {
          max-width:535px !important; margin:0 0 16px !important;
          color:#33415e !important; font-size:.88rem !important; line-height:1.38 !important;
        }
        #sainthetic-home .reference-actions { display:flex !important; flex-wrap:wrap !important; gap:10px !important; }
        #sainthetic-home .reference-actions a {
          display:inline-flex !important; align-items:center !important; justify-content:center !important;
          min-height:40px !important; padding:0 17px !important; border-radius:999px !important;
          font-size:.79rem !important; line-height:1 !important; font-weight:750 !important;
          white-space:nowrap !important; text-decoration:none !important;
        }
        #sainthetic-home .reference-primary {
          background:#10182c !important; color:#fff !important;
          box-shadow:0 5px 13px rgba(16,24,44,.16) !important;
        }
        #sainthetic-home .reference-secondary {
          background:#fff !important; color:#10182c !important; border:1.4px solid #182238 !important;
        }
        #sainthetic-home .reference-reassurance {
          display:flex !important; flex-wrap:wrap !important; gap:8px 15px !important;
          margin:13px 0 0 !important; color:#35425d !important;
          font-size:.69rem !important; line-height:1.25 !important;
        }
        #sainthetic-home .reference-visual {
          position:relative !important; display:flex !important; align-items:center !important;
          justify-content:center !important; width:100% !important; min-width:0 !important;
          min-height:0 !important; margin:0 !important; padding:0 !important;
          transform:none !important; overflow:visible !important;
        }
        #sainthetic-home .reference-glow-one {
          width:190px !important; height:285px !important; right:3% !important; top:-15px !important;
          border-radius:48% !important; background:linear-gradient(135deg,#fff1b7,#ffe48b) !important;
          opacity:.85 !important; transform:rotate(27deg) !important;
        }
        #sainthetic-home .reference-glow-two {
          width:210px !important; height:240px !important; left:2% !important; bottom:-9px !important;
          border-radius:48% !important; background:linear-gradient(135deg,#fff2bd,#ffe58e) !important;
          opacity:.8 !important; transform:rotate(35deg) !important;
        }
        #sainthetic-home .reference-app-window {
          position:relative !important; z-index:1 !important; width:100% !important;
          max-width:540px !important; min-height:330px !important;
          grid-template-columns:112px minmax(0,1fr) !important;
          padding:43px 13px 15px !important; box-sizing:border-box !important;
          border:1px solid #e8ebf1 !important; border-radius:24px !important;
          background:linear-gradient(135deg,#fff 0%,#f7f8fb 100%) !important;
          box-shadow:0 18px 42px rgba(35,44,65,.17) !important;
          transform:rotate(-2deg) !important;
        }
        #sainthetic-home .reference-window-dots { top:13px !important; left:17px !important; gap:6px !important; }
        #sainthetic-home .reference-window-dots i { width:9px !important; height:9px !important; }
        #sainthetic-home .reference-app-sidebar {
          gap:9px !important; padding:3px 8px 0 0 !important;
          font-size:.65rem !important; line-height:1.1 !important;
        }
        #sainthetic-home .reference-mini-brand { gap:6px !important; margin-bottom:10px !important; font-size:.74rem !important; }
        #sainthetic-home .mini-logo { width:17px !important; height:17px !important; border-radius:5px !important; }
        #sainthetic-home .reference-app-sidebar > div:not(:first-child) {
          padding:7px 6px !important; border-radius:7px !important;
        }
        #sainthetic-home .reference-persona-panel {
          min-width:0 !important; margin-left:9px !important; padding:8px 10px 9px !important;
          border:1px solid #edf0f4 !important; border-radius:15px !important;
          background:rgba(255,255,255,.94) !important; box-shadow:0 6px 18px rgba(28,38,60,.08) !important;
        }
        #sainthetic-home .reference-persona-panel h3 {
          margin:0 0 12px !important; font-size:.82rem !important; line-height:1.2 !important;
        }
        #sainthetic-home .reference-persona-profile { gap:8px !important; padding-bottom:10px !important; }
        #sainthetic-home .reference-persona-avatar {
          width:44px !important; height:44px !important; flex:0 0 44px !important;
        }
        #sainthetic-home .reference-persona-profile strong {
          display:block !important; font-size:.67rem !important; line-height:1.2 !important;
          white-space:normal !important;
        }
        #sainthetic-home .reference-tags { gap:4px !important; margin-top:6px !important; }
        #sainthetic-home .reference-tags span { padding:4px 6px !important; font-size:.55rem !important; }
        #sainthetic-home .reference-question-title {
          margin:12px 0 6px !important; font-size:.72rem !important; line-height:1.2 !important;
        }
        #sainthetic-home .reference-question {
          gap:6px !important; padding:5px 0 !important; font-size:.59rem !important;
          line-height:1.25 !important; white-space:normal !important;
        }
        #sainthetic-home .reference-question span {
          width:19px !important; height:19px !important; flex:0 0 19px !important; font-size:.9rem !important;
        }
        #sainthetic-home .reference-features {
          display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:25px !important; max-width:1080px !important; margin:3px auto 19px !important;
          padding:0 30px !important; align-items:start !important;
        }
        #sainthetic-home .reference-features article {
          display:block !important; min-height:0 !important; text-align:left !important;
        }
        #sainthetic-home .reference-feature-icon {
          display:grid !important; place-items:center !important; width:43px !important; height:43px !important;
          margin:0 0 7px !important; border-radius:11px !important;
          background:#ffe89a !important; color:#10182c !important; font-size:1.45rem !important;
        }
        #sainthetic-home .reference-features h3 {
          display:block !important; min-height:0 !important; margin:0 0 3px !important;
          color:#10182c !important; font-size:1.08rem !important; line-height:1.13 !important;
          letter-spacing:-.045em !important; font-weight:850 !important;
        }
        #sainthetic-home .reference-features p {
          min-height:0 !important; margin:0 !important; color:#35425d !important;
          font-size:.83rem !important; line-height:1.22 !important;
        }
        #sainthetic-home .reference-growth-bar {
          display:grid !important; grid-template-columns:1.08fr 1fr auto !important;
          align-items:center !important; gap:18px !important; width:100% !important;
          min-height:78px !important; margin:0 auto 17px !important; padding:11px 19px !important;
          box-sizing:border-box !important; border:1px solid #edf0f5 !important;
          border-radius:18px !important; background:#fff !important;
          box-shadow:0 8px 22px rgba(31,42,68,.075) !important;
        }
        #sainthetic-home .growth-message {
          display:flex !important; align-items:center !important; gap:11px !important;
          padding-right:16px !important; border-right:1px solid #e1e5ec !important;
        }
        #sainthetic-home .growth-icon {
          display:grid !important; place-items:center !important; flex:0 0 42px !important;
          width:42px !important; height:42px !important; border-radius:10px !important;
          background:#ffe89a !important; color:#10182c !important; font-size:1.3rem !important;
        }
        #sainthetic-home .growth-message strong {
          color:#10182c !important; font-size:.88rem !important; line-height:1.2 !important;
          letter-spacing:-.025em !important;
        }
        #sainthetic-home .growth-count { display:flex !important; flex-direction:column !important; gap:2px !important; }
        #sainthetic-home .growth-count strong {
          color:#10182c !important; font-size:1.45rem !important; line-height:1.05 !important;
          letter-spacing:-.05em !important; font-weight:850 !important;
        }
        #sainthetic-home .growth-count span {
          color:#35425d !important; font-size:.72rem !important; line-height:1.2 !important;
        }
        #sainthetic-home .growth-avatars {
          display:flex !important; align-items:center !important; justify-content:flex-end !important;
          padding:0 3px 0 0 !important;
        }
        #sainthetic-home .growth-avatars span {
          position:relative !important; display:block !important; flex:0 0 42px !important;
          width:42px !important; height:42px !important; overflow:hidden !important;
          margin-left:-7px !important; border:2px solid #fff !important; border-radius:50% !important;
          background:#f3f4f6 !important; box-shadow:0 2px 7px rgba(20,32,55,.10) !important;
        }
        #sainthetic-home .growth-avatars img {
          position:absolute !important; top:0 !important; left:0 !important;
          width:500% !important; max-width:none !important; height:100% !important;
          object-fit:fill !important; border-radius:0 !important;
        }
        #sainthetic-home .reference-pricing { margin:8px auto 0 !important; padding:0 10px !important; }
        #sainthetic-home .reference-pricing h2 {
          margin:0 0 5px !important; color:#10182c !important;
          font-size:clamp(1.8rem,3vw,2.45rem) !important; line-height:1.08 !important;
        }
        @media (min-width:901px) and (max-width:1100px) {
          #sainthetic-home header#hero.reference-hero {
            grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important; gap:14px !important;
            padding-top:13px !important;
          }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.45rem,4.1vw,3rem) !important; }
          #sainthetic-home .reference-app-window { min-height:300px !important; grid-template-columns:100px minmax(0,1fr) !important; }
          #sainthetic-home .reference-features { gap:18px !important; padding:0 18px !important; }
          #sainthetic-home .reference-growth-bar { gap:12px !important; padding:10px 14px !important; }
          #sainthetic-home .growth-avatars span { flex-basis:36px !important; width:36px !important; height:36px !important; }
        }
        @media (max-width:900px) {
          #sainthetic-home .sainthetic-reference-top { padding:0 18px !important; }
          #sainthetic-home header#hero.reference-hero {
            grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important; gap:12px !important;
            padding:18px 4px 12px !important;
          }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.15rem,5vw,2.8rem) !important; }
          #sainthetic-home .reference-app-window { min-height:290px !important; grid-template-columns:88px minmax(0,1fr) !important; }
          #sainthetic-home .reference-features { gap:14px !important; padding:0 8px !important; }
          #sainthetic-home .reference-features h3 { font-size:.98rem !important; }
          #sainthetic-home .reference-features p { font-size:.76rem !important; }
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr 1fr auto !important; gap:9px !important; padding:9px 12px !important; }
          #sainthetic-home .growth-avatars span { flex-basis:34px !important; width:34px !important; height:34px !important; }
        }
        @media (max-width:700px) {
          #sainthetic-home header#hero.reference-hero { grid-template-columns:1fr !important; gap:10px !important; padding:28px 4px 10px !important; }
          #sainthetic-home .reference-hero h1 { font-size:clamp(2.55rem,10vw,3.5rem) !important; }
          #sainthetic-home .reference-visual { min-height:0 !important; margin:8px 0 0 !important; }
          #sainthetic-home .reference-app-window { max-width:540px !important; min-height:300px !important; }
          #sainthetic-home .reference-features { grid-template-columns:1fr !important; gap:18px !important; padding:0 8px !important; }
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr 1fr !important; gap:10px !important; padding:13px !important; }
          #sainthetic-home .growth-message { border:0 !important; padding:0 !important; }
          #sainthetic-home .growth-avatars { grid-column:1/-1 !important; justify-content:flex-start !important; }
        }
        @media (max-width:420px) {
          #sainthetic-home .reference-app-window { grid-template-columns:78px minmax(0,1fr) !important; padding:40px 8px 10px !important; }
          #sainthetic-home .reference-app-sidebar { font-size:.55rem !important; }
          #sainthetic-home .reference-persona-avatar { width:38px !important; height:38px !important; flex-basis:38px !important; }
        }

        /* Hero avatar: show only the first (male) portrait from the community strip. */
        #sainthetic-home#sainthetic-home .reference-persona-avatar {
          position:relative !important;
          overflow:hidden !important;
          background-image:url("/community-avatars-clean.webp?v=20261106") !important;
          background-repeat:no-repeat !important;
          background-size:500% 130% !important;
          background-position:3.125% 50% !important;
        }
        #sainthetic-home#sainthetic-home .reference-persona-avatar img { display:none !important; }
      `}</style>


      <style>{`
        /* Mobile hero: keep the headline compact enough to bring the buyer-persona
           preview into the first screen, while preserving the desktop composition. */
        @media (max-width:700px) {
          #sainthetic-home .sainthetic-reference-top {
            padding:0 16px 20px !important;
          }
          #sainthetic-home header#hero.reference-hero {
            grid-template-columns:minmax(0,1fr) !important;
            gap:0 !important;
            padding:22px 2px 10px !important;
          }
          #sainthetic-home .reference-eyebrow {
            margin-bottom:12px !important;
            padding:7px 12px !important;
            font-size:.76rem !important;
          }
          #sainthetic-home .reference-hero h1 {
            max-width:100% !important;
            margin:0 0 12px !important;
            font-size:clamp(1.9rem,7.4vw,2.3rem) !important;
            line-height:1.04 !important;
            letter-spacing:-.06em !important;
            text-wrap:pretty !important;
          }
          #sainthetic-home .reference-subtitle {
            max-width:100% !important;
            margin:0 0 14px !important;
            font-size:.88rem !important;
            line-height:1.42 !important;
          }
          #sainthetic-home .reference-actions {
            display:flex !important;
            flex-direction:column !important;
            align-items:stretch !important;
            gap:8px !important;
          }
          #sainthetic-home .reference-actions a {
            width:100% !important;
            min-height:44px !important;
            justify-content:space-between !important;
            padding:0 16px !important;
            font-size:.84rem !important;
            white-space:normal !important;
          }
          #sainthetic-home .reference-reassurance {
            gap:6px 12px !important;
            margin-top:10px !important;
            font-size:.66rem !important;
          }
          #sainthetic-home .reference-visual {
            width:100% !important;
            min-height:0 !important;
            margin:14px 0 0 !important;
            padding:0 !important;
          }
          #sainthetic-home .reference-app-window {
            display:grid !important;
            grid-template-columns:minmax(0,1fr) !important;
            width:100% !important;
            max-width:none !important;
            min-height:0 !important;
            padding:38px 11px 11px !important;
            transform:none !important;
            border-radius:19px !important;
            box-shadow:0 12px 30px rgba(35,44,65,.11) !important;
          }
          #sainthetic-home .reference-app-sidebar { display:none !important; }
          #sainthetic-home .reference-persona-panel {
            min-width:0 !important;
            margin:0 !important;
            padding:10px 11px 9px !important;
            border-radius:14px !important;
          }
          #sainthetic-home .reference-persona-panel h3 {
            margin-bottom:10px !important;
            font-size:.9rem !important;
          }
          #sainthetic-home .reference-persona-profile {
            gap:9px !important;
            padding-bottom:9px !important;
          }
          #sainthetic-home .reference-persona-avatar {
            flex:0 0 42px !important;
            width:42px !important;
            height:42px !important;
          }
          #sainthetic-home .reference-persona-profile strong {
            font-size:.75rem !important;
            line-height:1.2 !important;
          }
          #sainthetic-home .reference-tags { gap:5px !important; }
          #sainthetic-home .reference-tags span {
            padding:4px 7px !important;
            font-size:.6rem !important;
          }
          #sainthetic-home .reference-question-title {
            margin:11px 0 6px !important;
            font-size:.75rem !important;
          }
          #sainthetic-home .reference-question {
            align-items:flex-start !important;
            gap:7px !important;
            margin:5px 0 !important;
            padding:7px 8px !important;
            border:1px solid #e7ebf1 !important;
            border-radius:9px !important;
            background:#fafbfd !important;
            font-size:.68rem !important;
            line-height:1.3 !important;
            white-space:normal !important;
          }
          #sainthetic-home .reference-question span {
            flex:0 0 19px !important;
            width:19px !important;
            height:19px !important;
            font-size:.85rem !important;
          }
        }
        @media (max-width:390px) {
          #sainthetic-home .reference-hero h1 {
            font-size:1.82rem !important;
            letter-spacing:-.058em !important;
          }
          #sainthetic-home .reference-subtitle { font-size:.84rem !important; }
          #sainthetic-home .reference-question { font-size:.65rem !important; }
        }
      `}</style>

      <div
        style={{ flex: 1, background: "linear-gradient(135deg, #0b0b0b 84%, #261e45 100%)", overflow: "hidden" }}
        onMouseMove={(e) => {
          document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
          document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
        }}
      >
        {/* BG Effects */}
        <div style={{ position: "fixed", top: -145, left: -100, width: 520, height: 320, background: "radial-gradient(ellipse at 40% 60%, #ffd94533 0%, transparent 73%)", zIndex: 0, filter: "blur(76px)" }} />
        <div style={{ position: "fixed", bottom: -180, right: -130, width: 530, height: 350, background: "radial-gradient(circle at 60% 18%, #7b7bad33 0%, transparent 77%)", zIndex: 0, filter: "blur(99px)" }} />

        {/* ============ HERO ============ */}
                {/* Reference-matched hero, feature summary, social proof and pricing */}
        <section className="sainthetic-reference-top">
          <header id="hero" className="reference-hero">
            <div className="reference-hero-copy">
              <div className="reference-eyebrow"><span>⚡</span> Buyer intelligence for content teams</div>
              <h1>Understand your buyers.<br/>Find the questions<br/><span>that move them to act.</span></h1>
              <p className="reference-subtitle">Build a clearer picture of your buyers, map the questions shaping their decisions, and turn those insights into focused content briefs. sAInthetic connects audience research with practical content planning.</p>
              <div className="reference-actions">
                <a className="reference-primary" href="/register">Create my free account <span>→</span></a>
                <a className="reference-secondary" href="#try-persona">Preview a sample persona <span className="preview-arrow" aria-hidden="true">→</span></a>
              </div>
              <div className="reference-reassurance"><span>✓&nbsp; Free plan available</span><span>✓&nbsp; No credit card</span><span>✓&nbsp; Cancel anytime</span><span>✓&nbsp; Setup in 60 sec</span></div>
            </div>
            <div className="reference-visual" aria-label="Preview of the sAInthetic buyer persona dashboard">
              <div className="reference-app-window">
                <div className="reference-window-dots"><i></i><i></i><i></i></div>
                <div className="reference-app-sidebar">
                  <div className="reference-mini-brand"><span className="mini-logo">●</span> sAInthetic</div>
                  <div>⌂ &nbsp;Dashboard</div>
                  <div className="active">♙ &nbsp;Buyer Personas</div>
                  <div>◎ &nbsp;AI Questions</div>
                  <div>▣ &nbsp;Content Ideas</div>
                  <div>◷ &nbsp;Tracking</div>
                </div>
                <div className="reference-persona-panel">
                  <h3>Buyer Persona</h3>
                  <div className="reference-persona-profile">
                    <div className="reference-persona-avatar" role="img" aria-label="Illustrative male buyer persona portrait" />
                    <div>
                      <motion.strong
                        ref={personaTitleRef}
                        initial={{ opacity: 0, y: 9, filter: "blur(4px)" }}
                        animate={personaTitleInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 9, filter: "blur(4px)" }}
                        transition={{ duration: 1.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: "inline-block" }}
                      >The Growth-Minded Marketer</motion.strong>
                      <motion.div
                        className="reference-tags"
                        initial={{ opacity: 0, y: 5 }}
                        animate={personaTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                        transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      ><span>B2B</span><span>AI Tools</span><span>Growth</span></motion.div>
                    </div>
                  </div>
                  <motion.div
                    className="reference-question-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span>High-value questions they ask AI</span>
                    <motion.i
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.65, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                  {[
                    "How can [product] improve organic acquisition, content productivity and conversion, and how soon could we see results?",
                    "How does [product] compare with leading alternatives on answer quality, workflow integration, scalability and total cost of ownership?",
                    "What is the investment case for a lean marketing team, including expected ROI, implementation effort and key adoption risks?"
                  ].map((question, index) => (
                    <motion.div
                      key={question}
                      className="reference-question"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.48, delay: 1.05 + index * 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>⌕</span>{question}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <section id="features" className="reference-features" aria-label="Product benefits">
            <article><div className="reference-feature-icon">♧</div><h3>Understand buyers</h3><p>Structured buyer profiles<br/>built around goals,<br/>needs and objections</p></article>
            <article><div className="reference-feature-icon">▢</div><h3>Discover AI questions</h3><p>Explore AI-generated<br/>buyer questions across<br/>discovery to decision</p></article>
            <article><div className="reference-feature-icon">✧</div><h3>Create better content</h3><p>Prioritised content angles<br/>and briefs shaped by<br/>buyer intent</p></article>
          </section>

          <section className="reference-growth-bar" aria-label="sAInthetic community and illustrative results">
            <div className="growth-message"><span className="growth-icon">▥</span><strong>Turn buyer insight into<br/>content action.</strong></div>
            <div className="growth-count"><strong>Built for marketers</strong><span>who want to understand buyer intent</span></div>
            <div className="growth-count growth-savings">
              <strong>$150<span className="growth-period">/wk</span></strong>
              <span>illustrative time value saved</span>
              <small>Based on 5 hours × $30/hour</small>
            </div>
            <div className="growth-community-proof">
              <div className="growth-avatars" aria-label="Example customer portraits">
                <span className="community-avatar-1" aria-hidden="true" />
                <span className="community-avatar-2" aria-hidden="true" />
                <span className="community-avatar-3" aria-hidden="true" />
                <span className="community-avatar-4" aria-hidden="true" />
              </div>
              <p className="growth-avatars-caption" aria-label={personaCaption}><span>{typedPersonaCaption}</span><span className="growth-typing-caret" aria-hidden="true" /></p>
            </div>
          </section>

          <section id="pricing" className="reference-pricing">
            <h2>Turn buyer insight into better content.</h2>
            <p className="pricing-intro">Start with a buyer persona, explore decision-stage questions and build your first content ideas. Free to try, no credit card required.</p>
            <div className="reference-pricing-grid">
              <article className="reference-price-card">
                <h3>Free</h3><p>Your first step to understanding<br/>what your buyers care about.</p>
                <div className="reference-price">£0 <span>/month</span></div>
                <ul><li>1 buyer persona</li><li>Limited AI questions</li><li>Basic content ideas</li></ul>
                <a href="/register">Create my free account →</a>
              </article>
              <article className="reference-price-card">
                <h3>Starter</h3><p>For individuals and small teams<br/>building with AI insights.</p>
                <div className="reference-price">£19 <span>/month</span></div>
                <ul><li>Up to 5 buyer personas</li><li>Full AI questions</li><li>Content ideas &amp; topics</li><li>Email support</li></ul>
                <button type="button" onClick={() => handleUpgrade("price_1SdH1fPwyyuQCEbaZt4loxPH")}>Get started</button>
              </article>
              <article className="reference-price-card featured">
                <div className="reference-popular">Most popular</div>
                <h3>Pro</h3><p>For growing teams that want<br/>maximum visibility and control.</p>
                <div className="reference-price">£49 <span>/month</span></div>
                <ul><li>Unlimited buyer personas</li><li>Advanced AI questions</li><li>Content ideas, briefs &amp; tracking</li><li>Priority support</li></ul>
                <button type="button" onClick={() => handleUpgrade("price_1SdH2yPwyyuQCEbacY3y1487")}>Get started <span>→</span></button>
              </article>
            </div>
          </section>
        </section>



        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" className="reference-how-it-works" aria-labelledby="reference-how-title">
          <h2 id="reference-how-title">How it works</h2>
          <p>From audience insight to content that converts, in three simple steps.</p>
          <div className="reference-how-steps">
            <article><span>1</span><div><h3>Create your buyer persona</h3><p>Create a structured starting profile from your industry, audience and business context.</p></div></article>
            <article><span>2</span><div><h3>See the exact questions</h3><p>Explore the questions buyers may ask AI as they research, compare and choose.</p></div></article>
            <article><span>3</span><div><h3>Turn insight into content</h3><p>Turn buyer needs and objections into focused content ideas and practical briefs.</p></div></article>
          </div>
        </section>

        {/* Founder contact banner, placed after the top-level product story. */}
        <section className="reference-founder-banner" aria-label="Get in touch with the founder">
          <a className="reference-founder-banner-link" href="https://www.linkedin.com/in/francescomercuri" target="_blank" rel="noopener noreferrer" aria-label="Connect with Francesco Mercuri on LinkedIn">
            <img src="/sainthetic-founder-contact.webp?v=20261101" alt="Get in touch with sAInthetic founder Francesco Mercuri. Connect on LinkedIn." loading="eager" decoding="async" fetchPriority="low" />
          </a>
        </section>

        {/* The remaining product proof, demo, case study, FAQs and conversion CTA follow below. */}
        <section id="product-walkthrough" className="product-walkthrough" style={{ margin: "3.5rem auto 0 auto", maxWidth: 1200, textAlign: "center", padding: "0 20px", position: "relative", zIndex: 2 }}>
          <div className="walkthrough-eyebrow"><span>⚡</span> How it works</div>
          <h2 style={{ color: "#ffd945", fontWeight: 900, fontSize: "2.1rem", marginBottom: "0.9rem", letterSpacing: "-1px" }}>From industry to buyer insights in three simple steps</h2>
          <p style={{ color: "#bbb", marginBottom: "5.2rem", fontSize: "1.15rem" }}>Turn market context into AI-ready buyer intelligence.</p>

          {[
            { ref: step1Ref, inView: step1InView, img: "step-1-industry.jpg", alt: "Select industry", step: "STEP 1", title: "Choose your industry", desc: "Select from 5+ industries, from SaaS and e-commerce to healthcare and fitness. Our AI tailors the insights to your market.", highlights: [{ icon: "⚡", title: "Multiple industries", detail: "SaaS, retail, healthcare and more" }, { icon: "◎", title: "Market-specific", detail: "Personas tailored to your niche" }, { icon: "✦", title: "Ready in seconds", detail: "Go from industry to insight instantly" }] },
            { ref: step2Ref, inView: step2InView, img: "step-2-personas.jpg", alt: "AI buyer personas", step: "STEP 2", title: "Meet your customers", desc: "Generate detailed buyer personas with goals, pain points and behaviours, giving your team a clearer picture of the people you want to reach.", highlights: [{ icon: "♙", title: "Realistic personas", detail: "Built around customer behaviour and intent" }, { icon: "▥", title: "Actionable insights", detail: "Goals, pain points and motivations" }, { icon: "▤", title: "Content-ready", detail: "Ideas and angles that drive results" }] },
            { ref: step3Ref, inView: step3InView, img: "step-5-prompts.jpg", alt: "AI buyer questions and content ideas", step: "STEP 3", title: "Turn buyer questions into content", desc: "Explore AI-generated questions that reflect buyer research and decision stages, then turn them into useful, search-ready content.", highlights: [{ icon: "⌕", title: "Intent-led questions", detail: "Understand what buyers really want to know" }, { icon: "✦", title: "Content opportunities", detail: "Find useful angles your competitors miss" }, { icon: "↗", title: "Ready to create", detail: "Build briefs and copy around buyer intent" }] },
          ].map((s, i) => (
            <div key={i} ref={s.ref} className="how-step-wrapper">
              <motion.div className="step-text" initial={{ opacity: 0, y: 18 }} animate={s.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.08 }}>
                <div className="step-number-label">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
              <motion.div className="step-image" initial={{ opacity: 0, y: 18 }} animate={s.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.16 }}>
                <div className="step-image-toolbar" aria-hidden="true">
                  <span className="step-window-dots"><i></i><i></i><i></i></span>
                  <span>sAInthetic workspace</span>
                  <span className="step-window-status">LIVE PREVIEW</span>
                </div>
                <div className={`step-image-canvas step-image-canvas-${i + 1}`}>
                  <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
                  <motion.div
                    className={`step-live-activity step-live-activity-${i + 1}`}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={s.inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
                    transition={{ duration: 0.55, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {i === 0 && (
                      <div className="step-live-selection">
                        <span className="step-live-check">✓</span>
                        <span><small>INDUSTRY SELECTED</small><strong>SaaS &amp; Software</strong></span>
                        <span className="step-live-pulse" />
                      </div>
                    )}
                    {i === 1 && (
                      <div className="step-live-persona">
                        <small>PERSONA INSIGHTS GENERATED</small>
                        <div className="step-live-insight-list">
                          {["Goals identified", "Pain points mapped", "Buyer intent scored"].map((label, index) => (
                            <motion.span
                              key={label}
                              initial={{ opacity: 0, x: 10 }}
                              animate={s.inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                              transition={{ duration: 0.35, delay: 1.05 + index * 0.32 }}
                            ><b>✓</b>{label}</motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="step-live-question">
                        <span className="step-live-question-icon">⌕</span>
                        <span><small>NEW BUYER QUESTION DISCOVERED</small><strong>What should I look for in a solution?</strong></span>
                        <span className="step-live-cursor" />
                      </div>
                    )}
                  </motion.div>
                  {i === 1 && (
                    <div className="step-persona-portrait-overlay" aria-hidden="true">
                      <span className="step-persona-portrait step-persona-portrait-one" />
                      <span className="step-persona-portrait step-persona-portrait-two" />
                      <span className="step-persona-portrait step-persona-portrait-three" />
                    </div>
                  )}
                </div>
              </motion.div>
              <div className="step-highlights">
                {s.highlights.map((item) => (
                  <div className="step-highlight" key={item.title}>
                    <span className="step-highlight-icon" aria-hidden="true">{item.icon}</span>
                    <span className="step-highlight-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        
        <div id="try-persona"><PersonaTryDemo /></div>

        {/* ============ DEMO VIDEO ============ */}
<section id="product-demo" style={{ margin: "5rem auto 0 auto", maxWidth: 900, padding: "0 20px", position: "relative", zIndex: 2, textAlign: "center" }}>
  <h2 style={{ color: "#ffd945", fontWeight: 900, fontSize: "2.1rem", marginBottom: "0.6rem", letterSpacing: "-1px" }}>See It in Action</h2>
  <p style={{ color: "#bbb", fontSize: "1.1rem", marginBottom: "2rem" }}>Watch how sAInthetic turns your ICP into conversion-ready content in minutes</p>
  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(255,217,69,0.15)", border: "2px solid rgba(255,217,69,0.25)" }}>
    <iframe
      src="https://www.youtube.com/embed/NSoS4gFd360"
      title="sAInthetic Product Demo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
    />
  </div>
</section>


        {/* ============ CASE STUDY ============ */}
        <section id="case-study" style={{ margin: "8rem auto 0 auto", maxWidth: 1000, position: "relative", zIndex: 2, padding: "0 20px" }}>
          <div className="cs-intro-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg,#ffd945 0%,#ffed4e 100%)", color: "#000", padding: "6px 20px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 800, letterSpacing: "1px", marginBottom: 20, textTransform: "uppercase" }}>Case Study</div>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: "0.8rem", letterSpacing: "-1px", lineHeight: 1.15 }}>
              How a SaaS Team Tripled Organic Traffic{" "}              <span style={{ background: "linear-gradient(96deg,#ffd945,#ff9f43)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in 60 Days</span>
            </h2>
            <p style={{ color: "#bbb", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto" }}>A real workflow from persona creation to published content that converts</p>
          </div>

          <div style={{ background: "linear-gradient(135deg,#13131f 0%,#1e1e30 100%)", borderRadius: 24, border: "1px solid rgba(255,217,69,0.2)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", overflow: "hidden" }}>
            {/* Company bar */}
            <div className="cs-company-bar" style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16, background: "rgba(255,217,69,0.04)" }}>
              <div className="cs-company-brand">
                <div className="cs-company-logo" style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#ffd945,#ff9f43)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🚀</div>
                <div className="cs-company-info" style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>NexusFlow, a B2B SaaS platform</div>
                  <div style={{ color: "#888", fontSize: "0.82rem", marginTop: 2 }}>Team size: 12 · Industry: SaaS · Use case: Organic content growth</div>
                </div>
              </div>
              <div className="cs-achievement-grid" style={{ display: "flex", gap: 10 }}>
                {[{ label: "Time to results", value: "60 days" }, { label: "Plan used", value: "Pro" }, { label: "Estimated value saved", value: "$150 / week", note: "5h × $30/hour" }].map(s => (
                  <div key={s.label} className="cs-achievement-card" style={{ background: "rgba(255,217,69,0.1)", border: "1px solid rgba(255,217,69,0.25)", borderRadius: 10, padding: "8px 14px", textAlign: "center", minWidth: 92 }}>
                    <div style={{ color: "#ffd945", fontWeight: 800, fontSize: "0.9rem", whiteSpace: "nowrap" }}>{s.value}</div>
                    <div style={{ color: "#888", fontSize: "0.7rem", lineHeight: 1.25 }}>{s.label}</div>
                    {s.note && <div style={{ color: "#777", fontSize: "0.62rem", marginTop: 3, whiteSpace: "nowrap" }}>{s.note}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="cs-metrics" ref={caseMetricsRef}>
              {[
                { value: 3, suffix: "×", label: "Organic traffic", sublabel: "vs prior 60 days", color: "#4ade80" },
                { value: 68, suffix: "%", label: "Lower bounce rate", sublabel: "content-to-fit", color: "#60a5fa" },
                { value: 41, suffix: "%", label: "More trial signups", sublabel: "from blog content", color: "#ffd945" },
                { value: 5, suffix: "h", label: "Saved per week", sublabel: "on content research", color: "#f472b6" },
              ].map((item, i) => (
                <div key={i} className="cs-metric-cell" style={{ padding: "1.4rem 1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: 4, letterSpacing: "-1px" }} aria-label={`${item.value}${item.suffix}`}>
                    <span>{caseMetricCounts[i]}</span>{item.suffix}
                  </div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{item.label}</div>
                  <div style={{ color: "#666", fontSize: "0.75rem", marginTop: 2 }}>{item.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Story + steps */}
            <div className="cs-body">
              <div className="cs-challenge">
                <h4 style={{ color: "#ffd945", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12, marginTop: 0 }}>The Challenge</h4>
                <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 20, marginTop: 0 }}>NexusFlow's content team was publishing 8 blog posts per month but seeing minimal organic traction. Posts felt generic and did not answer the questions real buyers were searching for. The team also had to rewrite prompts from scratch each time.</p>
                <div style={{ borderLeft: "3px solid #ffd945", paddingLeft: 16 }}>
                  <p style={{ color: "#fff", fontStyle: "italic", fontSize: "0.97rem", lineHeight: 1.6, margin: "0 0 8px 0", fontWeight: 600 }}>"Within a week of using sAInthetic we had a library of 40+ prompts that actually matched what our ICP asks AI tools."</p>
                  <div style={{ color: "#ffd945", fontWeight: 700, fontSize: "0.83rem" }}>Jamie R. | Head of Growth, NexusFlow</div>
                </div>
              </div>
              <div className="cs-steps">
                <h4 style={{ color: "#ffd945", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16, marginTop: 0 }}>Their Workflow with sAInthetic</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { step: "01", title: "Built 4 personas for their ICP", desc: "Generated detailed SaaS buyer personas in under 2 minutes" },
                    { step: "02", title: "Extracted synthetic search queries", desc: "Uncovered 40+ questions their buyers ask LLMs every week" },
                    { step: "03", title: "Created a reusable prompt library", desc: "Every writer worked from consistent, on-brand prompts." },
                    { step: "04", title: "Published persona-matched content", desc: "Content matched buyer intent and helped improve organic performance." },
                  ].map(item => (
                    <div key={item.step} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,217,69,0.15)", border: "1px solid rgba(255,217,69,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffd945", fontWeight: 800, fontSize: "0.72rem", flexShrink: 0 }}>{item.step}</div>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{item.title}</div>
                        <div style={{ color: "#777", fontSize: "0.82rem", marginTop: 2 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA bar */}
            <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,217,69,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.97rem" }}>Ready to understand your buyers?</div>
                <div style={{ color: "#888", fontSize: "0.85rem", marginTop: 3 }}>Create your first buyer persona free. No credit card required.</div>
              </div>
              <a href="/register" style={{ background: "linear-gradient(135deg,#ffd945,#ff9f43)", color: "#000", fontWeight: 800, padding: "0.85rem 1.8rem", borderRadius: 12, textDecoration: "none", fontSize: "0.92rem", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(255,217,69,0.3)" }}>Create my free account →</a>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="reference-faq" aria-labelledby="reference-faq-title">
          <div className="reference-faq-intro">
            <span className="reference-faq-eyebrow"><span aria-hidden="true">✳</span> GOOD TO KNOW</span>
            <h2 id="reference-faq-title">A few things you might be wondering.</h2>
            <p>Clear answers about sAInthetic, how it works and what you can do with it.</p>
            <div className="reference-faq-note"><span aria-hidden="true">✦</span><span>Still have a question? We are always happy to help.</span></div>
          </div>
          <div className="reference-faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              const panelId = `reference-faq-answer-${index}`;
              return (
                <motion.article key={index} className={`reference-faq-item${isOpen ? " is-open" : ""}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.2) }}>
                  <button type="button" className="reference-faq-question" id={`reference-faq-trigger-${index}`} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span className="reference-faq-icon" aria-hidden="true">{["✧","▱","♙","◉","⌘","♡","✓","▤","◎","✎","↗"][index] || "✧"}</span>
                    <span className="reference-faq-question-text">{item.question}</span>
                    <motion.span className="reference-faq-chevron" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} aria-hidden="true">⌄</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={panelId} className="reference-faq-answer" role="region" aria-labelledby={`reference-faq-trigger-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </section>
        {/* ============ FINAL CTA ============ */}
        <section className="final-cta-section" style={{ padding: "3rem 20px 2rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, margin: "0 0 20px 0", letterSpacing: "-1px", color: "#fff" }}>
              Start publishing content your buyers actually search for.
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#bbb", margin: "0 0 36px 0", lineHeight: 1.6 }}>
              Create your first buyer persona and discover the questions your audience asks AI.<br />Start free. No credit card required.
            </p>
            <a
              href="/register"
              style={{ background: "linear-gradient(135deg,#ffd945,#ff9f43)", border: "none", color: "#000", padding: "1.2rem 3rem", borderRadius: "12px", fontSize: "1.15rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 40px rgba(255,217,69,0.35)", display: "inline-block", textDecoration: "none" }}
            >
              Create my free account →
            </a>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              {["✓ Free plan available", "✓ No credit card", "✓ Cancel anytime", "✓ Setup in 60 sec"].map(t => (
                <span key={t} style={{ color: "#666", fontSize: "0.85rem", fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </motion.div>

          <footer style={{ background: "rgba(11,11,11,0)", color: "#bbb", textAlign: "center", fontWeight: 500, padding: "1.1rem 0", borderTop: "1px solid #232323", marginTop: "3rem" }}>
            © {new Date().getFullYear()} sAInthetic. All rights reserved
            <div style={{ fontSize: ".85rem", color: "#999", marginTop: 2 }}>
              Empowering AI-powered creators and brands · info@marketingpredictor.com
            </div>
            <USCookieConsent />
          </footer>
        </section>

      {/* Mobile-first hero correction: the buyer preview sits directly below the
          description, before the calls to action, and the headline wraps naturally. */}
      <style>{`
        @media (max-width:700px) {
          #sainthetic-home .sainthetic-reference-top { padding:0 16px 20px !important; }
          #sainthetic-home header#hero.reference-hero {
            display:flex !important;
            flex-direction:column !important;
            align-items:stretch !important;
            gap:0 !important;
            padding:22px 2px 10px !important;
          }
          #sainthetic-home .reference-hero-copy { display:contents !important; }
          #sainthetic-home .reference-eyebrow { order:1 !important; align-self:flex-start !important; margin:0 0 12px !important; font-size:.76rem !important; }
          #sainthetic-home .reference-hero h1 {
            order:2 !important;
            max-width:100% !important;
            margin:0 0 12px !important;
            font-size:clamp(1.85rem,7.1vw,2.15rem) !important;
            line-height:1.04 !important;
            letter-spacing:-.06em !important;
            text-wrap:pretty !important;
          }
          #sainthetic-home .reference-hero h1 br { display:block !important; content:"" !important; }
          #sainthetic-home .reference-subtitle {
            order:3 !important;
            max-width:100% !important;
            margin:0 0 13px !important;
            font-size:.86rem !important;
            line-height:1.42 !important;
          }
          #sainthetic-home .reference-visual {
            order:4 !important;
            width:100% !important;
            min-height:0 !important;
            margin:0 0 14px !important;
            padding:0 !important;
          }
          #sainthetic-home .reference-app-window {
            display:grid !important;
            grid-template-columns:minmax(0,1fr) !important;
            width:100% !important;
            max-width:none !important;
            min-height:0 !important;
            padding:35px 10px 10px !important;
            transform:none !important;
            border-radius:18px !important;
            box-shadow:0 10px 26px rgba(35,44,65,.10) !important;
          }
          #sainthetic-home .reference-app-sidebar { display:none !important; }
          #sainthetic-home .reference-persona-panel {
            min-width:0 !important;
            margin:0 !important;
            padding:9px 10px !important;
            border-radius:13px !important;
          }
          #sainthetic-home .reference-persona-panel h3 { font-size:.86rem !important; margin-bottom:8px !important; }
          #sainthetic-home .reference-persona-profile { gap:8px !important; padding-bottom:8px !important; }
          #sainthetic-home .reference-persona-avatar { flex:0 0 40px !important; width:40px !important; height:40px !important; }
          #sainthetic-home .reference-persona-profile strong { font-size:.72rem !important; line-height:1.2 !important; }
          #sainthetic-home .reference-tags { gap:4px !important; }
          #sainthetic-home .reference-tags span { padding:4px 6px !important; font-size:.57rem !important; }
          #sainthetic-home .reference-question-title { margin:9px 0 5px !important; font-size:.72rem !important; }
          #sainthetic-home .reference-question {
            display:flex !important;
            gap:6px !important;
            margin:5px 0 !important;
            padding:6px 7px !important;
            border:1px solid #e7ebf1 !important;
            border-radius:9px !important;
            background:#fafbfd !important;
            font-size:.64rem !important;
            line-height:1.28 !important;
            white-space:normal !important;
          }
          #sainthetic-home .reference-question span { flex:0 0 18px !important; width:18px !important; height:18px !important; font-size:.8rem !important; }
          #sainthetic-home .reference-actions {
            order:5 !important;
            display:flex !important;
            flex-direction:column !important;
            align-items:stretch !important;
            gap:8px !important;
            width:100% !important;
          }
          #sainthetic-home .reference-actions a {
            width:100% !important;
            min-height:46px !important;
            box-sizing:border-box !important;
            justify-content:space-between !important;
            padding:0 16px !important;
            font-size:.84rem !important;
            white-space:normal !important;
          }
          #sainthetic-home .reference-reassurance {
            order:6 !important;
            display:flex !important;
            flex-wrap:wrap !important;
            gap:6px 12px !important;
            margin:10px 0 0 !important;
            font-size:.66rem !important;
          }
        }
        @media (max-width:390px) {
          #sainthetic-home .reference-hero h1 { font-size:1.8rem !important; }
          #sainthetic-home .reference-question { font-size:.61rem !important; }
        }
      `}</style>

      <style>{`
        /* iOS mobile header: fixed positioning avoids Safari sticky failures
           caused by the homepage's overflow-clipped wrappers. */
        @media (max-width:800px) {
          #sainthetic-home {
            padding-top:0 !important;
            overflow:visible !important;
            overflow-x:clip !important;
          }
          #sainthetic-home > div[style*="linear-gradient(135deg, #0b0b0b"] {
            overflow:visible !important;
            overflow-x:clip !important;
          }
          #sainthetic-home nav.main-nav {
            position:fixed !important;
            top:0 !important;
            left:0 !important;
            right:0 !important;
            width:100% !important;
            box-sizing:border-box !important;
            z-index:99999 !important;
            margin:0 !important;
            padding-top:max(12px, env(safe-area-inset-top)) !important;
            padding-bottom:12px !important;
            background:rgba(255,255,255,.97) !important;
            -webkit-backdrop-filter:blur(16px) !important;
            backdrop-filter:blur(16px) !important;
          }
          #sainthetic-home nav.main-nav .mobile-dropdown {
            z-index:100000 !important;
          }
          #sainthetic-home .sainthetic-reference-top {
            padding-top:82px !important;
          }
        }
      `}</style>


      <style>{`
        /* Three-step walkthrough: consistent editorial cards and framed product screens. */
        #sainthetic-home #product-walkthrough {
          max-width:1120px !important; margin:76px auto 0 !important;
          padding:0 24px !important; text-align:center !important; box-sizing:border-box !important;
        }
        #sainthetic-home #product-walkthrough .walkthrough-eyebrow {
          display:inline-flex !important; align-items:center !important; gap:9px !important;
          margin:0 auto 16px !important; padding:9px 16px !important; border-radius:999px !important;
          background:#fff1bf !important; color:#172033 !important; font-size:.9rem !important; font-weight:800 !important;
        }
        #sainthetic-home #product-walkthrough .walkthrough-eyebrow span {
          display:grid !important; place-items:center !important; width:30px !important; height:30px !important;
          border-radius:50% !important; background:#ffe28a !important;
        }
        #sainthetic-home #product-walkthrough > h2 {
          max-width:850px !important; margin:0 auto 12px !important; color:#111827 !important;
          font-size:clamp(2rem,4.4vw,3.15rem) !important; line-height:1.06 !important;
          letter-spacing:-.055em !important; text-align:center !important;
        }
        #sainthetic-home #product-walkthrough > p {
          max-width:680px !important; margin:0 auto 42px !important; color:#59647a !important;
          font-size:clamp(1rem,1.8vw,1.15rem) !important; line-height:1.55 !important; text-align:center !important;
        }
        #sainthetic-home #product-walkthrough .how-step-wrapper {
          display:grid !important; grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr) !important;
          align-items:center !important; gap:clamp(22px,4vw,48px) !important;
          width:100% !important; margin:0 auto 22px !important; padding:26px !important;
          box-sizing:border-box !important; border:1px solid #f0ede5 !important; border-radius:28px !important;
          background:linear-gradient(135deg,#fffdf8 0%,#fff 72%) !important;
          box-shadow:0 10px 28px rgba(31,42,68,.045) !important; text-align:left !important;
        }
        #sainthetic-home #product-walkthrough .how-step-wrapper:nth-child(even) .step-text,
        #sainthetic-home #product-walkthrough .how-step-wrapper:nth-child(even) .step-image { order:initial !important; }
        #sainthetic-home #product-walkthrough .step-text { min-width:0 !important; padding:0 !important; text-align:left !important; }
        #sainthetic-home #product-walkthrough .step-text > div:first-child {
          display:inline-flex !important; align-items:center !important; margin:0 0 14px !important;
          padding:8px 15px !important; border:1px solid #f0dfa9 !important; border-radius:999px !important;
          background:#fff3cd !important; color:#755b1c !important; font-size:.8rem !important;
          font-weight:850 !important; letter-spacing:.12em !important;
        }
        #sainthetic-home #product-walkthrough .step-text h3 {
          margin:0 0 10px !important; color:#111827 !important;
          font-size:clamp(1.55rem,2.6vw,2.15rem) !important; line-height:1.08 !important; letter-spacing:-.05em !important;
        }
        #sainthetic-home #product-walkthrough .step-text > p {
          margin:0 !important; color:#58647a !important; font-size:1rem !important; line-height:1.55 !important;
        }
        #sainthetic-home #product-walkthrough .step-image {
          width:100% !important; min-width:0 !important; margin:0 !important; padding:0 !important;
          overflow:hidden !important; border:1px solid #dfe4ed !important; border-radius:20px !important;
          background:#11131d !important; box-shadow:0 16px 34px rgba(26,32,48,.14) !important;
        }
        #sainthetic-home #product-walkthrough .step-image img {
          display:block !important; width:100% !important; max-width:100% !important; height:auto !important;
          object-fit:contain !important; object-position:center !important;
        }
        #sainthetic-home #product-walkthrough .step-highlights {
          display:grid !important; grid-template-columns:1fr !important; gap:8px !important; margin-top:18px !important;
        }
        #sainthetic-home #product-walkthrough .step-highlight {
          display:flex !important; align-items:center !important; gap:9px !important; min-height:0 !important;
          padding:8px 10px !important; border:1px solid #f0eee8 !important; border-radius:12px !important; background:#fff !important;
        }
        #sainthetic-home #product-walkthrough .step-highlight-icon {
          display:grid !important; place-items:center !important; flex:0 0 30px !important; width:30px !important;
          height:30px !important; border-radius:9px !important; background:#fff1bf !important; color:#755b1c !important;
        }
        #sainthetic-home #product-walkthrough .step-highlight-copy strong { display:block !important; color:#172033 !important; font-size:.78rem !important; }
        #sainthetic-home #product-walkthrough .step-highlight-copy small { display:block !important; color:#657087 !important; font-size:.69rem !important; }
        @media (max-width:700px) {
          #sainthetic-home #product-walkthrough { margin:46px auto 0 !important; padding:0 16px !important; }
          #sainthetic-home #product-walkthrough > h2 {
            max-width:540px !important; font-size:clamp(1.9rem,7.2vw,2.45rem) !important; line-height:1.08 !important;
          }
          #sainthetic-home #product-walkthrough > p { margin:0 auto 24px !important; font-size:.96rem !important; }
          #sainthetic-home #product-walkthrough .how-step-wrapper {
            display:flex !important; flex-direction:column !important; align-items:stretch !important;
            gap:16px !important; margin:0 auto 18px !important; padding:17px !important;
            border-radius:22px !important; background:#fffdf8 !important; box-shadow:0 8px 22px rgba(31,42,68,.055) !important;
          }
          #sainthetic-home #product-walkthrough .step-text { order:1 !important; width:100% !important; }
          #sainthetic-home #product-walkthrough .step-image {
            order:2 !important; width:100% !important; border-radius:15px !important;
            box-shadow:0 10px 22px rgba(26,32,48,.12) !important;
          }
          #sainthetic-home #product-walkthrough .step-text > div:first-child {
            margin:0 0 10px !important; padding:6px 12px !important; font-size:.7rem !important;
          }
          #sainthetic-home #product-walkthrough .step-text h3 { margin:0 0 8px !important; font-size:1.48rem !important; line-height:1.12 !important; }
          #sainthetic-home #product-walkthrough .step-text > p { font-size:.9rem !important; line-height:1.45 !important; }
          #sainthetic-home #product-walkthrough .step-highlights { grid-template-columns:1fr !important; gap:6px !important; margin-top:12px !important; }
          #sainthetic-home #product-walkthrough .step-highlight { padding:7px 9px !important; border-radius:10px !important; }
          #sainthetic-home #product-walkthrough .step-highlight-icon { flex-basis:26px !important; width:26px !important; height:26px !important; }
          #sainthetic-home #product-walkthrough .step-highlight-copy strong { font-size:.73rem !important; }
          #sainthetic-home #product-walkthrough .step-highlight-copy small { font-size:.65rem !important; }
        }
      `}</style>
      <style>{`
        /* Premium product walkthrough mockup */
        #sainthetic-home #product-walkthrough { max-width:1160px !important; margin:72px auto 0 !important; padding:0 24px !important; box-sizing:border-box !important; }
        #sainthetic-home #product-walkthrough .how-step-wrapper { display:grid !important; grid-template-columns:minmax(260px,.72fr) minmax(0,1.28fr) !important; grid-template-rows:auto auto !important; grid-template-areas:"copy preview" "benefits benefits" !important; align-items:center !important; gap:22px 34px !important; margin:0 auto 26px !important; padding:30px !important; border:1px solid #e9e5da !important; border-radius:28px !important; background:linear-gradient(145deg,#fffdf7 0%,#fff 65%,#fffaf0 100%) !important; box-shadow:0 18px 48px rgba(31,42,68,.075) !important; text-align:left !important; overflow:hidden !important; }
        #sainthetic-home #product-walkthrough .step-text { grid-area:copy !important; min-width:0 !important; padding:0 !important; text-align:left !important; }
        #sainthetic-home #product-walkthrough .step-number-label { display:inline-flex !important; align-items:center !important; margin:0 0 16px !important; padding:8px 14px !important; border:1px solid #eddda8 !important; border-radius:999px !important; background:#fff2c8 !important; color:#755b1c !important; font-size:.72rem !important; font-weight:900 !important; letter-spacing:.15em !important; }
        #sainthetic-home #product-walkthrough .step-text h3 { margin:0 0 13px !important; color:#111827 !important; font-size:clamp(1.75rem,3vw,2.45rem) !important; line-height:1.06 !important; letter-spacing:-.055em !important; font-weight:900 !important; }
        #sainthetic-home #product-walkthrough .step-text p { margin:0 !important; color:#59647a !important; font-size:1rem !important; line-height:1.58 !important; }
        #sainthetic-home #product-walkthrough .step-image { grid-area:preview !important; display:block !important; min-width:0 !important; width:100% !important; margin:0 !important; padding:0 !important; overflow:hidden !important; border:1px solid #dce2eb !important; border-radius:19px !important; background:#11131d !important; box-shadow:0 16px 36px rgba(26,32,48,.16) !important; }
        #sainthetic-home #product-walkthrough .step-image-toolbar { display:flex !important; align-items:center !important; justify-content:space-between !important; gap:10px !important; min-height:34px !important; padding:0 12px !important; background:#f8f9fb !important; border-bottom:1px solid #e7ebf1 !important; color:#687287 !important; font-size:.65rem !important; font-weight:700 !important; }
        #sainthetic-home #product-walkthrough .step-window-dots { display:flex !important; align-items:center !important; gap:5px !important; }
        #sainthetic-home #product-walkthrough .step-window-dots i { display:block !important; width:7px !important; height:7px !important; border-radius:50% !important; background:#d8dce4 !important; }
        #sainthetic-home #product-walkthrough .step-window-dots i:first-child { background:#f28b82 !important; }
        #sainthetic-home #product-walkthrough .step-window-dots i:nth-child(2) { background:#fbbc04 !important; }
        #sainthetic-home #product-walkthrough .step-window-dots i:nth-child(3) { background:#81c995 !important; }
        #sainthetic-home #product-walkthrough .step-window-status { color:#8a7440 !important; font-size:.56rem !important; letter-spacing:.1em !important; }
        #sainthetic-home #product-walkthrough .step-image img { display:block !important; width:100% !important; max-width:100% !important; height:auto !important; margin:0 !important; object-fit:contain !important; object-position:center !important; background:#11131d !important; }
        #sainthetic-home #product-walkthrough .step-highlights { grid-area:benefits !important; display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:10px !important; margin:0 !important; }
        #sainthetic-home #product-walkthrough .step-highlight { display:flex !important; align-items:center !important; gap:10px !important; min-width:0 !important; min-height:58px !important; padding:10px 12px !important; border:1px solid #eeeae0 !important; border-radius:14px !important; background:rgba(255,255,255,.9) !important; }
        #sainthetic-home #product-walkthrough .step-highlight-icon { display:grid !important; place-items:center !important; flex:0 0 32px !important; width:32px !important; height:32px !important; border-radius:10px !important; background:#fff1bf !important; color:#755b1c !important; }
        #sainthetic-home #product-walkthrough .step-highlight-copy { min-width:0 !important; }
        #sainthetic-home #product-walkthrough .step-highlight-copy strong { display:block !important; color:#172033 !important; font-size:.78rem !important; line-height:1.2 !important; }
        #sainthetic-home #product-walkthrough .step-highlight-copy small { display:block !important; margin-top:3px !important; color:#657087 !important; font-size:.68rem !important; line-height:1.3 !important; }
        @media (max-width:760px) {
          #sainthetic-home #product-walkthrough { margin:48px auto 0 !important; padding:0 16px !important; }
          #sainthetic-home #product-walkthrough > h2 { font-size:clamp(1.9rem,7vw,2.4rem) !important; line-height:1.08 !important; }
          #sainthetic-home #product-walkthrough > p { margin:0 auto 26px !important; font-size:.94rem !important; }
          #sainthetic-home #product-walkthrough .how-step-wrapper { display:flex !important; flex-direction:column !important; align-items:stretch !important; gap:15px !important; margin:0 auto 20px !important; padding:17px !important; border-radius:22px !important; background:linear-gradient(150deg,#fffdf8,#fff) !important; box-shadow:0 12px 30px rgba(31,42,68,.07) !important; }
          #sainthetic-home #product-walkthrough .step-text { order:1 !important; }
          #sainthetic-home #product-walkthrough .step-image { order:2 !important; border-radius:14px !important; box-shadow:0 10px 24px rgba(26,32,48,.13) !important; }
          #sainthetic-home #product-walkthrough .step-image-toolbar { min-height:29px !important; padding:0 9px !important; font-size:.58rem !important; }
          #sainthetic-home #product-walkthrough .step-window-status { font-size:.49rem !important; }
          #sainthetic-home #product-walkthrough .step-text h3 { margin:0 0 8px !important; font-size:1.55rem !important; line-height:1.1 !important; }
          #sainthetic-home #product-walkthrough .step-text p { font-size:.9rem !important; line-height:1.48 !important; }
          #sainthetic-home #product-walkthrough .step-number-label { margin:0 0 10px !important; padding:6px 11px !important; font-size:.66rem !important; }
          #sainthetic-home #product-walkthrough .step-highlights { order:3 !important; grid-template-columns:1fr !important; gap:6px !important; }
          #sainthetic-home #product-walkthrough .step-highlight { min-height:0 !important; padding:7px 9px !important; border-radius:11px !important; }
          #sainthetic-home #product-walkthrough .step-highlight-icon { flex-basis:27px !important; width:27px !important; height:27px !important; }
          #sainthetic-home #product-walkthrough .step-highlight-copy strong { font-size:.73rem !important; }
          #sainthetic-home #product-walkthrough .step-highlight-copy small { font-size:.65rem !important; }
        }
      `}</style>
      <style>{`
        /* FAQ follows the warm, editorial sAInthetic landing-page template. */
        #sainthetic-home #faq.reference-faq {
          display:grid !important; grid-template-columns:minmax(245px,.72fr) minmax(0,1.28fr) !important;
          align-items:start !important; gap:clamp(30px,5vw,68px) !important;
          width:calc(100% - 48px) !important; max-width:1120px !important;
          margin:82px auto 0 !important; padding:clamp(25px,4vw,48px) !important;
          box-sizing:border-box !important; border:1px solid #eee9df !important; border-radius:30px !important;
          background:linear-gradient(145deg,#fffdf7 0%,#fff 62%,#fffaf0 100%) !important;
          box-shadow:0 16px 42px rgba(31,42,68,.055) !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-intro { text-align:left !important; padding-top:8px !important; }
        #sainthetic-home #faq.reference-faq .reference-faq-eyebrow {
          display:inline-flex !important; align-items:center !important; gap:8px !important;
          margin:0 0 18px !important; padding:8px 13px !important; border:1px solid #f0dfa9 !important;
          border-radius:999px !important; background:#fff2c8 !important; color:#755b1c !important;
          font-size:.68rem !important; font-weight:850 !important; letter-spacing:.13em !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-eyebrow span { font-size:1rem !important; }
        #sainthetic-home #faq.reference-faq h2 {
          margin:0 0 14px !important; color:#111827 !important; font-size:clamp(2rem,3.3vw,2.8rem) !important;
          line-height:1.04 !important; letter-spacing:-.055em !important; font-weight:900 !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-intro > p {
          margin:0 !important; color:#59647a !important; font-size:1rem !important; line-height:1.6 !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-note {
          display:flex !important; align-items:flex-start !important; gap:10px !important; margin-top:25px !important;
          padding:13px 14px !important; border:1px solid #eeeae0 !important; border-radius:14px !important;
          background:#fff !important; color:#657087 !important; font-size:.82rem !important; line-height:1.45 !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-note span:first-child { color:#987a34 !important; font-size:1rem !important; }
        #sainthetic-home #faq.reference-faq .reference-faq-list { display:flex !important; flex-direction:column !important; gap:10px !important; min-width:0 !important; }
        #sainthetic-home #faq.reference-faq .reference-faq-item {
          overflow:hidden !important; border:1px solid #e9e5dc !important; border-radius:17px !important;
          background:#fff !important; box-shadow:0 5px 16px rgba(31,42,68,.035) !important;
          transition:border-color .2s ease, box-shadow .2s ease !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-item.is-open {
          border-color:#ead79c !important; box-shadow:0 9px 24px rgba(31,42,68,.06) !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-question {
          display:flex !important; align-items:center !important; gap:13px !important; width:100% !important;
          min-height:72px !important; padding:14px 17px !important; border:0 !important; border-radius:0 !important;
          background:#fff !important; color:#172033 !important; text-align:left !important; cursor:pointer !important;
          font:inherit !important; box-sizing:border-box !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-icon {
          display:grid !important; place-items:center !important; flex:0 0 37px !important; width:37px !important; height:37px !important;
          border-radius:12px !important; background:#fff2c8 !important; color:#755b1c !important; font-size:1.05rem !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-question-text {
          flex:1 1 auto !important; min-width:0 !important; color:#202b40 !important;
          font-size:.96rem !important; font-weight:750 !important; line-height:1.4 !important; text-align:left !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-chevron {
          display:grid !important; place-items:center !important; flex:0 0 29px !important; width:29px !important; height:29px !important;
          margin-left:3px !important; border-radius:50% !important; background:#faf7ee !important; color:#8a6d2c !important;
          font-size:1.35rem !important; line-height:1 !important;
        }
        #sainthetic-home #faq.reference-faq .reference-faq-answer { overflow:hidden !important; }
        #sainthetic-home #faq.reference-faq .reference-faq-answer p {
          margin:0 !important; padding:0 20px 19px 67px !important; color:#59647a !important;
          font-size:.91rem !important; line-height:1.65 !important; text-align:left !important;
        }
        @media (max-width:760px) {
          #sainthetic-home #faq.reference-faq {
            display:flex !important; flex-direction:column !important; gap:22px !important;
            width:calc(100% - 32px) !important; margin:48px auto 0 !important; padding:22px 16px 17px !important;
            border-radius:23px !important;
          }
          #sainthetic-home #faq.reference-faq .reference-faq-intro { padding:0 2px !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-eyebrow { margin-bottom:12px !important; font-size:.63rem !important; }
          #sainthetic-home #faq.reference-faq h2 { max-width:440px !important; margin-bottom:9px !important; font-size:clamp(1.8rem,7vw,2.2rem) !important; line-height:1.06 !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-intro > p { font-size:.9rem !important; line-height:1.5 !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-note { margin-top:14px !important; padding:10px 11px !important; font-size:.76rem !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-list { gap:8px !important; width:100% !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-item { border-radius:14px !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-question { min-height:64px !important; gap:9px !important; padding:11px 10px !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-icon { flex-basis:31px !important; width:31px !important; height:31px !important; border-radius:10px !important; font-size:.9rem !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-question-text { font-size:.86rem !important; line-height:1.35 !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-chevron { flex-basis:25px !important; width:25px !important; height:25px !important; font-size:1.15rem !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-answer p { padding:0 13px 15px 50px !important; font-size:.83rem !important; line-height:1.55 !important; }
        }
        @media (max-width:380px) {
          #sainthetic-home #faq.reference-faq { width:calc(100% - 24px) !important; padding:19px 12px 14px !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-question { gap:7px !important; padding:10px 8px !important; }
          #sainthetic-home #faq.reference-faq .reference-faq-question-text { font-size:.81rem !important; }
        }
      `}</style>
      <style>{`
        /* Replace the generic silhouette avatars in the Step 2 product screenshot with real portraits. */
        #sainthetic-home #product-walkthrough .step-image-canvas { position:relative !important; width:100% !important; line-height:0 !important; }
        #sainthetic-home #product-walkthrough .step-image-canvas > img { display:block !important; width:100% !important; height:auto !important; }
        #sainthetic-home #product-walkthrough .step-persona-portrait-overlay { position:absolute !important; inset:0 !important; pointer-events:none !important; }
        #sainthetic-home #product-walkthrough .step-persona-portrait {
          position:absolute !important; top:2.8% !important; display:block !important;
          width:5.8% !important; aspect-ratio:1 / 1 !important; height:auto !important;
          box-sizing:border-box !important; padding:0 !important; margin:0 !important;
          border:2px solid #fff !important; border-radius:50% !important;
          box-shadow:0 2px 7px rgba(0,0,0,.22) !important;
          background-image:url("/community-avatars-clean.webp?v=20261103") !important;
          background-repeat:no-repeat !important; background-size:500% 130% !important;
          background-position-y:50% !important;
        }
        /* Use the sprite's actual portrait centres; equal 20% slices cut through faces. */
        #sainthetic-home #product-walkthrough .step-persona-portrait-one { left:23% !important; transform:translateX(-50%) !important; background-position-x:34.375% !important; }
        #sainthetic-home #product-walkthrough .step-persona-portrait-two { left:50% !important; transform:translateX(-50%) !important; background-position-x:65.625% !important; }
        #sainthetic-home #product-walkthrough .step-persona-portrait-three { left:77.3% !important; transform:translateX(-50%) !important; background-position-x:96.875% !important; }
      `}</style>
      <style>{`
        /* Tighten the transition from the growth proof bar into pricing. */
        #sainthetic-home .reference-growth-bar { margin-bottom: 0 !important; }
        #sainthetic-home .reference-pricing {
          margin-top: -215px !important;
          padding-top: 0 !important;
        }
        @media (max-width:700px) {
          #sainthetic-home .reference-pricing { margin-top: -90px !important; }
        }

        /* Additional proof point: illustrative value of five hours saved weekly. */
        #sainthetic-home .reference-growth-bar {
          grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr) minmax(0,1fr) auto !important;
          gap:16px !important;
        }
        #sainthetic-home .growth-savings {
          min-width:0 !important; padding-left:18px !important;
          border-left:1px solid #e1e5ec !important;
        }
        #sainthetic-home .growth-savings strong {
          display:flex !important; align-items:baseline !important; gap:3px !important;
          color:#15734c !important; font-size:1.55rem !important; letter-spacing:-.055em !important;
        }
        #sainthetic-home .growth-savings .growth-period {
          color:#15734c !important; font-size:.75rem !important; font-weight:750 !important;
        }
        #sainthetic-home .growth-savings > span { color:#35425d !important; font-size:.72rem !important; line-height:1.25 !important; }
        #sainthetic-home .growth-savings small { color:#8790a0 !important; font-size:.61rem !important; line-height:1.25 !important; }
        @media (max-width:900px) {
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr 1fr auto !important; }
          #sainthetic-home .growth-savings { border-left:0 !important; padding-left:0 !important; }
        }
        @media (max-width:700px) {
          #sainthetic-home .reference-growth-bar { grid-template-columns:1fr 1fr !important; align-items:center !important; gap:14px 12px !important; }
          #sainthetic-home .growth-message { grid-column:1/-1 !important; }
          #sainthetic-home .growth-count { min-width:0 !important; }
          #sainthetic-home .growth-savings { padding:0 !important; border:0 !important; }
          #sainthetic-home .growth-avatars { grid-column:1/-1 !important; justify-content:flex-start !important; }
        }
      `}</style>
      <style>{`
        /* Case-study header: keep the three achievement cards inside the case-study frame. */
        #sainthetic-home #case-study .cs-company-bar {
          display:flex !important; flex-direction:column !important; align-items:stretch !important;
          gap:18px !important; width:100% !important; box-sizing:border-box !important; min-width:0 !important;
        }
        #sainthetic-home #case-study .cs-company-brand {
          display:flex !important; flex-direction:row !important; align-items:center !important;
          justify-content:flex-start !important; gap:16px !important; width:100% !important; min-width:0 !important;
        }
        #sainthetic-home #case-study .cs-company-logo { flex:0 0 46px !important; }
        #sainthetic-home #case-study .cs-company-info { flex:1 1 auto !important; min-width:0 !important; width:auto !important; }
        #sainthetic-home #case-study .cs-company-info > div:first-child { text-align:left !important; }
        #sainthetic-home #case-study .cs-company-info > div:nth-child(2) { text-align:left !important; }
        #sainthetic-home #case-study .cs-achievement-grid {
          display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:9px !important; width:100% !important; min-width:0 !important;
        }
        #sainthetic-home #case-study .cs-achievement-card {
          display:flex !important; flex-direction:column !important; align-items:center !important; justify-content:center !important;
          width:100% !important; min-width:0 !important; max-width:none !important; min-height:76px !important;
          box-sizing:border-box !important; padding:10px 8px !important; overflow:hidden !important;
        }
        #sainthetic-home #case-study .cs-achievement-card > div:first-child {
          font-size:clamp(.85rem,1.4vw,1.05rem) !important; line-height:1.15 !important;
          white-space:normal !important; overflow-wrap:anywhere !important;
        }
        #sainthetic-home #case-study .cs-achievement-card > div:nth-child(2) {
          font-size:.68rem !important; line-height:1.25 !important; margin-top:4px !important;
          overflow-wrap:anywhere !important;
        }
        #sainthetic-home #case-study .cs-achievement-card > div:nth-child(3) {
          font-size:.58rem !important; line-height:1.2 !important; margin-top:3px !important;
          white-space:normal !important; overflow-wrap:anywhere !important;
        }
        @media (max-width:900px) {
          #sainthetic-home #case-study .cs-company-bar { grid-template-columns:minmax(0,1fr) !important; gap:14px !important; }
          #sainthetic-home #case-study .cs-achievement-grid { max-width:100% !important; }
        }
        @media (max-width:520px) {
          #sainthetic-home #case-study .cs-company-bar { padding:16px !important; }
          #sainthetic-home #case-study .cs-company-brand { align-items:center !important; gap:12px !important; }
          #sainthetic-home #case-study .cs-company-logo { flex-basis:42px !important; width:42px !important; height:42px !important; }
          #sainthetic-home #case-study .cs-company-achievement-grid { width:100% !important; }
          #sainthetic-home #case-study .cs-achievement-grid { grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:7px !important; }
          #sainthetic-home #case-study .cs-achievement-card { min-height:70px !important; padding:8px 5px !important; border-radius:9px !important; }
          #sainthetic-home #case-study .cs-achievement-card > div:first-child { font-size:.82rem !important; }
          #sainthetic-home #case-study .cs-achievement-card > div:nth-child(2) { font-size:.61rem !important; }
          #sainthetic-home #case-study .cs-achievement-card > div:nth-child(3) { font-size:.53rem !important; }
        }
      `}</style>
      <style>{`
        /* Pull the final CTA closer to the FAQ; avoid an oversized blank transition. */
        #sainthetic-home .final-cta-section {
          margin-top:0 !important; padding:3rem 20px 2rem !important;
          min-height:0 !important; height:auto !important;
        }
        #sainthetic-home .final-cta-section > div:first-child { margin-top:0 !important; }
        #sainthetic-home .final-cta-section footer { margin-top:2rem !important; }
        @media (max-width:760px) {
          #sainthetic-home .final-cta-section {
            margin-top:0 !important; padding:1.5rem 16px 1.5rem !important;
            min-height:0 !important; height:auto !important;
          }
          #sainthetic-home .final-cta-section h2 {
            margin-bottom:12px !important; font-size:clamp(1.8rem,7.4vw,2.35rem) !important;
            line-height:1.06 !important; letter-spacing:-.055em !important;
          }
          #sainthetic-home .final-cta-section p { margin-bottom:20px !important; font-size:1rem !important; line-height:1.5 !important; }
          #sainthetic-home .final-cta-section footer { margin-top:1.75rem !important; }
        }
      `}</style>
      <style>{`
        /* Keep all four hero reassurance points balanced and visible. */
        #sainthetic-home header#hero .reference-reassurance {
          display:flex !important; flex-wrap:wrap !important; align-items:center !important;
          gap:9px 18px !important; max-width:100% !important;
        }
        #sainthetic-home header#hero .reference-reassurance span {
          display:inline-flex !important; align-items:center !important; white-space:nowrap !important;
        }
        @media (max-width:760px) {
          #sainthetic-home header#hero .reference-reassurance {
            display:grid !important; grid-template-columns:repeat(2,minmax(0,max-content)) !important;
            justify-content:start !important; align-items:center !important; column-gap:16px !important;
            row-gap:9px !important; width:100% !important; font-size:.72rem !important;
          }
          #sainthetic-home header#hero .reference-reassurance span { white-space:nowrap !important; }
        }
        @media (max-width:370px) {
          #sainthetic-home header#hero .reference-reassurance { grid-template-columns:minmax(0,1fr) !important; row-gap:7px !important; }
        }
      `}</style>
      <style>{`
        /* Keep both hero calls-to-action side by side on phones. */
        @media (max-width:760px) {
          #sainthetic-home header#hero .reference-actions {
            display:grid !important; grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important;
            align-items:stretch !important; gap:9px !important; width:100% !important;
          }
          #sainthetic-home header#hero .reference-actions a {
            display:flex !important; width:100% !important; min-width:0 !important;
            min-height:48px !important; height:auto !important; box-sizing:border-box !important;
            justify-content:center !important; gap:6px !important; padding:9px 10px !important;
            border-radius:13px !important; font-size:clamp(.68rem,3.1vw,.82rem) !important;
            line-height:1.15 !important; text-align:center !important; white-space:normal !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-primary span {
            flex:0 0 auto !important; font-size:1rem !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-secondary .play-icon {
            flex:0 0 13px !important; width:13px !important; height:15px !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-secondary .play-icon::before {
            border-top-width:7px !important; border-bottom-width:7px !important; border-left-width:12px !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-secondary .play-icon::after {
            left:2px !important; top:4px !important; border-top-width:3.5px !important;
            border-bottom-width:3.5px !important; border-left-width:7px !important;
          }
        }
        @media (max-width:360px) {
          #sainthetic-home header#hero .reference-actions { gap:7px !important; }
          #sainthetic-home header#hero .reference-actions a { padding:8px 6px !important; font-size:.66rem !important; }
        }
      `}</style>
      <style>{`
        /* Caption the community portraits with a concise buyer-persona message. */
        #sainthetic-home .growth-avatars {
          display:flex !important; align-items:center !important; justify-content:flex-start !important;
          gap:0 !important; min-width:0 !important;
        }
        #sainthetic-home .growth-avatars-caption {
          display:block !important; max-width:190px !important; margin-left:13px !important;
          color:#35425d !important; font-size:.76rem !important; font-weight:650 !important;
          line-height:1.35 !important; letter-spacing:-.01em !important;
        }
        @media (max-width:700px) {
          #sainthetic-home .growth-avatars { grid-column:1/-1 !important; justify-content:center !important; flex-wrap:wrap !important; row-gap:9px !important; }
          #sainthetic-home .growth-avatars-caption { max-width:230px !important; margin-left:10px !important; font-size:.72rem !important; }
        }
        @media (max-width:380px) {
          #sainthetic-home .growth-avatars { justify-content:flex-start !important; }
          #sainthetic-home .growth-avatars-caption { max-width:170px !important; font-size:.68rem !important; }
        }
      `}</style>
      <style>{`
        /* Keep the portraits grouped on the left and give the message its own space. */
        #sainthetic-home .growth-community-proof {
          display:flex !important; align-items:center !important; justify-content:flex-start !important;
          gap:16px !important; min-width:0 !important; width:100% !important;
        }
        #sainthetic-home .growth-community-proof .growth-avatars {
          display:flex !important; flex:0 0 auto !important; align-items:center !important;
          justify-content:flex-start !important; width:max-content !important; min-width:0 !important;
        }
        #sainthetic-home .growth-community-proof .growth-avatars > span {
          flex:0 0 42px !important; width:42px !important; height:42px !important;
        }
        #sainthetic-home .growth-community-proof .growth-avatars-caption {
          display:block !important; position:static !important; flex:1 1 150px !important;
          width:auto !important; height:auto !important; min-width:0 !important; max-width:190px !important;
          margin:0 !important; padding:0 !important; overflow:visible !important;
          border:0 !important; border-radius:0 !important; background:transparent !important; box-shadow:none !important;
          color:#35425d !important; font-size:.76rem !important; font-weight:650 !important;
          line-height:1.35 !important; text-align:left !important; letter-spacing:-.01em !important;
        }
        @media (max-width:900px) {
          #sainthetic-home .growth-community-proof { grid-column:1/-1 !important; justify-content:center !important; }
        }
        @media (max-width:700px) {
          #sainthetic-home .growth-community-proof { gap:14px !important; justify-content:center !important; }
          #sainthetic-home .growth-community-proof .growth-avatars > span { flex-basis:38px !important; width:38px !important; height:38px !important; }
          #sainthetic-home .growth-community-proof .growth-avatars-caption { max-width:185px !important; font-size:.72rem !important; }
        }
        @media (max-width:380px) {
          #sainthetic-home .growth-community-proof { gap:10px !important; justify-content:flex-start !important; }
          #sainthetic-home .growth-community-proof .growth-avatars > span { flex-basis:34px !important; width:34px !important; height:34px !important; margin-left:-8px !important; }
          #sainthetic-home .growth-community-proof .growth-avatars-caption { max-width:150px !important; font-size:.68rem !important; }
        }
      `}</style>
      <style>{`
        #sainthetic-home .growth-typing-caret {
          display:inline-block !important;
          width:2px !important;
          height:1em !important;
          margin-left:2px !important;
          vertical-align:-.12em !important;
          background:#d3a92e !important;
          animation:growthTypingBlink .85s steps(2,start) infinite !important;
        }
        @keyframes growthTypingBlink { to { visibility:hidden; } }
        @media (prefers-reduced-motion:reduce) {
          #sainthetic-home .growth-typing-caret { animation:none !important; opacity:0 !important; }
        }
      `}</style>
      <style>{`
        /* Lightweight live UI overlays make the product screenshots feel active without altering the source images. */
        #sainthetic-home #product-walkthrough .step-image-canvas { position:relative !important; overflow:hidden !important; }
        #sainthetic-home #product-walkthrough .step-live-activity {
          position:absolute !important; right:2.4% !important; bottom:4.2% !important; z-index:3 !important;
          max-width:min(48%,330px) !important; pointer-events:none !important; line-height:1.2 !important;
          color:#f8fafc !important; font-family:inherit !important;
          filter:drop-shadow(0 8px 18px rgba(0,0,0,.25)) !important;
        }
        #sainthetic-home #product-walkthrough .step-live-selection,
        #sainthetic-home #product-walkthrough .step-live-persona,
        #sainthetic-home #product-walkthrough .step-live-question {
          display:flex !important; align-items:center !important; gap:10px !important;
          padding:11px 14px !important; border:1px solid rgba(255,217,69,.55) !important;
          border-radius:13px !important; background:rgba(19,21,33,.94) !important;
          box-shadow:0 8px 26px rgba(0,0,0,.2) !important; backdrop-filter:blur(10px) !important;
        }
        #sainthetic-home #product-walkthrough .step-live-check {
          display:grid !important; place-items:center !important; flex:0 0 25px !important;
          width:25px !important; height:25px !important; border-radius:50% !important;
          background:#ffdf62 !important; color:#171b2b !important; font-weight:900 !important;
        }
        #sainthetic-home #product-walkthrough .step-live-activity small {
          display:block !important; margin:0 0 4px !important; color:#ffdf62 !important;
          font-size:8px !important; font-weight:850 !important; letter-spacing:.12em !important;
        }
        #sainthetic-home #product-walkthrough .step-live-activity strong {
          display:block !important; color:#fff !important; font-size:12px !important; font-weight:750 !important;
        }
        #sainthetic-home #product-walkthrough .step-live-pulse {
          flex:0 0 7px !important; width:7px !important; height:7px !important;
          margin-left:5px !important; border-radius:50% !important; background:#72d6a0 !important;
          box-shadow:0 0 0 0 rgba(114,214,160,.55) !important;
          animation:stepLivePulse 1.8s ease-out infinite !important;
        }
        #sainthetic-home #product-walkthrough .step-live-persona { display:block !important; min-width:205px !important; }
        #sainthetic-home #product-walkthrough .step-live-insight-list { display:grid !important; gap:5px !important; }
        #sainthetic-home #product-walkthrough .step-live-insight-list span {
          display:flex !important; align-items:center !important; gap:7px !important;
          color:#f5f6fa !important; font-size:10px !important; font-weight:600 !important;
        }
        #sainthetic-home #product-walkthrough .step-live-insight-list b { color:#ffdf62 !important; font-size:12px !important; }
        #sainthetic-home #product-walkthrough .step-live-question { max-width:300px !important; }
        #sainthetic-home #product-walkthrough .step-live-question-icon { color:#ffdf62 !important; font-size:22px !important; }
        #sainthetic-home #product-walkthrough .step-live-question strong { font-size:11px !important; line-height:1.35 !important; }
        #sainthetic-home #product-walkthrough .step-live-cursor {
          flex:0 0 2px !important; width:2px !important; height:20px !important;
          background:#ffdf62 !important; animation:stepLiveBlink .8s steps(2,start) infinite !important;
        }
        @keyframes stepLivePulse { 70% { box-shadow:0 0 0 7px rgba(114,214,160,0); } 100% { box-shadow:0 0 0 0 rgba(114,214,160,0); } }
        @keyframes stepLiveBlink { to { opacity:0; } }
        @media (max-width:760px) {
          #sainthetic-home #product-walkthrough .step-live-activity { right:2.5% !important; bottom:3% !important; max-width:58% !important; }
          #sainthetic-home #product-walkthrough .step-live-selection,
          #sainthetic-home #product-walkthrough .step-live-persona,
          #sainthetic-home #product-walkthrough .step-live-question { gap:7px !important; padding:7px 9px !important; border-radius:9px !important; }
          #sainthetic-home #product-walkthrough .step-live-activity small { font-size:6px !important; }
          #sainthetic-home #product-walkthrough .step-live-activity strong { font-size:9px !important; }
          #sainthetic-home #product-walkthrough .step-live-persona { min-width:150px !important; }
          #sainthetic-home #product-walkthrough .step-live-insight-list span { font-size:8px !important; }
          #sainthetic-home #product-walkthrough .step-live-question strong { font-size:8px !important; }
          #sainthetic-home #product-walkthrough .step-live-check { flex-basis:20px !important; width:20px !important; height:20px !important; }
        }
        @media (prefers-reduced-motion:reduce) {
          #sainthetic-home #product-walkthrough .step-live-pulse,
          #sainthetic-home #product-walkthrough .step-live-cursor { animation:none !important; }
        }
      `}</style>

      <style>{`
        /* Give the AI question heading a clear, intentional reveal. */
        #sainthetic-home .reference-question-title {
          display:block !important; position:relative !important;
          padding-bottom:7px !important; overflow:hidden !important;
        }
        #sainthetic-home .reference-question-title > span {
          display:inline-block !important;
        }
        #sainthetic-home .reference-question-title > i {
          display:block !important; width:42px !important; height:3px !important;
          margin-top:6px !important; border-radius:3px !important;
          background:#ffd945 !important; transform-origin:left center !important;
        }
        #sainthetic-home .reference-question {
          will-change:transform,opacity !important;
        }
        @media (prefers-reduced-motion:reduce) {
          #sainthetic-home .reference-question-title > i { transform:none !important; }
          #sainthetic-home .reference-question { will-change:auto !important; }
        }

        /* Conversion-focused CTA hierarchy and preview invitation. */
        #sainthetic-home .reference-primary { font-weight:850 !important; }
        #sainthetic-home .reference-reassurance { flex-wrap:wrap !important; }
        #sainthetic-home .reference-pricing .pricing-intro { margin-bottom:24px !important; }
        #sainthetic-home .reference-price-card:first-child { border-color:#f0d46a !important; box-shadow:0 12px 28px rgba(255,217,69,.13) !important; }
        #sainthetic-home .reference-price-card:first-child > a { background:#ffd945 !important; border-color:#ffd945 !important; color:#111827 !important; }
        #sainthetic-home .final-cta-section a {
          display:inline-flex !important;
          align-items:center !important;
          justify-content:center !important;
          width:auto !important;
          min-width:0 !important;
          max-width:min(100%,380px) !important;
          padding:1rem 1.7rem !important;
          font-size:1.05rem !important;
          line-height:1.25 !important;
          white-space:nowrap !important;
          box-sizing:border-box !important;
        }
        @media (max-width:760px) {
          #sainthetic-home .final-cta-section a {
            width:auto !important;
            max-width:min(100%,340px) !important;
            padding:.95rem 1.35rem !important;
            font-size:1rem !important;
          }
        }
        #sainthetic-home .reference-growth-bar { margin-bottom:0 !important; }

        /* Keep the case-study intro compact on desktop while retaining centred content. */
        #sainthetic-home #case-study .cs-intro-header {
          min-height:320px !important;
          height:auto !important;
          box-sizing:border-box !important;
          padding:32px 30px !important;
          margin:0 auto 2rem !important;
          display:flex !important;
          flex-direction:column !important;
          align-items:center !important;
          justify-content:center !important;
          text-align:center !important;
        }
        #sainthetic-home #case-study .cs-intro-header h2 {
          width:100% !important;
          max-width:900px !important;
          margin:0 auto 18px !important;
          text-align:center !important;
        }
        #sainthetic-home #case-study .cs-intro-header p {
          width:100% !important;
          max-width:850px !important;
          margin:0 auto !important;
          text-align:center !important;
        }
        @media (max-width:700px) {
          #sainthetic-home #case-study .cs-intro-header {
            min-height:420px !important;
            padding:30px 16px !important;
            margin-bottom:2rem !important;
          }
        }
      `}</style>
      <style>{`
        /* Desktop/tablet hero refinements: keep the mock sidebar and CTAs inside their columns. */
        @media (min-width:761px) {
          #sainthetic-home .reference-app-window {
            grid-template-columns:122px minmax(0,1fr) !important;
            padding-left:15px !important;
            padding-right:15px !important;
          }
          #sainthetic-home .reference-app-sidebar {
            min-width:0 !important;
            overflow:hidden !important;
            padding-right:8px !important;
            font-size:.68rem !important;
          }
          #sainthetic-home .reference-app-sidebar > div:not(:first-child) {
            display:block !important;
            box-sizing:border-box !important;
            width:100% !important;
            min-width:0 !important;
            overflow:hidden !important;
            padding:7px 5px !important;
            text-overflow:ellipsis !important;
            white-space:nowrap !important;
          }
          #sainthetic-home .reference-app-sidebar .active { max-width:100% !important; }
          #sainthetic-home header#hero .reference-actions {
            display:flex !important; flex-flow:row nowrap !important; align-items:stretch !important;
            gap:12px !important; width:100% !important; min-width:0 !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-primary {
            flex:1 1 auto !important; min-width:0 !important; min-height:58px !important;
            padding:0 18px !important; font-size:clamp(14px,1.25vw,17px) !important;
            white-space:nowrap !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-secondary {
            flex:0 0 230px !important; width:230px !important; min-width:230px !important;
            min-height:58px !important; box-sizing:border-box !important; gap:10px !important;
            padding:0 15px !important; font-size:clamp(14px,1.2vw,16px) !important;
            white-space:nowrap !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-secondary .preview-arrow {
            flex:0 0 auto !important; font-size:1.2em !important; line-height:1 !important;
          }
        }
        @media (min-width:761px) and (max-width:1100px) {
          #sainthetic-home .reference-app-window {
            grid-template-columns:108px minmax(0,1fr) !important;
            padding-left:12px !important; padding-right:10px !important;
          }
          #sainthetic-home .reference-app-sidebar { font-size:.62rem !important; }
          #sainthetic-home header#hero .reference-actions a.reference-secondary {
            flex-basis:210px !important; width:210px !important; min-width:210px !important;
            font-size:13px !important;
          }
          #sainthetic-home header#hero .reference-actions a.reference-primary {
            padding:0 13px !important; font-size:13px !important;
          }
        }
      `}</style>

      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';
import PersonaTryDemo from "../components/PersonaTryDemo";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
  const [userCount] = useState(847);

  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);

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
      question: "We already know our ICP — do we still need this?",
      answer: "Knowing your ICP is a starting point, not the finish line. sAInthetic takes your ICP and reveals the specific questions they're asking AI tools like ChatGPT and Perplexity right now — questions that map directly to content gaps your competitors haven't filled. Most teams are surprised by what their personas actually ask."
    },
    {
      question: "Will AI-generated content sound generic?",
      answer: "Not with sAInthetic. Every piece of content is generated from a specific persona's goals, pain points, and synthetic queries — not a blank prompt. The output is tailored to a real audience context, which is why customers consistently see better engagement than with generic AI writing tools."
    },
    {
      question: "We already have writers — how does this fit in?",
      answer: "sAInthetic makes your writers faster and more strategic, not redundant. Instead of spending hours researching what to write, your team gets a ready-made brief: the persona, the questions they ask, and the angle that converts. Writers focus on craft; sAInthetic handles the intelligence layer."
    }
  ];

  return (
    <div id="sainthetic-home" style={{ minHeight: "100vh", minWidth: "100vw", margin: 0, padding: 0, background: "#fff", display: "flex", flexDirection: "column" }}>
      <NavigationBar />
      <style>{`
        /* sAInthetic white editorial redesign — homepage only */
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
        @media (min-width: 801px) {
          #sainthetic-home .sainthetic-menu-toggle { display: none !important; }
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
          letter-spacing: .01em !important;
        }
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
        /* Premium visual system — presentation only; all page copy and behaviour stay intact. */
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
        <header id="hero" style={{ width: "100%", maxWidth: 860, margin: "0 auto", padding: "68px 20px 32px 20px", position: "relative", zIndex: 3, boxSizing: "border-box", textAlign: "center" }}>

          {/* Social proof pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,217,69,0.12)", border: "1px solid rgba(255,217,69,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 28, fontSize: "0.82rem", color: "#ffd945", fontWeight: 700 }}
          >
            <span>⚡</span>
            <span>Join {userCount.toLocaleString()}+ marketers already using sAInthetic</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, background: "linear-gradient(96deg, #fff 55%, #ffd945 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 1rem 0" }}
          >
            Stop guessing what your buyers want.{" "}
            <span style={{ background: "linear-gradient(96deg, #ffd945, #ff9f43)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Know exactly what they ask AI.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            style={{ fontSize: "clamp(1rem, 2.4vw, 1.3rem)", color: "#bbb", margin: "0 auto 32px auto", maxWidth: 580, lineHeight: 1.65 }}
          >
            sAInthetic generates AI buyer personas and reveals the exact questions your customers ask LLMs. Your content ranks, converts, and never feels generic again.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <a
              href="/register"
              style={{ background: "linear-gradient(135deg, #ffd945, #ff9f43)", color: "#19191a", fontWeight: 800, fontSize: "1.1rem", padding: "1.05rem 2.6rem", borderRadius: 13, boxShadow: "0 8px 32px #ffd94550", display: "inline-block", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px #ffd94570"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px #ffd94550"; }}
            >
              See your first buyer persona in 60 seconds →
            </a>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#666", fontWeight: 500 }}>
              Free plan available · No credit card required · Cancel anytime
            </p>
            {/* Star rating social proof under CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#ffd945", fontSize: "1rem" }}>★</span>
                ))}
              </div>
              <span style={{ color: "#888", fontSize: "0.83rem", fontWeight: 600 }}>Rated 4.8/5 by 200+ marketers</span>
              <span style={{ color: "#555", fontSize: "0.75rem" }}>·</span>
              <span style={{ color: "#888", fontSize: "0.83rem", fontStyle: "italic" }}>"Finally, content that actually matches what buyers search for."</span>
            </div>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-trust-strip"
          >
            {[
              { icon: "🔒", text: "SOC2 Ready" },
              { icon: "⚡", text: "Setup in 60 seconds" },
              { icon: "🎯", text: "No prompt engineering needed" },
              { icon: "🔄", text: "Cancel anytime" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6, color: "#777", fontSize: "0.82rem", fontWeight: 600 }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

    

          {/* Persona preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ marginTop: 40, background: "radial-gradient(circle at 0% 0%, #ffd94522, transparent 60%), #14141f", borderRadius: 20, padding: "1.6rem 1.8rem", boxShadow: "0 24px 80px rgba(0,0,0,0.7)", border: "1px solid rgba(255,217,69,0.3)", textAlign: "left" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "999px", background: "radial-gradient(circle at 30% 20%, #ffd945, #ffb347 45%, #23243a 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px rgba(255,217,69,0.25)", fontSize: 22, flexShrink: 0 }}>🧠</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>Sofia, SaaS Marketing Lead</div>
                <div style={{ fontSize: "0.82rem", color: "#ffd945", fontWeight: 600 }}>AI-generated buyer persona · Lead score: 87/100</div>
              </div>
              <div style={{ marginLeft: "auto", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 8, padding: "4px 12px", fontSize: "0.75rem", color: "#4ade80", fontWeight: 700, whiteSpace: "nowrap" }}>High intent ↑</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ color: "#888", fontSize: "0.72rem", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Goal</div>
                <div style={{ color: "#ddd", fontSize: "0.84rem", lineHeight: 1.4 }}>Launch landing page that drives organic trial sign-ups</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ color: "#888", fontSize: "0.72rem", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Pain point</div>
                <div style={{ color: "#ddd", fontSize: "0.84rem", lineHeight: 1.4 }}>Guesswork about what prospects ask LLMs</div>
              </div>
            </div>
            <div style={{ background: "rgba(12,180,120,0.12)", border: "1px solid rgba(12,180,120,0.35)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span>✨</span>
              <span style={{ color: "#a5ffcf", fontSize: "0.84rem" }}>"Show me 5 content ideas that answer Sofia's top synthetic questions this week"</span>
            </div>          </motion.div>
        </header>

        
  <PersonaTryDemo />

        {/* ============ FEATURES ============ */}
        <main id="features" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.6rem", margin: "4rem auto 0 auto", maxWidth: 1200, zIndex: 2, position: "relative", padding: "0 20px" }}>
          {cards.map((card, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={card.title}
                className="feature-card"
                initial="rest"
                animate={hovered === i && !isExpanded ? "hover" : "rest"}
                variants={{ rest: { scale: 1, boxShadow: "0 6px 36px #0004" }, hover: { scale: 1.05, boxShadow: "0 18px 58px #ffd94544, 0 10px 40px #0008", transition: { type: "spring", stiffness: 230, damping: 18 } } }}
                onHoverStart={() => !isExpanded && setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                style={{ background: isExpanded ? "linear-gradient(120deg,#1a1a28 85%,#2a2a45 100%)" : "linear-gradient(120deg,#191924b7 85%,#232845c7 100%)", minWidth: 300, maxWidth: isExpanded ? 700 : 340, flex: isExpanded ? "1 1 700px" : "1 1 260px", borderRadius: "1.3rem", padding: "2.4rem 1.6rem 1.8rem 1.6rem", color: "#fff", position: "relative", boxShadow: isExpanded ? "0 20px 80px #ffd94555, 0 10px 40px #0008" : "0 3px 28px #0009", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", border: isExpanded ? "2px solid #ffd94544" : "none", zIndex: isExpanded ? 10 : 2 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <h3 style={{ fontWeight: 800, marginBottom: 11, fontSize: "1.22rem", letterSpacing: "-0.5px", color: isExpanded ? "#ffd945" : "#fff", transition: "color 0.3s" }}>{card.title}</h3>
                <p style={{ color: "#ccc", marginBottom: isExpanded ? 20 : 12, fontWeight: 500, textAlign: "center" }}>{card.desc}</p>
                {/* Always show top 2 bullets as a teaser */}
                {!isExpanded && (
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px 0", textAlign: "left", width: "100%" }}>
                    {card.expandedContent.slice(0, 2).map((item, idx) => (
                      <li key={idx} style={{ padding: "0.45rem 0", fontSize: "0.87rem", color: "#aaa", fontWeight: 500 }}>{item}</li>
                    ))}
                    <li style={{ padding: "0.35rem 0", fontSize: "0.82rem", color: "#ffd945", fontWeight: 600 }}>+ {card.expandedContent.length - 2} more — click to expand</li>
                  </ul>
                )}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", overflow: "hidden" }}>
                      <div style={{ borderTop: "1px solid rgba(255,217,69,0.2)", paddingTop: "1.5rem", marginTop: "1rem" }}>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left" }}>
                          {card.expandedContent.map((item, idx) => (
                            <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} style={{ padding: "0.8rem 0", fontSize: "0.95rem", color: "#e0e0e0", fontWeight: 500, borderBottom: idx < card.expandedContent.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>{item}</motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </main>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" style={{ margin: "7rem auto 0 auto", maxWidth: 1200, textAlign: "center", padding: "0 20px", position: "relative", zIndex: 2 }}>
          <h2 style={{ color: "#ffd945", fontWeight: 900, fontSize: "2.1rem", marginBottom: "0.9rem", letterSpacing: "-1px" }}>AI-Powered Content That Converts</h2>
          <p style={{ color: "#bbb", marginBottom: "5.2rem", fontSize: "1.15rem" }}>Generate customer personas, content ideas, and conversion-ready copy in minutes</p>

          {[
            { ref: step1Ref, inView: step1InView, img: "step-1-industry.jpg", alt: "Select Industry", step: "STEP 1", title: "Choose Your Industry", desc: "Select from 5+ industries: from SaaS to E-commerce, Healthcare to Fitness. Our AI tailors everything to your specific market." },
            { ref: step2Ref, inView: step2InView, img: "step-2-personas.jpg", alt: "AI Persona", step: "STEP 2", title: "Meet Your Customers", desc: "sAInthetic instantly generates detailed customer personas with goals, pain points, and behaviors — like having a marketing team in your pocket." },
            { ref: step3Ref, inView: step3InView, img: "step-5-prompts.jpg", alt: "Content Ideas", step: "STEP 3", title: "Prompt Library On Demand", desc: "Every persona unlocks a focused library of powerful, ready-to-use prompts that reflect realistic synthetic persona queries." },
            { ref: step4Ref, inView: step4InView, img: "step-4-content.jpg", alt: "Generated Content", step: "STEP 4", title: "Professional Copy, Instantly", desc: "One click generates 1,000–1,500 words of conversion-ready copy that speaks directly to your customers' needs." },
          ].map((s, i) => (
            <div key={i} ref={s.ref} className="how-step-wrapper">
              <motion.div className="step-image" initial={{ opacity: 0, x: -50 }} animate={s.inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(255,217,69,0.2)", border: "2px solid rgba(255,217,69,0.3)" }}>
                <img src={s.img} alt={s.alt} style={{ width: "100%", display: "block" }} />
              </motion.div>
              <motion.div className="step-text" initial={{ opacity: 0, x: 50 }} animate={s.inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                <div style={{ background: "linear-gradient(135deg,#ffd945 0%,#ffed4e 100%)", color: "#000", padding: "8px 20px", borderRadius: 20, fontSize: "0.875rem", fontWeight: 700, display: "inline-block", marginBottom: 20 }}>{s.step}</div>
                <h3 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 20px 0", letterSpacing: "-1px", color: "#fff" }}>{s.title}</h3>
                <p style={{ fontSize: "1.15rem", color: "#bbb", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </motion.div>
            </div>
          ))}
        </section>
        
        {/* ============ DEMO VIDEO ============ */}
<section style={{ margin: "5rem auto 0 auto", maxWidth: 900, padding: "0 20px", position: "relative", zIndex: 2, textAlign: "center" }}>
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


        {/* ============ RESULTS METRICS STRIP ============ */}
        <section style={{ margin: "5rem auto 0 auto", maxWidth: 900, padding: "0 20px", position: "relative", zIndex: 2 }}>
          <div style={{ background: "linear-gradient(135deg,#13131f 0%,#1e1e30 100%)", borderRadius: 20, border: "1px solid rgba(255,217,69,0.2)", padding: "2rem 1.5rem", textAlign: "center" }}>
            <div style={{ color: "#888", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "1.5rem" }}>Real results from sAInthetic customers</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }} className="cs-metrics">
              {[
                { metric: "3×", label: "Organic traffic growth", sublabel: "in 60 days", color: "#4ade80" },
                { metric: "68%", label: "Lower bounce rate", sublabel: "content-to-fit match", color: "#60a5fa" },
                { metric: "41%", label: "More trial signups", sublabel: "from blog content", color: "#ffd945" },
                { metric: "5h", label: "Saved per week", sublabel: "on content research", color: "#f472b6" },
              ].map((item, i) => (
                <div key={i} className="cs-metric-cell" style={{ padding: "1.2rem 1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(1.8rem,5vw,2.4rem)", fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: 4, letterSpacing: "-1px" }}>{item.metric}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{item.label}</div>
                  <div style={{ color: "#666", fontSize: "0.75rem", marginTop: 2 }}>{item.sublabel}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.2rem" }}>
              <a href="#case-study" style={{ color: "#ffd945", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>Read the full NexusFlow case study →</a>
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section id="pricing" style={{ margin: "5rem auto 0 auto", maxWidth: 1100, textAlign: "center", position: "relative", zIndex: 2, padding: "0 20px" }}>
          <h2 style={{ color: "#ffd945", fontWeight: 900, fontSize: "2.1rem", marginBottom: "0.9rem", letterSpacing: "-1px" }}>Simple, Fair Pricing</h2>
          <p style={{ color: "#bbb", marginBottom: "1.5rem", fontSize: "1.15rem" }}>Start for free. Every plan has access to the AI Persona Builder, Synthetic Prompts, Topic Generation</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: "3.5rem", fontSize: "0.82rem", color: "#4ade80", fontWeight: 700 }}>
            <span>🔥</span>
            <span>47 new signups this week · Join {847}+ marketers</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            {/* FREE */}
            <motion.div whileHover={{ scale: 1.03 }} onClick={() => setSelectedPlan(0)} style={{ minWidth: 260, maxWidth: 320, padding: "2.3rem 1.3rem", background: selectedPlan === 0 ? "linear-gradient(120deg,#1a1a28 85%,#2a2a45 100%)" : "linear-gradient(120deg,#191924b7 85%,#232845c7 100%)", borderRadius: "1.1rem", boxShadow: selectedPlan === 0 ? "0 8px 40px #ffd94555" : "0 3px 28px #0009", border: selectedPlan === 0 ? "2px solid #ffd945" : "2px solid transparent", cursor: "pointer", transition: "all 0.3s", position: "relative" }}>
              {selectedPlan === 0 && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#ffd945", color: "#000", padding: "4px 16px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700 }}>SELECTED</div>}
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1rem" }}>Free</h3>
              <div style={{ fontSize: 32, fontWeight: 800, margin: "18px 0", color: "#ffd945" }}>$0<span style={{ fontSize: 18, color: "#fff" }}>/mo</span></div>
              <ul style={{ color: "#bbb", textAlign: "left", margin: "0 auto 18px auto", maxWidth: 240, paddingLeft: 20, listStyle: "none" }}>
                {["1 Persona", "5 Content Ideas", "10 Prompts", "Basic Analytics", "Community Support"].map(f => <li key={f} style={{ marginBottom: "10px" }}>✓ {f}</li>)}
              </ul>
              <a href="/register" style={{ width: "100%", display: "block", background: selectedPlan === 0 ? "#ffd945" : "rgba(255,217,69,0.2)", color: selectedPlan === 0 ? "#000" : "#ffd945", fontWeight: 700, padding: "0.9rem 1.5rem", borderRadius: 8, textDecoration: "none", border: selectedPlan === 0 ? "none" : "1px solid #ffd945", transition: "all 0.2s", textAlign: "center", boxSizing: "border-box" }}>Get Started Free</a>
            </motion.div>

            {/* STARTER */}
            <motion.div whileHover={{ scale: 1.03 }} onClick={() => setSelectedPlan(1)} style={{ minWidth: 260, maxWidth: 320, padding: "2.3rem 1.3rem", background: selectedPlan === 1 ? "linear-gradient(120deg,#1a1a28 85%,#2a2a45 100%)" : "linear-gradient(120deg,#191924b7 85%,#232845c7 100%)", borderRadius: "1.1rem", boxShadow: selectedPlan === 1 ? "0 8px 40px #ffd94555" : "0 3px 28px #0009", border: selectedPlan === 1 ? "2px solid #ffd945" : "2px solid transparent", cursor: "pointer", transition: "all 0.3s", position: "relative" }}>
              {selectedPlan === 1 && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#ffd945", color: "#000", padding: "4px 16px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700 }}>SELECTED</div>}
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1rem" }}>Starter</h3>
              <div style={{ fontSize: 32, fontWeight: 800, margin: "18px 0", color: "#ffd945" }}>$19<span style={{ fontSize: 18, color: "#fff" }}>/mo</span></div>
              <ul style={{ color: "#bbb", textAlign: "left", margin: "0 auto 18px auto", maxWidth: 240, paddingLeft: 20, listStyle: "none" }}>
                {["5 Personas", "50 Content Ideas/mo", "10 Prompts Per Persona", "Advanced Analytics", "Email Support"].map(f => <li key={f} style={{ marginBottom: "10px" }}>✓ {f}</li>)}
              </ul>
              <button onClick={(e) => { e.stopPropagation(); handleUpgrade("price_1SdH1fPwyyuQCEbaZt4loxPH"); }} style={{ width: "100%", display: "block", background: selectedPlan === 1 ? "#ffd945" : "rgba(255,217,69,0.2)", color: selectedPlan === 1 ? "#000" : "#ffd945", fontWeight: 700, padding: "0.9rem 1.5rem", borderRadius: 8, border: selectedPlan === 1 ? "none" : "1px solid #ffd945", transition: "all 0.2s", textAlign: "center", boxSizing: "border-box", cursor: "pointer", fontSize: "1.08rem" }}>Get Started</button>
            </motion.div>

            {/* PRO */}
            <motion.div whileHover={{ scale: 1.03 }} onClick={() => setSelectedPlan(2)} style={{ minWidth: 260, maxWidth: 320, padding: "2.3rem 1.3rem", background: selectedPlan === 2 ? "linear-gradient(120deg,#1a1a28 85%,#2a2a45 100%)" : "linear-gradient(120deg,#191924b7 85%,#232845c7 100%)", borderRadius: "1.1rem", boxShadow: selectedPlan === 2 ? "0 8px 40px #ffd94555" : "0 3px 28px #0009", border: selectedPlan === 2 ? "2px solid #ffd945" : "2px solid transparent", cursor: "pointer", transition: "all 0.3s", position: "relative" }}>
              {selectedPlan === 2 && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#ffd945", color: "#000", padding: "4px 16px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700 }}>SELECTED</div>}
              <div style={{ position: "absolute", top: "16px", right: "16px", background: "#ffd945", color: "#000", padding: "4px 12px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700 }}>POPULAR</div>
              <h3 style={{ color: "#ffd945", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1rem" }}>Pro</h3>
              <div style={{ fontSize: 32, fontWeight: 800, margin: "18px 0", color: "#ffd945" }}>$49<span style={{ fontSize: 18, color: "#fff" }}>/mo</span></div>
              <ul style={{ color: "#bbb", textAlign: "left", margin: "0 auto 18px auto", maxWidth: 240, paddingLeft: 20, listStyle: "none" }}>
                {["Unlimited Personas", "Unlimited Content", "Unlimited Prompts", "Visual Analytics", "Priority Support"].map(f => <li key={f} style={{ marginBottom: "10px" }}>✓ {f}</li>)}
              </ul>
              <button onClick={(e) => { e.stopPropagation(); handleUpgrade("price_1SdH2yPwyyuQCEbacY3y1487"); }} style={{ width: "100%", display: "block", background: selectedPlan === 2 ? "#ffd945" : "rgba(255,217,69,0.2)", color: selectedPlan === 2 ? "#000" : "#ffd945", fontWeight: 700, padding: "0.9rem 1.5rem", borderRadius: 8, border: selectedPlan === 2 ? "none" : "1px solid #ffd945", transition: "all 0.2s", textAlign: "center", boxSizing: "border-box", cursor: "pointer", fontSize: "1.08rem" }}>Get Pro</button>
            </motion.div>
          </div>

          <p style={{ color: "#bbb", fontSize: "0.9rem", marginTop: "1.5rem" }}>
            💳 No credit card required to start · 🔄 Cancel anytime · 🔒 Secure payments via Stripe
          </p>
        </section>

        {/* ============ SOCIAL PROOF ============ */}
        <section style={{ maxWidth: 1000, margin: "5rem auto 0 auto", padding: "2.3rem 1.5rem", borderRadius: "1.3rem", background: "linear-gradient(138deg,#181824 90%,#232835 100%)", boxShadow: "0 3px 30px #0007", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h3 style={{ color: "#ffd945", fontSize: "1.45rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>What Our Customers Say</h3>
          <p style={{ color: "#666", fontSize: "0.88rem", marginBottom: "2rem" }}>Real results from real marketers</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
            {[
              { img: "/review1.png", name: "Elena S.", role: "SaaS Marketing Director", stars: "★ ★ ★ ★", quote: "I saw exactly what my prospects ask LLM tools and instantly turned it into content that brought in leads. No more guesswork." },
              { img: "/review2.png", name: "Mason L.", role: "Head of Content Strategy", stars: "★ ★ ★ ★ ★", quote: "Finally, a tool that reveals what my buyer persona is curious about. I wrote content that users needed and engagement soared." },
              { img: "/review3.png", name: "Priya K.", role: "B2B Content Lead", stars: "★ ★ ★ ★ ★", quote: "We already had writers — sAInthetic just tells them exactly what to write. Organic traffic tripled in two months. Worth every penny." },
            ].map((r) => (
              <div key={r.name} style={{ flex: "1 1 250px", maxWidth: 300, minWidth: 240, background: "rgba(23,22,29,0.97)", borderRadius: "1.1rem", boxShadow: "0 2px 10px #0002", padding: "1.7rem 1.2rem 1.3rem 1.2rem", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", marginRight: 14, background: "#ffd94533", overflow: "hidden", flexShrink: 0 }}>
                    <img src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ color: "#ffd945", fontWeight: 700, fontSize: ".98rem" }}>{r.name}</div>
                    <div style={{ color: "#bbb", fontSize: ".88rem", fontWeight: 600 }}>{r.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: "1.1rem", color: "#ffd945", marginBottom: 6 }}>{r.stars}</div>
                <div style={{ fontWeight: 600, color: "#fff", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.55 }}>"{r.quote}"</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ CASE STUDY ============ */}
        <section id="case-study" style={{ margin: "8rem auto 0 auto", maxWidth: 1000, position: "relative", zIndex: 2, padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg,#ffd945 0%,#ffed4e 100%)", color: "#000", padding: "6px 20px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 800, letterSpacing: "1px", marginBottom: 20, textTransform: "uppercase" }}>Case Study</div>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: "0.8rem", letterSpacing: "-1px", lineHeight: 1.15 }}>
              How a SaaS Team Tripled Organic Traffic{" "}              <span style={{ background: "linear-gradient(96deg,#ffd945,#ff9f43)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in 60 Days</span>
            </h2>
            <p style={{ color: "#bbb", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto" }}>A real workflow from persona creation to published content that converts</p>
          </div>

          <div style={{ background: "linear-gradient(135deg,#13131f 0%,#1e1e30 100%)", borderRadius: 24, border: "1px solid rgba(255,217,69,0.2)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", overflow: "hidden" }}>
            {/* Company bar */}
            <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16, background: "rgba(255,217,69,0.04)" }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#ffd945,#ff9f43)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🚀</div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>NexusFlow — B2B SaaS Platform</div>
                <div style={{ color: "#888", fontSize: "0.82rem", marginTop: 2 }}>Team size: 12 · Industry: SaaS · Use case: Organic content growth</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ label: "Time to results", value: "60 days" }, { label: "Plan used", value: "Pro" }].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,217,69,0.1)", border: "1px solid rgba(255,217,69,0.25)", borderRadius: 10, padding: "6px 14px", textAlign: "center" }}>
                    <div style={{ color: "#ffd945", fontWeight: 800, fontSize: "0.9rem" }}>{s.value}</div>
                    <div style={{ color: "#888", fontSize: "0.7rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="cs-metrics">
              {[
                { metric: "3×", label: "Organic traffic", sublabel: "vs prior 60 days", color: "#4ade80" },
                { metric: "68%", label: "Lower bounce rate", sublabel: "content-to-fit", color: "#60a5fa" },
                { metric: "41%", label: "More trial signups", sublabel: "from blog content", color: "#ffd945" },
                { metric: "5h", label: "Saved per week", sublabel: "on content research", color: "#f472b6" },
              ].map((item, i) => (
                <div key={i} className="cs-metric-cell" style={{ padding: "1.4rem 1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: 4, letterSpacing: "-1px" }}>{item.metric}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{item.label}</div>
                  <div style={{ color: "#666", fontSize: "0.75rem", marginTop: 2 }}>{item.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Story + steps */}
            <div className="cs-body">
              <div className="cs-challenge">
                <h4 style={{ color: "#ffd945", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12, marginTop: 0 }}>The Challenge</h4>
                <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 20, marginTop: 0 }}>NexusFlow's content team was publishing 8 blog posts per month but seeing minimal organic traction. Posts felt generic — they weren't answering what real buyers actually searched for. Prompts were rewritten from scratch every time.</p>
                <div style={{ borderLeft: "3px solid #ffd945", paddingLeft: 16 }}>
                  <p style={{ color: "#fff", fontStyle: "italic", fontSize: "0.97rem", lineHeight: 1.6, margin: "0 0 8px 0", fontWeight: 600 }}>"Within a week of using sAInthetic we had a library of 40+ prompts that actually matched what our ICP asks AI tools."</p>
                  <div style={{ color: "#ffd945", fontWeight: 700, fontSize: "0.83rem" }}>— Jamie R., Head of Growth, NexusFlow</div>
                </div>
              </div>
              <div className="cs-steps">
                <h4 style={{ color: "#ffd945", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16, marginTop: 0 }}>Their Workflow with sAInthetic</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { step: "01", title: "Built 4 personas for their ICP", desc: "Generated detailed SaaS buyer personas in under 2 minutes" },
                    { step: "02", title: "Extracted synthetic search queries", desc: "Uncovered 40+ questions their buyers ask LLMs every week" },
                    { step: "03", title: "Created a reusable prompt library", desc: "Every writer used the same on-brand prompts — no guesswork" },
                    { step: "04", title: "Published persona-matched content", desc: "Content aligned to real intent — Google rewarded them fast" },
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
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.97rem" }}>Want results like NexusFlow?</div>
                <div style={{ color: "#888", fontSize: "0.85rem", marginTop: 3 }}>Start building your persona library today — free, no card needed</div>
              </div>
              <a href="/register" style={{ background: "linear-gradient(135deg,#ffd945,#ff9f43)", color: "#000", fontWeight: 800, padding: "0.85rem 1.8rem", borderRadius: 12, textDecoration: "none", fontSize: "0.92rem", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(255,217,69,0.3)" }}>Start Free Trial →</a>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" style={{ margin: "8rem auto 0 auto", maxWidth: 1000, textAlign: "left", position: "relative", zIndex: 2, padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ color: "#ffd945", fontWeight: 900, fontSize: "2.3rem", marginBottom: "0.8rem", letterSpacing: "-1px" }}>Frequently Asked Questions</h2>
            <p style={{ color: "#bbb", fontSize: "1.15rem", maxWidth: 600, margin: "0 auto" }}>Everything you need to know about persona-driven AI content generation</p>
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            {faqItems.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: index * 0.05 }} style={{ background: "linear-gradient(135deg,rgba(24,24,36,0.7) 0%,rgba(35,35,50,0.9) 100%)", borderRadius: "1.2rem", marginBottom: "1.2rem", border: "1px solid rgba(255,217,69,0.15)", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} style={{ width: "100%", padding: "1.6rem 2rem", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                  <span>{item.question}</span>
                  <motion.span animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: "1.2rem", color: "#ffd945", flexShrink: 0, marginLeft: 12 }}>▼</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ padding: "0 2rem 1.6rem 2rem", overflow: "hidden" }}>
                      <p style={{ color: "#ccc", fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section style={{ padding: "6rem 20px 3rem 20px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, margin: "0 0 20px 0", letterSpacing: "-1px", color: "#fff" }}>
              Start publishing content your buyers actually search for.
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#bbb", margin: "0 0 36px 0", lineHeight: 1.6 }}>
              Join {userCount.toLocaleString()}+ marketers creating better content in less time.<br />Start free — no credit card required.
            </p>
            <a
              href="/register"
              style={{ background: "linear-gradient(135deg,#ffd945,#ff9f43)", border: "none", color: "#000", padding: "1.2rem 3rem", borderRadius: "12px", fontSize: "1.15rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 40px rgba(255,217,69,0.35)", display: "inline-block", textDecoration: "none" }}
            >
              Get your free persona now →
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
      </div>
    </div>
  );
}
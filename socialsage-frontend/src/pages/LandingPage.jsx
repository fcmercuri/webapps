import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';

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
    }
  ];

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw", margin: 0, padding: 0, background: "#0B0B0B", display: "flex", flexDirection: "column" }}>
      <NavigationBar />

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
            sAInthetic generates AI buyer personas and reveals the exact questions your customers ask LLMs — so your content ranks, converts, and never feels generic again.
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
            </div>
          </motion.div>
        </header>

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
                <p style={{ color: "#ccc", marginBottom: isExpanded ? 20 : 0, fontWeight: 500, textAlign: "center" }}>{card.desc}</p>
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

        {/* ============ PRICING ============ */}
        <section id="pricing" style={{ margin: "5rem auto 0 auto", maxWidth: 1100, textAlign: "center", position: "relative", zIndex: 2, padding: "0 20px" }}>
          <h2 style={{ color: "#ffd945", fontWeight: 900, fontSize: "2.1rem", marginBottom: "0.9rem", letterSpacing: "-1px" }}>Simple, Fair Pricing</h2>
          <p style={{ color: "#bbb", marginBottom: "5.2rem", fontSize: "1.15rem" }}>Start for free. Every plan has access to the AI Persona Builder, Synthetic Prompts, Topic Generation</p>

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
        <section style={{ maxWidth: 900, margin: "5rem auto 0 auto", padding: "2.3rem 1.5rem", borderRadius: "1.3rem", background: "linear-gradient(138deg,#181824 90%,#232835 100%)", boxShadow: "0 3px 30px #0007", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h3 style={{ color: "#ffd945", fontSize: "1.45rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>What Our Customers Say</h3>
          <p style={{ color: "#666", fontSize: "0.88rem", marginBottom: "2rem" }}>Real results from real marketers</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
            {[
              { img: "/review1.png", name: "Elena S.", role: "SaaS Marketing Director", stars: "★ ★ ★ ★", quote: "I saw exactly what my prospects ask LLM tools and instantly turned it into content that brought in leads. No more guesswork." },
              { img: "/review2.png", name: "Mason L.", role: "Head of Content Strategy", stars: "★ ★ ★ ★ ★", quote: "Finally, a tool that reveals what my buyer persona is curious about. I wrote content that users needed and engagement soared." },
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
              How a SaaS Team Tripled Organic Traffic{" "}
              <span style={{ background: "linear-gradient(96deg,#ffd945,#ff9f43)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in 60 Days</span>
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
              Ready to know exactly what your buyers want?
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#bbb", margin: "0 0 36px 0", lineHeight: 1.6 }}>
              Join {userCount.toLocaleString()}+ marketers creating better content in less time.<br />Start free — no credit card required.
            </p>
            <a
              href="/register"
              style={{ background: "linear-gradient(135deg,#ffd945,#ff9f43)", border: "none", color: "#000", padding: "1.2rem 3rem", borderRadius: "12px", fontSize: "1.15rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 40px rgba(255,217,69,0.35)", display: "inline-block", textDecoration: "none" }}
            >
              See your first buyer persona in 60 seconds →
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

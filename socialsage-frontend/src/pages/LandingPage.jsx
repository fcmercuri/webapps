import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate(); // Hook inside component!
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Move handleUpgrade inside the component
  async function handleUpgrade(priceId) {
    if (!user?.email) {
      localStorage.setItem('upgradePriceId', priceId);
      navigate('/register');
      return;
    }
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        customerEmail: user.email,
      }),
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
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem("us_cookie_consent_dismissed", "true");
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={bannerStyle}>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: "0.62rem",      // smaller text
          lineHeight: 1.5,
        }}
      >
        <span>
          We use cookies to improve your experience. By using this site you consent to our use of cookies.
        </span>
        <div>
          <button onClick={dismiss} style={buttonStyle}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

const bannerStyle = { /* existing styles */ };
const buttonStyle = { /* existing styles */ };



const cards = [
  {
    title: "AI Persona Builder",
    desc: "Create customer avatars, generate AI bios, and unlock segments with a click",
    expandedContent: [
      "✓ Generate 5 detailed customer personas per industry instantly",
      "✓ AI-powered demographics, psychographics, goals, and pain points",
      "✓ Premium personas with advanced behavioral insights",
      "✓ Export personas to CSV or integrate with your CRM",
      "✓ Customizable persona templates for any niche"
    ]
  },
  {
    title: "Topic Trends Generator",
    desc: "Get trending content ideas based on synthetic queries and prompts",
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
      "✓ Generate 1.000-1500 word conversion-ready copy in seconds",
      "✓ SEO-optimized blog posts, social captions, and email sequences",
      "✓ Content personalized to each persona's needs",
      "✓ One-click regeneration with different angles",
      "✓ Save, edit, and export to your favorite tools"
    ]
  }
];

  

  // Use this handler on your Pro (and other paid) buttons
  async function handleUpgrade(priceId) {
    if (!user.email) {
      localStorage.setItem("upgradePriceId", priceId);
      navigate("/register");
      return;
    }
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        customerEmail: user.email,
      }),
    });
    const { url } = await res.json();
    window.location = url;
  }

  

  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(1); // Track selected plan (0=Free, 1=Starter, 2=Pro)
  
  // Refs for "How It Works" section
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  

  const step1InView = useInView(step1Ref, { once: false, margin: "-100px" });
  const step2InView = useInView(step2Ref, { once: false, margin: "-100px" });
  const step3InView = useInView(step3Ref, { once: false, margin: "-100px" });
  const step4InView = useInView(step4Ref, { once: false, margin: "-100px" });

  return (
    <div
       style={{
        minHeight: "100vh",
        minWidth: "100vw",
        margin: 0,
        padding: 0,
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column"
      }}
      >
      <NavigationBar />
      
      <div
  style={{
    flex: 1,
    background: "linear-gradient(135deg, #0b0b0b 84%, #261e45 100%)",
    overflow: "hidden"
  }}
  onMouseMove={(e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty("--mouse-x", `${x}px`);
    document.documentElement.style.setProperty("--mouse-y", `${y}px`);
  }}
>


        {/* BG Effects */}
        <div style={{position:"fixed", top:-145, left:-100, width:520, height:320, background:"radial-gradient(ellipse at 40% 60%, #ffd94533 0%, transparent 73%)", zIndex:0, filter:"blur(76px)"}}/>
        <div style={{position:"fixed", bottom:-180, right:-130, width:530, height:350, background:"radial-gradient(circle at 60% 18%, #7b7bad33 0%, transparent 77%)", zIndex:0, filter:"blur(99px)"}}/>

        {/* HERO + UVP */}  


        <header
        
  id="hero"
  className="hero-grid"
  style={{
    width: "100%",
    margin: "0 auto",
    padding: "68px 20px 32px 20px",
    position: "relative",
    zIndex: 3,
    boxSizing: "border-box",
  }}
>
  {/* Left: main copy */}
  <div style={{ textAlign: "center" }}>
  <motion.h1
    initial={{ opacity: 0, y: 35 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.85, delay: 0.15 }}
    style={{
      fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
      fontWeight: 900,
      letterSpacing: "-1.2px",
      lineHeight: 1.12,
      background: "linear-gradient(96deg, #fff 60%, #ffd945 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: "0 0 0.6rem 0",
    }}
  >
    The First Mobile App That Instantly Generates AI Personas
  </motion.h1>

  <motion.h2
    initial={{ opacity: 0, y: 35 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.33 }}
    style={{
      fontWeight: 700,
      fontSize: "clamp(1rem, 2.6vw, 1.5rem)",
      color: "#bbb",
      margin: "0 0 24px 0",
    }}
  >
    Understand your audience’s needs and pain points: turn insights into plug-and-play LLM prompts and high-converting content
  </motion.h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    }}
  >
    <motion.a
      href="/register"
      className="cta"
      whileHover={{ scale: 1.07, backgroundColor: "#ffe267" }}
      style={{
        background: "#ffd945",
        color: "#19191a",
        fontWeight: 800,
        fontSize: "1.06rem",
        padding: "1rem 2.4rem",
        borderRadius: 13,
        boxShadow: "0 6px 28px #ffd94540",
        display: "inline-block",
        transition: "box-shadow .2s, background .2s",
        textDecoration: "none",
      }}
    >
      Try sAInthetic Free
    </motion.a>

    <p
      style={{
        margin: 0,
        fontSize: "0.9rem",
        color: "#888",
        fontWeight: 500,
        textAlign: "center",
      }}
    >
      No credit card required
    </p>
  </div>
</div>



  {/* Right: AI persona banner */}
  <section
  style={{
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    padding: "0 16px 24px 16px",
    boxSizing: "border-box",
  }}
>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.25 }}
    style={{
      background:
        "radial-gradient(circle at 0% 0%, #ffd94522, transparent 60%), #14141f",
      borderRadius: 20,
      padding: "1.6rem 1.4rem",
      boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
      border: "1px solid rgba(255, 217, 69, 0.3)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 4,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 30% 20%, #ffd945, #ffb347 45%, #23243a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 3px rgba(255, 217, 69, 0.25)",
        }}
      >
        <span style={{ fontSize: 26 }}>🧠</span>
      </div>
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: "0.98rem",
            color: "#fff",
          }}
        >
          Sofia, SaaS Marketing Lead
        </div>
        <div
          style={{
            fontSize: "0.86rem",
            color: "#ffd945",
            fontWeight: 600,
          }}
        >
          AI‑generated ideal customer persona
        </div>
      </div>
    </div>

    <div
      style={{
        fontSize: "0.9rem",
        color: "#ccc",
        lineHeight: 1.55,
        marginBottom: 6,
      }}
    >
      <strong style={{ color: "#fff" }}>Goals:</strong> Launch a content engine
      that drives trial sign‑ups and upgrades without increasing ad spend
    </div>

    <div
      style={{
        fontSize: "0.9rem",
        color: "#ccc",
        lineHeight: 1.55,
      }}
    >
      <strong style={{ color: "#fff" }}>Pain points:</strong> Unclear
      messaging, low engagement on social posts, and guesswork about what
      prospects ask LLMs
    </div>

    <div
      style={{
        marginTop: 10,
        padding: "0.65rem 0.9rem",
        borderRadius: 12,
        background: "rgba(12, 180, 120, 0.14)",
        border: "1px solid rgba(12, 180, 120, 0.4)",
        fontSize: "0.86rem",
        color: "#a5ffcf",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span>✨</span>
      <span>
        “Show me 5 content ideas that answer Sofia&apos;s top synthetic questions this
        week”
      </span>
    </div>
  </motion.div>
</section>

</header>



        {/* INTERACTIVE CARDS */}
        <main 
        id="features"  
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.6rem",
          margin: "1.1rem auto 0 auto ",
          maxWidth: 1200,
          zIndex: 2,
          position: "relative"
        }}>
          {cards.map((card, i) => {
            const isExpanded = expanded === i;
            
            return (
              <motion.div
                key={card.title}
                className="feature-card"
                initial="rest"
                animate={hovered === i && !isExpanded ? "hover" : "rest"}
                variants={{
                  rest: { scale: 1, boxShadow: "0 6px 36px #0004" },
                  hover: {
                    scale: 1.05,
                    boxShadow: "0 18px 58px #ffd94544, 0 10px 40px #0008",
                    transition: { type: "spring", stiffness: 230, damping: 18 }
                  }
                }}
                onHoverStart={() => !isExpanded && setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  background: isExpanded 
                    ? "linear-gradient(120deg, #1a1a28 85%, #2a2a45 100%)" 
                    : "linear-gradient(120deg, #191924b7 85%, #232845c7 100%)",
                  minWidth: 300,
                  maxWidth: isExpanded ? 700 : 340,
                  flex: isExpanded ? "1 1 700px" : "1 1 260px",
                  borderRadius: "1.3rem",
                  padding: "2.4rem 1.6rem 1.8rem 1.6rem",
                  color: "#fff",
                  position: "relative",
                  boxShadow: isExpanded 
                    ? "0 20px 80px #ffd94555, 0 10px 40px #0008" 
                    : "0 3px 28px #0009",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",   // <<< add this
                  textAlign: "center",        // <<< add this
                  border: isExpanded ? "2px solid #ffd94544" : "none",
                  zIndex: isExpanded ? 10 : 2
                }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                whileTap={{ scale: 0.98 }}
                layout
              >
              

                {/* Title */}
                <h3 style={{ 
                  fontWeight: 800, 
                  marginBottom: 11, 
                  fontSize: "1.22rem", 
                  letterSpacing: "-0.5px",
                  color: isExpanded ? "#ffd945" : "#fff",
                  transition: "color 0.3s"
                }}>
                  {card.title}
                </h3>

                {/* Short Description */}
                <p style={{ 
                  color: "#ccc", 
                  marginBottom: isExpanded ? 20 : 0, 
                  fontWeight: 500, 
                  textAlign: "center" 
                }}>
                  {card.desc}
                </p>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: "100%",
                        overflow: "hidden"
                      }}
                    >
                      <div style={{
                        borderTop: "1px solid rgba(255, 217, 69, 0.2)",
                        paddingTop: "1.5rem",
                        marginTop: "1rem"
                      }}>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          textAlign: "left"
                        }}>
                          {card.expandedContent.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              style={{
                                padding: "0.8rem 0",
                                fontSize: "0.95rem",
                                color: "#e0e0e0",
                                fontWeight: 500,
                                borderBottom: idx < card.expandedContent.length - 1 
                                  ? "1px solid rgba(255, 255, 255, 0.05)" 
                                  : "none"
                              }}
                            >
                              {item}
                            </motion.li>
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

        {/* ============================================ */}
        {/* HOW IT WORKS SECTION - ANIMATED WITH SCREENSHOTS */}
        {/* ============================================ */}
        {/* ============================================ */}
{/* HOW IT WORKS SECTION - ANIMATED WITH SCREENSHOTS */}
{/* ============================================ */}

<section
  id="how-it-works"
  style={{
    margin: "7rem auto 0 auto",
    maxWidth: 1200,
    textAlign: "center",
    padding: "0 20px",
    position: "relative",
    zIndex: 2,
  }}
>
  <h2
    style={{
      color: "#ffd945",
      fontWeight: 900,
      fontSize: "2.1rem",
      marginBottom: "0.9rem",
      letterSpacing: "-1px",
    }}
  >
    AI-Powered Content That Converts
  </h2>
  <p
    style={{
      color: "#bbb",
      marginBottom: "5.2rem",
      fontSize: "1.15rem",
    }}
  >
    Generate customer personas, content ideas, and conversion-ready copy in minutes – not hours
  </p>

  <div
  ref={step1Ref}
  data-step="1"
  className="how-step-wrapper"
>
  {/* Image first (left on desktop, below text on mobile via CSS order) */}
  <motion.div
    className="step-image"
    initial={{ opacity: 0, x: -50 }}
    animate={step1InView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8 }}
    style={{
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(255, 217, 69, 0.2)",
      border: "2px solid rgba(255, 217, 69, 0.3)",
    }}
  >
    <img
      src="step-1-industry.jpg"
      alt="Select Industry"
      style={{ width: "100%", display: "block" }}
    />
  </motion.div>

  {/* Text second (right on desktop, above image on mobile via order) */}
  <motion.div
    className="step-text"
    initial={{ opacity: 0, x: 50 }}
    animate={step1InView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <div
      style={{
        background: "linear-gradient(135deg, #ffd945 0%, #ffed4e 100%)",
        color: "#000",
        padding: "8px 20px",
        borderRadius: 20,
        fontSize: "0.875rem",
        fontWeight: 700,
        display: "inline-block",
        marginBottom: 20,
      }}
    >
      STEP 1
    </div>
    <h3
      style={{
        fontSize: "2.2rem",
        fontWeight: 800,
        margin: "0 0 20px 0",
        letterSpacing: "-1px",
        color: "#fff",
      }}
    >
      Choose Your Industry
    </h3>
    <p
      style={{
        fontSize: "1.15rem",
        color: "#bbb",
        lineHeight: 1.7,
        margin: 0,
      }}
    >
      Select from 5+ industries: from SaaS to E-commerce, Healthcare to Fitness. Our AI tailors
      everything to your specific market
    </p>
  </motion.div>
</div>

  {/* STEP 2 */}
  <div
  ref={step2Ref}
  data-step="2"
  className="how-step-wrapper"
>
    <motion.div
      className="step-image"
      initial={{ opacity: 0, x: -50 }}
      animate={step2InView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(255, 217, 69, 0.2)",
        border: "2px solid rgba(255, 217, 69, 0.3)",
      }}
    >
      <img
        src="step-2-personas.jpg"
        alt="AI Persona"
        style={{ width: "100%", display: "block" }}
      />
    </motion.div>

    <motion.div
      className="step-text"
      initial={{ opacity: 0, x: 50 }}
      animate={step2InView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ffd945 0%, #ffed4e 100%)",
          color: "#000",
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: "0.875rem",
          fontWeight: 700,
          display: "inline-block",
          marginBottom: 20,
        }}
      >
        STEP 2
      </div>
      <h3
        style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          margin: "0 0 20px 0",
          letterSpacing: "-1px",
          color: "#fff",
        }}
      >
        Meet Your Customers
      </h3>
      <p
        style={{
          fontSize: "1.15rem",
          color: "#bbb",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        sAInthetic instantly generates 1 (Free Plan) detailed customer persona with goals, pain points, and
        behaviors: like having a marketing team in your pocket
      </p>
    </motion.div>
  </div>

  
  {/* STEP 3 */}
<div
  ref={step3Ref}
  data-step="3"
  className="how-step-wrapper"
>
  {/* Image first */}
  <motion.div
    className="step-image"
    initial={{ opacity: 0, x: -50 }}
    animate={step3InView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8 }}
    style={{
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(255, 217, 69, 0.2)",
      border: "2px solid rgba(255, 217, 69, 0.3)",
    }}
  >
    <img
      src="step-3-prompts.jpg"
      alt="Content Ideas"
      style={{ width: "100%", display: "block" }}
    />
  </motion.div>

  {/* Text second */}
  <motion.div
    className="step-text"
    initial={{ opacity: 0, x: 50 }}
    animate={step3InView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <div
      style={{
        background: "linear-gradient(135deg, #ffd945 0%, #ffed4e 100%)",
        color: "#000",
        padding: "8px 20px",
        borderRadius: 20,
        fontSize: "0.875rem",
        fontWeight: 700,
        display: "inline-block",
        marginBottom: 20,
      }}
    >
      STEP 3
    </div>
    <h3
      style={{
        fontSize: "2.2rem",
        fontWeight: 800,
        margin: "0 0 20px 0",
        letterSpacing: "-1px",
        color: "#fff",
      }}
    >
      Content Ideas That Convert
    </h3>
    <p
      style={{
        fontSize: "1.15rem",
        color: "#bbb",
        lineHeight: 1.7,
        margin: 0,
      }}
    >
      Get 5 targeted content prompts for each persona: SEO articles, social posts, email
      campaigns, and more. No more writer&apos;s block
    </p>
  </motion.div>
</div>

  {/* STEP 4 */}
  <div
  ref={step4Ref}
  data-step="4"
  className="how-step-wrapper"
>
    <motion.div
      className="step-image"
      initial={{ opacity: 0, x: -50 }}
      animate={step4InView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(255, 217, 69, 0.2)",
        border: "2px solid rgba(255, 217, 69, 0.3)",
      }}
    >
      <img
        src="step-4-content.jpg"
        alt="Generated Content"
        style={{ width: "100%", display: "block" }}
      />
    </motion.div>

    <motion.div
      className="step-text"
      initial={{ opacity: 0, x: 50 }}
      animate={step4InView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ffd945 0%, #ffed4e 100%)",
          color: "#000",
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: "0.875rem",
          fontWeight: 700,
          display: "inline-block",
          marginBottom: 20,
        }}
      >
        STEP 4
      </div>
      <h3
        style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          margin: "0 0 20px 0",
          letterSpacing: "-1px",
          color: "#fff",
        }}
      >
        Professional Copy, Instantly
      </h3>
      <p
        style={{
          fontSize: "1.15rem",
          color: "#bbb",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        One click generates 1.000–1.500 words of conversion-ready copy that speaks directly to your
        customers&apos; needs. Edit, save, and ship
      </p>
    </motion.div>
  </div>
</section>

  

        {/* ============================================ */}
        {/* END HOW IT WORKS SECTION */}
        {/* ============================================ */}

        {/* PRICING SECTION */}
       {/* PRICING SECTION */}
<section
  id="pricing"
  style={{
    margin: "5rem auto 0 auto",
    maxWidth: 1100,
    textAlign: "center",
    position: "relative",
    zIndex: 2,
    padding: "0 20px"
  }}
>
  <h2
    style={{
      color: "#ffd945",
      fontWeight: 900,
      fontSize: "2.1rem",
      marginBottom: "0.9rem",
      letterSpacing: "-1px"
    }}
  >
    Simple, Fair Pricing
  </h2>
  <p style={{ color: "#bbb", marginBottom: "5.2rem", fontSize: "1.15rem" }}>
    Start for free. Every plan has access to the AI Persona Builder, Synthetic Prompts, Topic Generation
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "2rem",
      marginBottom: "3rem"
    }}
  >
    {/* FREE PLAN */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => setSelectedPlan(0)}
      style={{
        minWidth: 260,
        maxWidth: 320,
        padding: "2.3rem 1.3rem",
        background:
          selectedPlan === 0
            ? "linear-gradient(120deg, #1a1a28 85%, #2a2a45 100%)"
            : "linear-gradient(120deg, #191924b7 85%, #232845c7 100%)",
        borderRadius: "1.1rem",
        boxShadow:
          selectedPlan === 0 ? "0 8px 40px #ffd94555" : "0 3px 28px #0009",
        border: selectedPlan === 0 ? "2px solid #ffd945" : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.3s",
        position: "relative"
      }}
    >
      {selectedPlan === 0 && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffd945",
            color: "#000",
            padding: "4px 16px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 700
          }}
        >
          SELECTED
        </div>
      )}
      <h3
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: "1.4rem",
          marginBottom: "1rem"
        }}
      >
        Free
      </h3>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          margin: "18px 0",
          color: "#ffd945"
        }}
      >
        $0<span style={{ fontSize: 18, color: "#fff" }}>/mo</span>
      </div>
      <ul
        style={{
          color: "#bbb",
          textAlign: "left",
          margin: "0 auto 18px auto",
          maxWidth: 240,
          paddingLeft: 20,
          listStyle: "none"
        }}
      >
        <li style={{ marginBottom: "10px" }}>✓ 1 Persona</li>
        <li style={{ marginBottom: "10px" }}>✓ 1 Content Idea</li>
        <li style={{ marginBottom: "10px" }}>✓ Basic Analytics</li>
        <li style={{ marginBottom: "10px" }}>✓ Community Support</li>
      </ul>
      <a
        href="/register"
        style={{
          width: "calc(100% - 0px)",
          display: "block",
          background: selectedPlan === 0 ? "#ffd945" : "rgba(255, 217, 69, 0.2)",
          color: selectedPlan === 0 ? "#000" : "#ffd945",
          fontWeight: 700,
          padding: "0.9rem 1.5rem",
          borderRadius: 8,
          textDecoration: "none",
          border: selectedPlan === 0 ? "none" : "1px solid #ffd945",
          transition: "all 0.2s",
          textAlign: "center",
          boxSizing: "border-box"
        }}
      >
        Get Started
      </a>
    </motion.div>

    {/* STARTER PLAN */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => setSelectedPlan(1)}
      style={{
        minWidth: 260,
        maxWidth: 320,
        padding: "2.3rem 1.3rem",
        background:
          selectedPlan === 1
            ? "linear-gradient(120deg, #1a1a28 85%, #2a2a45 100%)"
            : "linear-gradient(120deg, #191924b7 85%, #232845c7 100%)",
        borderRadius: "1.1rem",
        boxShadow:
          selectedPlan === 1 ? "0 8px 40px #ffd94555" : "0 3px 28px #0009",
        border: selectedPlan === 1
          ? "2px solid #ffd945"
          : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.3s",
        position: "relative"
      }}
    >
      {selectedPlan === 1 && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffd945",
            color: "#000",
            padding: "4px 16px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 700
          }}
        >
          SELECTED
        </div>
      )}
      <h3
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: "1.4rem",
          marginBottom: "1rem"
        }}
      >
        Starter
      </h3>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          margin: "18px 0",
          color: "#ffd945"
        }}
      >
        $19<span style={{ fontSize: 18, color: "#fff" }}>/mo</span>
      </div>
      <ul
        style={{
          color: "#bbb",
          textAlign: "left",
          margin: "0 auto 18px auto",
          maxWidth: 240,
          paddingLeft: 20,
          listStyle: "none"
        }}
      >
        <li style={{ marginBottom: "10px" }}>✓ 5 Personas</li>
        <li style={{ marginBottom: "10px" }}>✓ 50 Content Ideas/mo</li>
        <li style={{ marginBottom: "10px" }}>✓ Advanced Analytics</li>
        <li style={{ marginBottom: "10px" }}>✓ Email Support</li>
      </ul>
      <motion.div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUpgrade("price_1SdH1fPwyyuQCEbaZt4loxPH"); // Replace with real Stripe Price ID
          }}
          style={{
            width: "calc(100% - 0px)",
            display: "block",
            background:
              selectedPlan === 1
                ? "#ffd945"
                : "rgba(255, 217, 69, 0.2)",
            color: selectedPlan === 1 ? "#000" : "#ffd945",
            fontWeight: 700,
            padding: "0.9rem 1.5rem",
            borderRadius: 8,
            textDecoration: "none",
            border: selectedPlan === 1 ? "none" : "1px solid #ffd945",
            transition: "all 0.2s",
            textAlign: "center",
            boxSizing: "border-box",
            cursor: "pointer",
            fontSize: "1.08rem"
          }}
        >
          Get Started
        </button>
      </motion.div>
    </motion.div>

    {/* PRO PLAN */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => setSelectedPlan(2)}
      style={{
        minWidth: 260,
        maxWidth: 320,
        padding: "2.3rem 1.3rem",
        background:
          selectedPlan === 2
            ? "linear-gradient(120deg, #1a1a28 85%, #2a2a45 100%)"
            : "linear-gradient(120deg, #191924b7 85%, #232845c7 100%)",
        borderRadius: "1.1rem",
        boxShadow:
          selectedPlan === 2 ? "0 8px 40px #ffd94555" : "0 3px 28px #0009",
        border: selectedPlan === 2
          ? "2px solid #ffd945"
          : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.3s",
        position: "relative"
      }}
    >
      {selectedPlan === 2 && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffd945",
            color: "#000",
            padding: "4px 16px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 700
          }}
        >
          SELECTED
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "#ffd945",
          color: "#000",
          padding: "4px 12px",
          borderRadius: "6px",
          fontSize: "0.7rem",
          fontWeight: 700
        }}
      >
        POPULAR
      </div>
      <h3
        style={{
          color: "#ffd945",
          fontWeight: 800,
          fontSize: "1.4rem",
          marginBottom: "1rem"
        }}
      >
        Pro
      </h3>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          margin: "18px 0",
          color: "#ffd945"
        }}
      >
        $49<span style={{ fontSize: 18, color: "#fff" }}>/mo</span>
      </div>
      <ul
        style={{
          color: "#bbb",
          textAlign: "left",
          margin: "0 auto 18px auto",
          maxWidth: 240,
          paddingLeft: 20,
          listStyle: "none"
        }}
      >
        <li style={{ marginBottom: "10px" }}>✓ Unlimited Personas</li>
        <li style={{ marginBottom: "10px" }}>✓ Unlimited Content</li>
        <li style={{ marginBottom: "10px" }}>✓ Priority Support</li>
        <li style={{ marginBottom: "10px" }}>✓ API Access</li>
      </ul>
      <button
        onClick={(e) => {
          e.stopPropagation(); // so card click doesn't trigger
          handleUpgrade("price_1SdH2yPwyyuQCEbacY3y1487"); // Use real Stripe Price ID if needed
        }}
        style={{
          width: "calc(100% - 0px)",
          display: "block",
          background:
            selectedPlan === 2 ? "#ffd945" : "rgba(255, 217, 69, 0.2)",
          color: selectedPlan === 2 ? "#000" : "#ffd945",
          fontWeight: 700,
          padding: "0.9rem 1.5rem",
          borderRadius: 8,
          textDecoration: "none",
          border: selectedPlan === 2 ? "none" : "1px solid #ffd945",
          transition: "all 0.2s",
          textAlign: "center",
          boxSizing: "border-box",
          cursor: "pointer",
          fontSize: "1.08rem"
        }}
      >
        Get Pro
      </button>
    </motion.div>
  </div>

  <div
    style={{
      color: "#aaa",
      fontWeight: 500,
      fontSize: "1rem",
      marginTop: "2.5rem",
      maxWidth: 700,
      margin: "2.5rem auto 0 auto"
    }}
  >
    <p style={{ color: "#bbb", marginBottom: "2.2rem", fontSize: "1.15rem" }}>
      sAInthetic empowers you to build AI-powered personas, tap into real-time trends, and deliver content optimized for every major discovery channel
    </p>
  </div>
</section>



                {/* CUSTOMER REVIEWS */}
        <section
          style={{
            maxWidth: 900,
            margin: "5rem auto 0 auto",
            padding: "2.3rem 1rem 2.3rem 1rem",
            borderRadius: "1.3rem",
            background: "linear-gradient(138deg, #181824 90%, #232835 100%)",
            boxShadow: "0 3px 30px #0007",
            textAlign: "center",
            position: "relative",
            zIndex: 2
          }}
        >
          <h3 style={{
            color: "#ffd945",
            fontSize: "1.45rem",
            fontWeight: 800,
            marginBottom: "2.2rem",
            letterSpacing: "-0.5px"
          }}>What Our Customers Say</h3>
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem"
          }}>
            {/* Review 1 */}
            <div style={{
              flex: "1 1 250px",
              maxWidth: 300,
              minWidth: 240,
              background: "rgba(23,22,29,0.97)",
              borderRadius: "1.1rem",
              boxShadow: "0 2px 10px #0002",
              padding: "1.7rem 1.2rem 1.3rem 1.2rem",
              textAlign: "left",
              position: "relative"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
              <div
  style={{
    width: 48,
    height: 48,
    borderRadius: "50%",
    marginRight: 14,
    background: "#ffd94533",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }}
>
  <img
    src="/review1.png"   // put your real image path here
    alt="Customer avatar"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>
                <div>
                  <div style={{ color: "#ffd945", fontWeight: 700, fontSize: ".98rem" }}>
                    Elena S.
                  </div>
                  <div style={{ color: "#bbb", fontSize: ".97rem", fontWeight: 600 }}>
                    SaaS Marketing Director
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "1.3rem", color: "#ffd945", marginBottom: 3 }}>★ ★ ★ ★ ★</div>
              <div style={{
                fontWeight: 600,
                color: "#fff",
                fontSize: "1.12rem",
                fontStyle: "italic"
              }}>
                "I saw exactly what my prospects ask LLMs tools and instantly turned it into content that brought in leads. No more guesswork."
              </div>
            </div>

            {/* Review 2 */}
            <div style={{
              flex: "1 1 250px",
              maxWidth: 300,
              minWidth: 240,
              background: "rgba(23,22,29,0.97)",
              borderRadius: "1.1rem",
              boxShadow: "0 2px 10px #0002",
              padding: "1.7rem 1.2rem 1.3rem 1.2rem",
              textAlign: "left",
              position: "relative"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
              <div
  style={{
    width: 48,
    height: 48,
    borderRadius: "50%",
    marginRight: 14,
    background: "#ffd94533",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }}
>
  <img
    src="/review2.png"   // put your real image path here
    alt="Customer avatar"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>
                <div>
                  <div style={{ color: "#ffd945", fontWeight: 700, fontSize: ".98rem" }}>
                    Mason L.
                  </div>
                  <div style={{ color: "#bbb", fontSize: ".97rem", fontWeight: 600 }}>
                    Head of Content Strategy
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "1.3rem", color: "#ffd945", marginBottom: 3 }}>★ ★ ★ ★ ★</div>
              <div style={{
                fontWeight: 600,
                color: "#fff",
                fontSize: "1.12rem",
                fontStyle: "italic"
              }}>
                "Finally, a tool that actually reveals what my buyer persona is curious about. I wrote content that users needed and engagement soared."
              </div>
            </div>

            {/* Review 3 */}
            
          </div>
        </section>

        {/* ============================================ */}
        {/* FINAL CTA - TRY FREE TRIAL */}
        {/* ============================================ */}
        <section style={{
          padding: "3rem 20px",
          textAlign: "center",
          position: "relative",
          zIndex: 2
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              maxWidth: 700,
              margin: "0 auto"
            }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              margin: "0 0 24px 0",
              letterSpacing: "-1px",
              color: "#fff"
            }}>
              Ready to 10x Your Content Game?
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#bbb",
              margin: "0 0 40px 0",
              lineHeight: 1.6
            }}>
              Join hundreds of marketers creating better content in less time. Start your free trial today<br/>No credit card required
            </p>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, backgroundColor: "#ffe267" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "#ffd945",
                border: "none",
                color: "#000",
                padding: "1.2rem 3rem",
                borderRadius: "12px",
                fontSize: "1.2rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 10px 40px rgba(255, 217, 69, 0.3)",
                display: "inline-block",
                textDecoration: "none"
              }}
            >
              Start Free Trial →
            </motion.a>
          </motion.div>

          <footer style={{
  background: "rgba(11, 11, 11, 0)",   // fully transparent
  color: "#bbb",
  textAlign: "center",
  fontWeight: 500,
  padding: "1.1rem 0",
  borderTop: "1px solid #232323",
  marginTop: "3rem"
}}>
  © {new Date().getFullYear()} sAInthetic. All rights reserved
  <div style={{ fontSize: ".95rem", color: "#999", marginTop: 2 }}>
    Empowering AI-powered creators and brands
  </div>
  <USCookieConsent /> 
</footer>
        </section>
        {/* ============================================ */}
        {/* END FINAL CTA */}
        {/* ============================================ */}

      </div>
      
    </div>
  );
}

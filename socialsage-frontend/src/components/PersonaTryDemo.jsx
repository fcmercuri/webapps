import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const personas = {
  SaaS: {
    name: "Sarah Johnson",
    role: "Growth Marketing Manager",
    leadScore: 87,
    goals: ["Increase SQLs","Reduce CAC","Improve retention"],
    painPoints: ["Low lead quality","Generic AI content","Weak positioning"],
    questions: [
      "How do I improve demo conversions?",
      "What content ranks in AI search?",
      "How can I reduce CAC?"
    ],
    topPrompt: "Show me 5 content ideas that answer Sarah's top synthetic questions this week"
  },
  Finance: {
    name: "David Carter",
    role: "Digital Banking Lead",
    leadScore: 82,
    goals: ["Acquire deposits","Increase trust","Grow applications"],
    painPoints: ["Compliance","Long approval cycles","Low engagement"],
    questions: [
      "How do customers research loans?",
      "Which GEO content converts?",
      "What builds trust?"
    ],
    topPrompt: "Show me 5 content ideas that answer David's top synthetic questions this week"
  },
  Ecommerce: {
    name: "Emily Brown",
    role: "E-commerce Director",
    leadScore: 91,
    goals: ["Increase AOV","Boost repeat purchases","Reduce cart abandonment"],
    painPoints: ["Creative fatigue","High CAC","Low loyalty"],
    questions: [
      "Which offers increase AOV?",
      "How do I recover abandoned carts?",
      "What content drives repeat sales?"
    ],
    topPrompt: "Show me 5 content ideas that answer Emily's top synthetic questions this week"
  },
  Healthcare: {
    name: "Dr. Lisa Nguyen",
    role: "Patient Acquisition Manager",
    leadScore: 79,
    goals: ["Increase appointment bookings","Build patient trust","Expand service line awareness"],
    painPoints: ["Strict compliance rules","Low online visibility","High patient acquisition cost"],
    questions: [
      "How do patients search for providers?",
      "What content builds trust in healthcare?",
      "How do I stay compliant with marketing?"
    ],
    topPrompt: "Show me 5 content ideas that answer Lisa's top synthetic questions this week"
  },
  RealEstate: {
    name: "Marcus Reid",
    role: "Head of Growth, Real Estate Group",
    leadScore: 84,
    goals: ["Generate qualified buyer leads","Increase listing views","Shorten sales cycle"],
    painPoints: ["Seasonal demand swings","High cost per lead","Low agent follow-up rates"],
    questions: [
      "What content converts home buyers?",
      "How do I generate more listing leads?",
      "Which channels drive qualified traffic?"
    ],
    topPrompt: "Show me 5 content ideas that answer Marcus's top synthetic questions this week"
  },
  Education: {
    name: "Priya Shah",
    role: "Enrollment Marketing Director",
    leadScore: 76,
    goals: ["Increase enrollment applications","Improve program awareness","Boost student engagement"],
    painPoints: ["Long decision cycles","Low content differentiation","Difficulty reaching Gen Z"],
    questions: [
      "How do students research programs?",
      "What content increases applications?",
      "How do I reach prospective students online?"
    ],
    topPrompt: "Show me 5 content ideas that answer Priya's top synthetic questions this week"
  },
  Travel: {
    name: "Jonas Weber",
    role: "Head of Digital Marketing, Travel Brand",
    leadScore: 80,
    goals: ["Increase direct bookings","Reduce OTA dependency","Improve repeat travel rate"],
    painPoints: ["High seasonality","Price-driven comparison shopping","Low brand loyalty"],
    questions: [
      "How do travelers choose where to book?",
      "What content increases direct bookings?",
      "How do I compete with OTAs?"
    ],
    topPrompt: "Show me 5 content ideas that answer Jonas's top synthetic questions this week"
  }
};

export default function PersonaTryDemo() {
  const navigate = useNavigate();
  const [industry,setIndustry]=useState("SaaS");
  const [company,setCompany]=useState("");
  const [website,setWebsite]=useState("");
  const [loading,setLoading]=useState(false);
  const [persona,setPersona]=useState(null);

  const generate=()=>{
    setLoading(true);
    setPersona(null);
    setTimeout(()=>{
      setPersona(personas[industry]);
      setLoading(false);
    },1800);
  };

  const unlock=()=>{
    localStorage.setItem("industry",industry);
    localStorage.setItem("company",company);
    localStorage.setItem("website",website);
    navigate("/register");
  };

  const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,.03)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "14px",
  padding: "15px 18px",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  transition: "all .25s ease",
  boxSizing: "border-box"
};

const buttonStyle = {
  background: "linear-gradient(135deg,#FFD945,#FFB800)",
  color: "#111",
  border: "none",
  padding: "16px 28px",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: 800,
  fontSize: "1rem",
  marginTop: 24,
  boxShadow: "0 15px 35px rgba(255,217,69,.22)"
};

const cardStyle = {
  background: "rgba(255,255,255,.03)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "22px",
  padding: "30px",
  marginTop: "32px"
};

  return (
    <section className="persona-try-demo" style={{maxWidth:1100,margin:"80px auto",padding:"40px",background:"#fff",borderRadius:20,color:"#171b2b"}}>
      <h2>Try sAInthetic Free</h2>
      <p>Generate a sample AI persona before creating an account.</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
        <select style={inputStyle} value={industry} onChange={e=>setIndustry(e.target.value)}>
          {Object.keys(personas).map(x=><option key={x}>{x}</option>)}
        </select>

        <input
          style={inputStyle}
          placeholder="Company (optional)"
          value={company}
          onChange={e=>setCompany(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Website (optional)"
          value={website}
          onChange={e=>setWebsite(e.target.value)}
        />
      </div>

      <button style={buttonStyle} onClick={generate}>Generate Persona</button>

      {loading && (
        <div style={{marginTop:30}}>
          <h3>🤖 AI is generating your persona...</h3>
          <progress style={{width:"100%"}}/>
        </div>
      )}

      {persona && (
        <div style={cardStyle}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#FFD945,#FFB800)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🧠</div>
              <div>
                <h2 style={{margin:0}}>{persona.name}</h2>
                <div style={{color:"#aaa",fontSize:14}}>{persona.role}</div>
                <div style={{color:"#FFD945",fontSize:13,marginTop:2}}>AI-generated buyer persona · Lead score: {persona.leadScore}/100</div>
              </div>
            </div>
            <span style={{background:"rgba(34,197,94,.12)",color:"#4ade80",border:"1px solid rgba(74,222,128,.3)",padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:700,whiteSpace:"nowrap"}}>High intent ↑</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginTop:24}}>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:16}}>
              <div style={{fontSize:12,letterSpacing:1,color:"#888",marginBottom:6}}>GOALS</div>
              <ul style={{margin:0,paddingLeft:18}}>{persona.goals.map(x=><li key={x}>{x}</li>)}</ul>
            </div>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:16}}>
              <div style={{fontSize:12,letterSpacing:1,color:"#888",marginBottom:6}}>PAIN POINTS</div>
              <ul style={{margin:0,paddingLeft:18}}>{persona.painPoints.map(x=><li key={x}>{x}</li>)}</ul>
            </div>
          </div>

          <div style={{marginTop:16}}>
            <div style={{fontSize:12,letterSpacing:1,color:"#888",marginBottom:8}}>SYNTHETIC AI QUESTIONS</div>
            <ul style={{margin:0,paddingLeft:18}}>{persona.questions.map(x=><li key={x}>{x}</li>)}</ul>
          </div>

          <div style={{marginTop:20,padding:"14px 18px",borderRadius:12,background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.2)",color:"#a7f3d0",fontSize:14}}>
            ✨ "{persona.topPrompt}"
          </div>

          <div style={{marginTop:24,padding:24,borderRadius:12,background:"rgba(255,255,255,.05)"}}>
            <strong>+48 Premium Insights unlock when you register</strong>
            <p>Synthetic AI questions • Lead intent scoring • GEO content ideas • Ready-to-answer prompts • LLM search gaps</p>
            <p style={{fontSize:13,color:"#888",margin:"4px 0 16px"}}>Free plan available · No credit card required · Cancel anytime</p>
            <button style={buttonStyle} onClick={unlock}>Unlock Free →</button>
          </div>
        </div>
      )}
    </section>
  );
}

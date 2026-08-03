import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const personas = {
  SaaS: {
    name: "Sarah Johnson",
    role: "Growth Marketing Manager",
    goals: ["Increase SQLs","Reduce CAC","Improve retention"],
    painPoints: ["Low lead quality","Generic AI content","Weak positioning"],
    questions: [
      "How do I improve demo conversions?",
      "What content ranks in AI search?",
      "How can I reduce CAC?"
    ]
  },
  Finance: {
    name: "David Carter",
    role: "Digital Banking Lead",
    goals: ["Acquire deposits","Increase trust","Grow applications"],
    painPoints: ["Compliance","Long approval cycles","Low engagement"],
    questions: [
      "How do customers research loans?",
      "Which GEO content converts?",
      "What builds trust?"
    ]
  },
  Ecommerce: {
    name: "Emily Brown",
    role: "E-commerce Director",
    goals: ["Increase AOV","Boost repeat purchases","Reduce cart abandonment"],
    painPoints: ["Creative fatigue","High CAC","Low loyalty"],
    questions: [
      "Which offers increase AOV?",
      "How do I recover abandoned carts?",
      "What content drives repeat sales?"
    ]
  },
  Healthcare: {
    name: "Dr. Lisa Nguyen",
    role: "Patient Acquisition Manager",
    goals: ["Increase appointment bookings","Build patient trust","Expand service line awareness"],
    painPoints: ["Strict compliance rules","Low online visibility","High patient acquisition cost"],
    questions: [
      "How do patients search for providers?",
      "What content builds trust in healthcare?",
      "How do I stay compliant with marketing?"
    ]
  },
  RealEstate: {
    name: "Marcus Reid",
    role: "Head of Growth, Real Estate Group",
    goals: ["Generate qualified buyer leads","Increase listing views","Shorten sales cycle"],
    painPoints: ["Seasonal demand swings","High cost per lead","Low agent follow-up rates"],
    questions: [
      "What content converts home buyers?",
      "How do I generate more listing leads?",
      "Which channels drive qualified traffic?"
    ]
  },
  Education: {
    name: "Priya Shah",
    role: "Enrollment Marketing Director",
    goals: ["Increase enrollment applications","Improve program awareness","Boost student engagement"],
    painPoints: ["Long decision cycles","Low content differentiation","Difficulty reaching Gen Z"],
    questions: [
      "How do students research programs?",
      "What content increases applications?",
      "How do I reach prospective students online?"
    ]
  },
  Travel: {
    name: "Jonas Weber",
    role: "Head of Digital Marketing, Travel Brand",
    goals: ["Increase direct bookings","Reduce OTA dependency","Improve repeat travel rate"],
    painPoints: ["High seasonality","Price-driven comparison shopping","Low brand loyalty"],
    questions: [
      "How do travelers choose where to book?",
      "What content increases direct bookings?",
      "How do I compete with OTAs?"
    ]
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
    <section style={{maxWidth:1100,margin:"80px auto",padding:"40px",background:"#141414",borderRadius:20,color:"#fff"}}>
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
          <h2>{persona.name}</h2>
          <h4>{persona.role}</h4>

          <h3>Goals</h3>
          <ul>{persona.goals.map(x=><li key={x}>{x}</li>)}</ul>

          <h3>Pain Points</h3>
          <ul>{persona.painPoints.map(x=><li key={x}>{x}</li>)}</ul>

          <h3>AI Questions</h3>
          <ul>{persona.questions.map(x=><li key={x}>{x}</li>)}</ul>

          <div style={{marginTop:24,padding:24,borderRadius:12,background:"rgba(255,255,255,.05)",filter:"blur(.2px)"}}>
            <strong>+48 Premium Insights</strong>
            <p>Synthetic AI questions • Lead intent scoring • GEO content ideas • Ready-to-answer prompts • LLM search gaps</p>
            <button style={buttonStyle} onClick={unlock}>Unlock Free</button>
          </div>
        </div>
      )}
    </section>
  );
}

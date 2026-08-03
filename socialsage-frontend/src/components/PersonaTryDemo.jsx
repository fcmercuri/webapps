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

  return (
    <section style={{maxWidth:1100,margin:"80px auto",padding:"40px",background:"#141414",borderRadius:20,color:"#fff"}}>
      <h2>Try sAInthetic Free</h2>
      <p>Generate a sample AI persona before creating an account.</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
        <select value={industry} onChange={e=>setIndustry(e.target.value)}>
          {Object.keys(personas).map(x=><option key={x}>{x}</option>)}
        </select>
        <input placeholder="Company (optional)" value={company} onChange={e=>setCompany(e.target.value)}/>
        <input placeholder="Website (optional)" value={website} onChange={e=>setWebsite(e.target.value)}/>
      </div>

      <button style={{marginTop:20}} onClick={generate}>Generate Persona</button>

      {loading && (
        <div style={{marginTop:30}}>
          <h3>🤖 AI is generating your persona...</h3>
          <progress style={{width:"100%"}}/>
        </div>
      )}

      {persona && (
        <div style={{marginTop:30,padding:24,border:"1px solid #333",borderRadius:16}}>
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
            <p>Buying triggers • Customer journey • GEO opportunities • Prompt library • Competitor analysis</p>
            <button onClick={unlock}>Unlock Free</button>
          </div>
        </div>
      )}
    </section>
  );
}

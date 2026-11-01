import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const personas = {
  SaaS: {
    name: "Sarah Johnson", role: "Growth Marketing Manager",
    goals: ["Increase SQLs", "Reduce CAC", "Improve retention"],
    painPoints: ["Low lead quality", "Generic AI content", "Weak positioning"],
    questions: ["How do I improve demo conversions?", "What content ranks in AI search?", "How can I reduce CAC?"],
    topPrompt: "Show me 5 content ideas that answer Sarah's top synthetic questions this week"
  },
  Finance: {
    name: "David Carter", role: "Digital Banking Lead",
    goals: ["Acquire deposits", "Increase trust", "Grow applications"],
    painPoints: ["Compliance", "Long approval cycles", "Low engagement"],
    questions: ["How do customers research loans?", "Which GEO content converts?", "What builds trust?"],
    topPrompt: "Show me 5 content ideas that answer David's top synthetic questions this week"
  },
  Ecommerce: {
    name: "Emily Brown", role: "E-commerce Director",
    goals: ["Increase AOV", "Boost repeat purchases", "Reduce cart abandonment"],
    painPoints: ["Creative fatigue", "High CAC", "Low loyalty"],
    questions: ["Which offers increase AOV?", "How do I recover abandoned carts?", "What content drives repeat sales?"],
    topPrompt: "Show me 5 content ideas that answer Emily's top synthetic questions this week"
  },
  Healthcare: {
    name: "Dr. Lisa Nguyen", role: "Patient Acquisition Manager",
    goals: ["Increase appointment bookings", "Build patient trust", "Expand service line awareness"],
    painPoints: ["Strict compliance rules", "Low online visibility", "High patient acquisition cost"],
    questions: ["How do patients search for providers?", "What content builds trust in healthcare?", "How do I stay compliant with marketing?"],
    topPrompt: "Show me 5 content ideas that answer Lisa's top synthetic questions this week"
  },
  RealEstate: {
    name: "Marcus Reid", role: "Head of Growth, Real Estate Group",
    goals: ["Generate qualified buyer leads", "Increase listing views", "Shorten sales cycle"],
    painPoints: ["Seasonal demand swings", "High cost per lead", "Low agent follow-up rates"],
    questions: ["What content converts home buyers?", "How do I generate more listing leads?", "Which channels drive qualified traffic?"],
    topPrompt: "Show me 5 content ideas that answer Marcus's top synthetic questions this week"
  },
  Education: {
    name: "Priya Shah", role: "Enrollment Marketing Director",
    goals: ["Increase enrollment applications", "Improve program awareness", "Boost student engagement"],
    painPoints: ["Long decision cycles", "Low content differentiation", "Difficulty reaching Gen Z"],
    questions: ["How do students research programs?", "What content increases applications?", "How do I reach prospective students online?"],
    topPrompt: "Show me 5 content ideas that answer Priya's top synthetic questions this week"
  },
  Travel: {
    name: "Jonas Weber", role: "Head of Digital Marketing, Travel Brand",
    goals: ["Increase direct bookings", "Reduce OTA dependency", "Improve repeat travel rate"],
    painPoints: ["High seasonality", "Price-driven comparison shopping", "Low brand loyalty"],
    questions: ["How do travelers choose where to book?", "What content increases direct bookings?", "How do I compete with OTAs?"],
    topPrompt: "Show me 5 content ideas that answer Jonas's top synthetic questions this week"
  }
};

export default function PersonaTryDemo() {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("SaaS");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(null);

  const generate = () => {
    setLoading(true);
    setPersona(null);
    setTimeout(() => {
      setPersona(personas[industry]);
      setLoading(false);
    }, 1100);
  };

  const unlock = () => {
    localStorage.setItem("industry", industry);
    localStorage.setItem("company", company);
    localStorage.setItem("website", website);
    navigate("/register");
  };

  return (
    <section className="persona-demo">
      <style>{`
        .persona-demo { width:100%; max-width:1100px; box-sizing:border-box; margin:64px auto; padding:clamp(22px,4vw,42px); background:#fff; border:1px solid #e8edf4; border-radius:26px; color:#171b2b; box-shadow:0 18px 55px rgba(31,42,68,.055); }
        .persona-demo, .persona-demo * { box-sizing:border-box; }
        .persona-demo-intro { text-align:center; max-width:680px; margin:0 auto 26px; }
        .persona-demo-intro h2 { margin:0 0 10px; color:#171b2b; font-size:clamp(1.55rem,3vw,2.15rem); letter-spacing:-.045em; line-height:1.15; }
        .persona-demo-intro p { margin:0; color:#667085; font-size:1rem; line-height:1.6; }
        .persona-demo-controls { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; max-width:900px; margin:0 auto; }
        .persona-demo-controls input,.persona-demo-controls select { width:100%; min-width:0; min-height:50px; border:1px solid #dce2eb; border-radius:12px; padding:12px 14px; background:#fff; color:#20283b; font-size:16px; outline:none; }
        .persona-demo-controls input:focus,.persona-demo-controls select:focus { border-color:#d9aa12; box-shadow:0 0 0 3px rgba(255,217,69,.2); }
        .persona-demo-generate { display:flex; justify-content:center; margin-top:16px; }
        .persona-demo-button { min-height:50px; border:0; border-radius:12px; padding:13px 23px; background:#ffd945; color:#151927; font-size:15px; font-weight:800; cursor:pointer; transition:transform .2s ease,background .2s ease; }
        .persona-demo-button:hover { background:#ffcf20; transform:translateY(-1px); }
        .persona-demo-loading { max-width:560px; margin:24px auto 0; text-align:center; color:#596579; }
        .persona-demo-loading progress { width:100%; height:7px; accent-color:#e8bd2d; }
        .persona-result { margin-top:30px; padding:clamp(18px,3vw,30px); border:1px solid #e6eaf0; border-radius:22px; background:#fbfcfe; }
        .persona-result-head { display:flex; align-items:center; justify-content:space-between; gap:16px; padding-bottom:22px; border-bottom:1px solid #e9edf3; }
        .persona-result-identity { display:flex; align-items:center; gap:15px; min-width:0; }
        .persona-result-avatar { width:58px; height:58px; flex:0 0 58px; display:flex; align-items:center; justify-content:center; border-radius:17px; background:#fff0b8; font-size:27px; }
        .persona-result-name { margin:0; color:#171b2b; font-size:clamp(1.35rem,3vw,1.8rem); line-height:1.15; letter-spacing:-.04em; }
        .persona-result-role { margin-top:5px; color:#667085; font-size:.95rem; line-height:1.4; }
        .persona-result-badge { flex:0 0 auto; border:1px solid #f0df9d; border-radius:999px; padding:7px 11px; background:#fff9e5; color:#80620b; font-size:.76rem; font-weight:750; }
        .persona-result-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:20px; }
        .persona-result-panel { min-width:0; padding:18px; border:1px solid #e8edf3; border-radius:15px; background:#fff; }
        .persona-result-label { margin:0 0 11px; color:#7b8494; font-size:.72rem; font-weight:800; letter-spacing:.12em; }
        .persona-result-list { display:grid; gap:9px; margin:0; padding:0; list-style:none; }
        .persona-result-list li { display:flex; align-items:flex-start; gap:9px; color:#43516a; font-size:.96rem; line-height:1.45; }
        .persona-result-list li:before { content:""; width:7px; height:7px; flex:0 0 7px; margin-top:.48em; border-radius:50%; background:#e6bd35; }
        .persona-questions { margin-top:14px; }
        .persona-questions .persona-result-list li:before { background:#9ba8bc; }
        .persona-prompt { margin-top:16px; padding:17px 19px; border:1px solid #d5eee2; border-radius:15px; background:#f1faf5; color:#315d49; font-size:.96rem; line-height:1.55; }
        .persona-prompt-label { display:block; margin-bottom:6px; color:#56816b; font-size:.7rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
        .persona-result-cta { display:flex; align-items:center; justify-content:space-between; gap:20px; margin-top:20px; padding:21px 23px; border-radius:16px; background:#111827; color:#fff; }
        .persona-result-cta h3 { margin:0 0 5px; color:#fff; font-size:1.12rem; }
        .persona-result-cta p { margin:0; color:#c3cad5; font-size:.9rem; line-height:1.5; }
        .persona-result-cta .persona-demo-button { flex:0 0 auto; background:#ffd945; }
        .persona-demo-note { margin-top:9px !important; color:#aeb8c7 !important; font-size:.78rem !important; }
        @media(max-width:700px) {
          .persona-demo { margin:42px 0; padding:22px 17px; border-radius:20px; }
          .persona-demo-intro { margin-bottom:20px; }
          .persona-demo-controls { grid-template-columns:1fr; gap:10px; }
          .persona-demo-generate { justify-content:stretch; }
          .persona-demo-generate .persona-demo-button { width:100%; }
          .persona-result { margin-top:22px; padding:17px 14px; border-radius:18px; }
          .persona-result-head { align-items:flex-start; gap:10px; padding-bottom:17px; }
          .persona-result-identity { gap:11px; }
          .persona-result-avatar { width:48px; height:48px; flex-basis:48px; border-radius:14px; font-size:23px; }
          .persona-result-name { font-size:1.35rem; }
          .persona-result-role { font-size:.84rem; }
          .persona-result-badge { padding:6px 8px; font-size:.67rem; }
          .persona-result-grid { grid-template-columns:1fr; gap:10px; margin-top:14px; }
          .persona-result-panel { padding:15px; }
          .persona-result-list { gap:7px; }
          .persona-result-list li { font-size:.92rem; }
          .persona-questions { margin-top:10px; }
          .persona-prompt { margin-top:13px; padding:14px; font-size:.9rem; }
          .persona-result-cta { align-items:stretch; flex-direction:column; gap:14px; padding:18px; }
          .persona-result-cta .persona-demo-button { width:100%; }
        }
        @media(max-width:380px) {
          .persona-result-head { flex-direction:column; }
          .persona-result-badge { align-self:flex-start; }
        }
      `}</style>

      <div className="persona-demo-intro">
        <h2>See what a buyer persona looks like</h2>
        <p>Choose an industry to explore a sample. Then create a free account to build and save a persona for your own business.</p>
      </div>

      <div className="persona-demo-controls">
        <select aria-label="Choose an industry" value={industry} onChange={e => setIndustry(e.target.value)}>
          {Object.keys(personas).map(x => <option key={x} value={x}>{x === "Ecommerce" ? "E-commerce" : x === "RealEstate" ? "Real estate" : x}</option>)}
        </select>
        <input aria-label="Company name, optional" placeholder="Company (optional)" value={company} onChange={e => setCompany(e.target.value)} />
        <input aria-label="Website, optional" placeholder="Website (optional)" value={website} onChange={e => setWebsite(e.target.value)} />
      </div>

      <div className="persona-demo-generate">
        <button className="persona-demo-button" type="button" onClick={generate} disabled={loading}>
          {loading ? "Preparing your preview…" : "Preview sample persona"}
        </button>
      </div>

      {loading && <div className="persona-demo-loading" aria-live="polite"><p>Preparing your sample persona…</p><progress /></div>}

      {persona && (
        <div className="persona-result" aria-live="polite">
          <div className="persona-result-head">
            <div className="persona-result-identity">
              <div className="persona-result-avatar" aria-hidden="true">🧠</div>
              <div>
                <h3 className="persona-result-name">{persona.name}</h3>
                <div className="persona-result-role">{persona.role}</div>
              </div>
            </div>
            <span className="persona-result-badge">Illustrative sample</span>
          </div>

          <div className="persona-result-grid">
            <div className="persona-result-panel">
              <div className="persona-result-label">GOALS</div>
              <ul className="persona-result-list">{persona.goals.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="persona-result-panel">
              <div className="persona-result-label">PAIN POINTS</div>
              <ul className="persona-result-list">{persona.painPoints.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>

          <div className="persona-result-panel persona-questions">
            <div className="persona-result-label">QUESTIONS YOUR BUYERS MAY ASK AI</div>
            <ul className="persona-result-list">{persona.questions.map(x => <li key={x}>{x}</li>)}</ul>
          </div>

          <div className="persona-prompt">
            <span className="persona-prompt-label">Example content prompt</span>
            “{persona.topPrompt}”
          </div>

          <div className="persona-result-cta">
            <div>
              <h3>Make this persona yours</h3>
              <p>Build a persona around your company, audience and website, then save it to your workspace.</p>
              <p className="persona-demo-note">Free plan available · No credit card required</p>
            </div>
            <button className="persona-demo-button" type="button" onClick={unlock}>Create my free account →</button>
          </div>
        </div>
      )}
    </section>
  );
}

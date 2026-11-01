import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const personas = {
  SaaS: {
    avatarIndex: 1,
    name: "Sarah Johnson", role: "Growth Marketing Manager",
    goals: ["Increase SQLs", "Reduce CAC", "Improve retention"],
    painPoints: ["Low lead quality", "Generic AI content", "Weak positioning"],
    questions: ["Which project management platforms are best for a 50-person SaaS team scaling beyond spreadsheets?", "What should we compare when choosing a platform: implementation time, integrations, adoption or total cost?", "How can a SaaS company improve trial-to-paid conversion without increasing acquisition spend?", "What evidence should I look for before trusting a vendor's security, reliability and customer results?", "Which tools integrate with our CRM and product analytics stack, and how difficult is migration?"],
    topPrompt: "Identify the five highest-intent questions a 50-person SaaS team would ask before choosing a platform. Group by discovery, comparison and purchase, then recommend content that addresses each decision criterion."
  },
  Finance: {
    avatarIndex: 2,
    name: "David Carter", role: "Digital Banking Lead",
    goals: ["Acquire deposits", "Increase trust", "Grow applications"],
    painPoints: ["Compliance", "Long approval cycles", "Low engagement"],
    questions: ["Which business savings accounts offer competitive rates while keeping deposits accessible?", "What should I compare between providers: FSCS protection, fees, access, service and digital tools?", "How long does business account opening take, and what documents will a company need?", "How can a business improve cash returns without compromising liquidity or risk controls?", "What are the key risks and eligibility criteria when switching a business banking provider?"],
    topPrompt: "Map the questions a finance decision-maker asks before choosing a business banking provider. Prioritise trust, eligibility, access, risk and total value, then identify the evidence content must provide."
  },
  Ecommerce: {
    avatarIndex: 1,
    name: "Emily Brown", role: "E-commerce Director",
    goals: ["Increase AOV", "Boost repeat purchases", "Reduce cart abandonment"],
    painPoints: ["Creative fatigue", "High CAC", "Low loyalty"],
    questions: ["Which skincare products are best for sensitive skin, and what ingredients should I avoid?", "How do these products compare on ingredients, independent reviews, price and delivery?", "Is the premium option worth the extra cost compared with a lower-priced alternative?", "Which size or product is right for my needs, and what is the returns policy if it is not suitable?", "Can I trust the product claims, and what evidence supports the stated benefits?"],
    topPrompt: "Map the questions shoppers ask from product discovery to purchase. Highlight comparison criteria, objections and trust signals, then recommend content that helps customers choose confidently."
  },
  Healthcare: {
    avatarIndex: 3,
    name: "Dr. Lisa Nguyen", role: "Patient Acquisition Manager",
    goals: ["Increase appointment bookings", "Build patient trust", "Expand service line awareness"],
    painPoints: ["Strict compliance rules", "Low online visibility", "High patient acquisition cost"],
    questions: ["Which local clinics specialise in this condition, and what qualifications should I look for?", "What should I expect at the first consultation, including preparation, costs and follow-up?", "How do the available treatment options compare in benefits, risks and recovery time?", "Is this provider regulated, and where can I verify its clinical credentials?", "When should I seek urgent medical advice rather than booking a routine appointment?"],
    topPrompt: "Identify the questions patients ask when evaluating a provider. Organise by symptoms, treatment options, credentials and appointment decisions, while keeping information evidence-led and appropriately cautious."
  },
  RealEstate: {
    avatarIndex: 0,
    name: "Marcus Reid", role: "Head of Growth, Residential Property Group",
    goals: ["Increase valuation and viewing enquiries", "Convert more portal traffic into qualified leads", "Improve viewing-to-offer conversion"],
    painPoints: ["High portal lead costs and low intent", "Buyers struggle to compare total ownership costs", "Slow follow-up causes qualified enquiries to go cold"],
    questions: ["Which neighbourhoods match my budget, commute and school requirements, and what evidence supports the comparison?", "How does this property compare with recent sold prices for similar homes nearby, adjusted for condition and size?", "What will the full monthly and upfront cost be after mortgage payments, council tax, energy, maintenance and legal fees?", "What should I look for during a viewing, and which survey findings could materially change the asking price?", "How competitive is the local market right now, how long are comparable homes taking to sell, and what would be a credible offer strategy?"],
    contentOpportunities: ["Neighbourhood comparison guides built around commute, schools and budget", "Property comparison pages using recent sold-price evidence and total ownership costs", "Viewing and survey checklists that answer buyer objections before an enquiry"],
    decisionStages: ["Area research", "Property comparison", "Viewing and offer"],
    topPrompt: "Build a buyer-intent content plan for a residential property group. Segment demand into area research, property comparison and viewing-to-offer. For each stage, specify the buyer question, evidence required, recommended content format and conversion action. Prioritise opportunities by commercial intent and ability to reduce purchase uncertainty."
  },
  Education: {
    avatarIndex: 3,
    name: "Priya Shah", role: "Enrollment Marketing Director",
    goals: ["Increase enrollment applications", "Improve program awareness", "Boost student engagement"],
    painPoints: ["Long decision cycles", "Low content differentiation", "Difficulty reaching Gen Z"],
    questions: ["Which universities offer the strongest programmes for a career in data analytics?", "How do the courses compare on curriculum, industry placements, graduate outcomes and total cost?", "What entry requirements and practical experience will strengthen my application?", "Which scholarships, bursaries or financing options are available to students like me?", "What career paths do graduates typically enter, and which employers recruit from the programme?"],
    topPrompt: "Map a prospective student's decision journey from course discovery to application. Identify questions about outcomes, curriculum, entry requirements and funding, then recommend content that supports informed choice."
  },
  Travel: {
    avatarIndex: 2,
    name: "Jonas Weber", role: "Head of Digital Marketing, Travel Brand",
    goals: ["Increase direct bookings", "Reduce OTA dependency", "Improve repeat travel rate"],
    painPoints: ["High seasonality", "Price-driven comparison shopping", "Low brand loyalty"],
    questions: ["Which destinations offer the best value for a family holiday in September?", "How do direct flights, baggage, transfers and cancellation terms change the true trip cost?", "Which hotels are best for families, based on location, recent reviews and facilities?", "When is the best time to book, and how flexible are the fares if plans change?", "What is included in the direct booking rate that may not be included through an online travel agency?"],
    topPrompt: "Map a traveller's decision journey from destination discovery to booking. Identify comparison criteria, booking objections and trust signals, then recommend content that makes the direct-booking proposition compelling.",
    contentOpportunities: ["Comparison content that clarifies decision criteria", "Evidence-led guides that address common objections", "Practical checklists that help buyers take the next step"],
    decisionStages: ["Research", "Compare", "Decide"]
  }
};

export default function PersonaTryDemo() {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("SaaS");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(null);

  const normaliseWebsite = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      const parsed = new URL(candidate);
      return parsed.hostname.includes(".") ? parsed.toString().replace(/\/$/, "") : "";
    } catch { return ""; }
  };

  const generate = () => {
    const normalisedWebsite = normaliseWebsite(website);
    if (!normalisedWebsite) {
      setWebsiteError(website.trim() ? "Enter a valid website, e.g. yourcompany.com." : "Add your website to see a brand-specific persona preview.");
      return;
    }
    setWebsite(normalisedWebsite);
    setWebsiteError("");
    setLoading(true);
    setPersona(null);
    setTimeout(() => {
      setPersona(personas[industry]);
      setLoading(false);
    }, 1100);
  };

  const unlock = () => {
    const normalisedWebsite = normaliseWebsite(website);
    if (!normalisedWebsite) {
      setWebsiteError(website.trim() ? "Enter a valid website, e.g. yourcompany.com." : "Your website is required to create a persona for your brand.");
      return;
    }
    localStorage.setItem("industry", industry);
    localStorage.setItem("company", company);
    localStorage.setItem("website", normalisedWebsite);
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
        .persona-demo-controls { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; width:100%; max-width:760px; margin:0 auto; align-items:start; }
        .persona-demo-website-field { min-width:0; display:flex; flex-direction:column; gap:6px; }
        .persona-demo-website-field small { color:#667085; font-size:11px; line-height:1.35; }
        .persona-demo-website-field small[role="alert"] { color:#b42318; }
        .persona-demo-website-field input[aria-invalid="true"] { border-color:#d92d20; }
        .persona-demo-controls input,.persona-demo-controls select { width:100%; min-width:0; min-height:44px; border:1px solid #dce2eb; border-radius:10px; padding:10px 12px; background:#fff; color:#20283b; font-size:15px; outline:none; }
        .persona-demo-controls input:focus,.persona-demo-controls select:focus { border-color:#d9aa12; box-shadow:0 0 0 3px rgba(255,217,69,.2); }
        .persona-demo-generate { display:flex; justify-content:center; margin-top:16px; }
        .persona-demo-button { min-height:50px; border:0; border-radius:12px; padding:13px 23px; background:#ffd945; color:#151927; font-size:15px; font-weight:800; cursor:pointer; transition:transform .2s ease,background .2s ease; }
        .persona-demo-button:hover { background:#ffcf20; transform:translateY(-1px); }
        .persona-demo-loading { max-width:560px; margin:24px auto 0; text-align:center; color:#596579; }
        .persona-demo-loading progress { width:100%; height:7px; accent-color:#e8bd2d; }
        .persona-result { margin-top:30px; padding:clamp(18px,3vw,30px); border:1px solid #e6eaf0; border-radius:22px; background:#fbfcfe; }
        .persona-result-head { display:flex; align-items:center; justify-content:space-between; gap:16px; padding-bottom:22px; border-bottom:1px solid #e9edf3; }
        .persona-result-identity { display:flex; align-items:center; gap:15px; min-width:0; }
        .persona-result-avatar { width:76px; height:76px; flex:0 0 76px; display:block; object-fit:cover; object-position:center 30%; border:3px solid #fff; outline:1px solid #e5e9ef; border-radius:50%; box-shadow:0 4px 14px rgba(23,27,43,.12); }
        .persona-result-avatar-icon { width:76px; height:76px; flex:0 0 76px; display:flex; align-items:center; justify-content:center; border:1px solid #e8dfbd; border-radius:18px; background:linear-gradient(145deg,#fff8df,#fffdf6); color:#9b7a19; box-shadow:0 4px 14px rgba(23,27,43,.08); } .persona-result-avatar-icon svg { display:block; width:38px; height:38px; }
        .persona-result-insights { margin-top:14px; padding:18px; border:1px solid #dcebe3; border-radius:16px; background:linear-gradient(145deg,#f3faf6,#fff); }
        .persona-result-insights h4 { margin:0 0 12px; color:#203b30; font-size:1rem; letter-spacing:-.02em; }
        .persona-result-stages { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:9px; margin-bottom:14px; }
        .persona-result-stage { padding:11px; border:1px solid #dcebe3; border-radius:11px; background:#fff; color:#355b49; font-size:.82rem; font-weight:750; }
        .persona-result-stage span { display:block; margin-bottom:4px; color:#89978f; font-size:.65rem; letter-spacing:.1em; }
        .persona-result-insights ul { display:grid; gap:8px; margin:0; padding-left:18px; color:#43516a; font-size:.9rem; line-height:1.45; }
        .persona-demo-evidence { margin-top:10px; color:#788294; font-size:.76rem; line-height:1.45; }
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
        .persona-result-cta { display:flex; align-items:center; justify-content:space-between; gap:24px; margin-top:20px; padding:24px 26px; border:1px solid #f0e4bd; border-radius:16px; background:#fffaf0; color:#20283b; }
        .persona-result-cta-copy { min-width:0; max-width:570px; }
        #sainthetic-home .persona-result-cta h3, .persona-result-cta h3 { margin:0 0 7px !important; color:#171b2b !important; font-size:1.18rem !important; line-height:1.25 !important; font-weight:800 !important; }
        #sainthetic-home .persona-result-cta p, .persona-result-cta p { margin:0 !important; color:#596579 !important; font-size:.92rem !important; line-height:1.55 !important; }
        .persona-result-cta .persona-demo-button { flex:0 0 auto; min-height:54px !important; padding:14px 22px !important; border:0 !important; border-radius:12px !important; background:#171b2b !important; color:#fff !important; font-size:15px !important; font-weight:800 !important; line-height:1.25 !important; white-space:nowrap !important; visibility:visible !important; opacity:1 !important; }
        .persona-result-cta .persona-demo-button:hover { background:#30394d !important; color:#fff !important; }
        #sainthetic-home .persona-demo-note, .persona-demo-note { margin-top:8px !important; color:#7b8494 !important; font-size:.8rem !important; }
        .persona-prompt { color:#315d49 !important; }
        .persona-prompt-label { color:#56816b !important; }
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
          .persona-result-avatar-icon { width:48px; height:48px; flex-basis:48px; border-radius:14px; } .persona-result-avatar-icon svg { width:26px; height:26px; }
          .persona-result-stages { grid-template-columns:1fr; gap:7px; }
          .persona-result-stage { padding:9px 10px; }
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
          .persona-result-cta .persona-demo-button { width:100% !important; min-height:54px !important; background:#171b2b !important; color:#fff !important; }
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
        <div className="persona-demo-website-field">
          <input aria-label="Company website, required" aria-required="true" aria-invalid={!!websiteError} aria-describedby="persona-website-help persona-website-error" type="url" placeholder="Website (e.g. yourcompany.com)" value={website} onChange={e => { setWebsite(e.target.value); setWebsiteError(""); }} />
          <small id="persona-website-help">Your website is the differentiator: it gives Sainthetic your real products, positioning and content to build a persona around your brand, not just your industry.</small>
          {websiteError && <small id="persona-website-error" role="alert">{websiteError}</small>}
        </div>
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
              <div className="persona-result-avatar-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7"/><path d="M4.8 20c.55-3.55 3.45-5.7 7.2-5.7s6.65 2.15 7.2 5.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg></div>
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
            <div className="persona-result-label">BUYER DECISION QUESTIONS</div>
            <ul className="persona-result-list">{persona.questions.map(x => <li key={x}>{x}</li>)}</ul>
          </div>

          <div className="persona-result-insights">
            <h4>What your team should create next</h4>
            <div className="persona-result-stages">{(persona.decisionStages || ["Research", "Compare", "Decide"]).map((stage, index) => <div className="persona-result-stage" key={stage}><span>STAGE 0{index+1}</span>{stage}</div>)}</div>
            <ul>{(persona.contentOpportunities || ["Comparison content that clarifies decision criteria", "Evidence-led guides that address common objections", "Practical checklists that help buyers take the next step"]).map(item => <li key={item}>{item}</li>)}</ul>
            <p className="persona-demo-evidence">Illustrative AI-generated recommendations based on this sample persona, not verified search-volume or customer research data.</p>
          </div>

          <div className="persona-prompt">
            <span className="persona-prompt-label">STRATEGIC CONTENT BRIEF</span>
            “{persona.topPrompt}”
          </div>

          <div className="persona-result-cta">
            <div>
              <h3>Make this persona yours</h3>
              <p>Build a persona around your company, audience and website, then save it to your workspace.</p>
              <p className="persona-demo-note">Free plan available · No credit card required</p>
            </div>
            <button className="persona-demo-button" type="button" onClick={unlock} style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", minHeight:56, padding:"14px 22px", background:"#171b2b", color:"#ffffff", border:"0", borderRadius:12, fontSize:15, fontWeight:800, lineHeight:1.25, whiteSpace:"nowrap", opacity:1, visibility:"visible", cursor:"pointer" }}>Create my free account <span aria-hidden="true" style={{ marginLeft:8 }}>→</span></button>
          </div>
        </div>
      )}
    </section>
  );
}

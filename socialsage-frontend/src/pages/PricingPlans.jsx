export default function PricingPlans() {
    return (
      <section>
        <h1 style={{ textAlign: "center" }}>Our Pricing</h1>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
          <div className="card" style={{ minWidth: 260 }}>
            <h2>Starter</h2>
            <div style={{ fontSize: 28, fontWeight: 700, margin: "18px 0" }}>$19<span style={{ fontSize: 16 }}>/mo</span></div>
            <ul style={{ color: "#bbb", padding: 0, listStyle: "none" }}>
              <li>Persona Builder</li>
              <li>Content Generation</li>
            </ul>
            <button className="cta" style={{ width: "100%" }}>Choose</button>
          </div>
          <div className="card" style={{ minWidth: 260 }}>
            <h2>Pro</h2>
            <div style={{ fontSize: 28, fontWeight: 700, margin: "18px 0" }}>$49<span style={{ fontSize: 16 }}>/mo</span></div>
            <ul style={{ color: "#bbb", padding: 0, listStyle: "none" }}>
              <li>All Starter Features</li>
              <li>Analytics & Insights</li>
              <li>Collaboration</li>
            </ul>
            <button className="cta" style={{ width: "100%" }}>Choose</button>
          </div>
        </div>
      </section>
    );
  }
  
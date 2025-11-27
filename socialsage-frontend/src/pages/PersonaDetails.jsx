export default function PersonaDetails() {
    return (
      <section style={{ minHeight: "60vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: 500, width: "100%" }}>
          <h1>Edit Persona</h1>
          {/* Show/edit persona details here */}
          <input value="SaaS Marketer" />
          <input value="Growth Hacking" />
          <button className="cta">Save Changes</button>
        </div>
      </section>
    );
  }
  
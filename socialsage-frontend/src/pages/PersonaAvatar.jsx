export default function PersonaAvatar() {
    return (
      <section style={{ minHeight: "60vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: 500, width: "100%", textAlign: "center" }}>
          <h1>Create AI Persona Avatar</h1>
          {/* Place image generator component/logic here */}
          <button className="cta" style={{ marginTop: 20 }}>Generate Avatar</button>
        </div>
      </section>
    );
  }
  
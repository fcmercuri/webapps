export default function OnboardingComplete() {
    return (
      <section style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
          <h1>You're all set!</h1>
          <p style={{ color: "#999", margin: "18px 0" }}>
            Your onboarding is complete and your dashboard is ready.
          </p>
          <a href="/dashboard" className="cta" style={{ display: "inline-block", textDecoration: "none" }}>Go to Dashboard</a>
        </div>
      </section>
    );
  }
  
export default function Checkout() {
    return (
      <section style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: 380, width: "100%" }}>
          <h1 style={{ marginBottom: 18 }}>Checkout</h1>
          <p style={{ color: "#bbb", marginBottom: 24 }}>Complete your subscription below:</p>
          {/* Integrate your payment flow here */}
          <button className="cta" style={{ width: '100%' }}>Pay & Activate</button>
        </div>
      </section>
    );
  }
  
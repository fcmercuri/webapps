export default function ForgotPassword() {
    return (
      <section style={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: 420, width: "100%" }}>
          <h1 style={{ marginBottom: 16 }}>Reset Password</h1>
          <form>
            <input type="email" placeholder="Email" required />
            <button className="cta" type="submit" style={{ width: "100%" }}>Send Reset Link</button>
          </form>
          <div style={{ marginTop: 15, textAlign: "right" }}>
            <a href="/login" style={{ color: "#ffd945" }}>Back to Login</a>
          </div>
        </div>
      </section>
    );
  }
  
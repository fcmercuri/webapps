export default function Login() {
  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="card" style={{ maxWidth: 420, width: "100%" }}>
        <h1 style={{ marginBottom: 20 }}>Login</h1>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="cta" type="submit" style={{ width: "100%" }}>Sign In</button>
        </form>
        <div style={{ marginTop: 12 }}>
          <a href="/forgot-password" style={{ color: "#ffd945" }}>Forgot password?</a>
        </div>
      </div>
    </section>
  );
}

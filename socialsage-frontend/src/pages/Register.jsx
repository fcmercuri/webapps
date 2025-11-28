import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const registerRes = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        {
      
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!registerRes.ok) {
        const data = await registerRes.json();
        throw new Error(data.error || "Registration failed");
      }

      // After successful registration
      const upgradePriceId = localStorage.getItem("upgradePriceId");
      if (upgradePriceId) {
        localStorage.removeItem("upgradePriceId");

        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/create-checkout-session`,
          {
        
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId: upgradePriceId, customerEmail: email }),
        });

        const data = await res.json();
        const url = data.url;

        if (url) {
          window.location = url;
        } else {
          setError("Failed to retrieve payment URL.");
        }
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0B0B0B 0%, #1A1A2E 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ background: "rgba(20, 20, 22, 0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 217, 69, 0.1)", borderRadius: "20px", padding: "50px 40px", maxWidth: "420px", width: "90%", position: "relative", zIndex: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img src="logo.jpg" alt="SocialSage Logo" style={{ width: "40px", height: "40px", borderRadius: "12px", objectFit: "cover", marginBottom: "15px", boxShadow: "0 4px 12px rgba(255, 217, 69, 0.2)" }} />
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "white", margin: "0 0 10px 0", background: "linear-gradient(96deg, #fff 60%, #ffd945 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>SocialSage</h1>
          <p style={{ color: "#bbb", fontSize: "1rem", margin: 0 }}>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", color: "#ffd945", fontSize: "0.9rem", fontWeight: 600, marginBottom: "8px" }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "12px 16px", background: "#0B0B0B", border: "1.5px solid #232323", borderRadius: "10px", color: "white", fontSize: "1rem", fontFamily: "inherit", transition: "all 0.2s", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#ffd945", fontSize: "0.9rem", fontWeight: 600, marginBottom: "8px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (6 characters)"
              style={{ width: "100%", padding: "12px 16px", background: "#0B0B0B", border: "1.5px solid #232323", borderRadius: "10px", color: "white", fontSize: "1rem", fontFamily: "inherit", transition: "all 0.2s", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#ffd945", fontSize: "0.9rem", fontWeight: 600, marginBottom: "8px" }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{ width: "100%", padding: "12px 16px", background: "#0B0B0B", border: "1.5px solid #232323", borderRadius: "10px", color: "white", fontSize: "1rem", fontFamily: "inherit", transition: "all 0.2s", boxSizing: "border-box" }}
            />
          </div>

          {error && (
            <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ff6b6b", padding: "12px 14px", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 500 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background: "#ffd945", color: "#191919", border: "none", padding: "13px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s", opacity: loading ? 0.6 : 1, marginTop: "10px", boxShadow: "0 8px 20px rgba(255, 217, 69, 0.2)" }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#bbb", fontSize: "0.9rem", marginTop: "25px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ffd945", textDecoration: "none", fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

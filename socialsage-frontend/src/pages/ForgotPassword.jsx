import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setError("");
    if (!email) return setError("Email is required");

try {
  setLoading(true);
  const res = await api.post("/api/auth/forgot-password", { email });
  console.log("forgot-password response:", res.data);
  setStatus(
    res.data?.message ||
      "If the account exists, we sent a reset link to your email."
  );
} catch (err) {
  console.log("forgot-password error:", err.response?.data || err.message);
  setError(err.response?.data?.error || "Failed to start reset");
} finally {
  setLoading(false);
}

  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0b0b0b 0%,#1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(20,20,22,0.8)",
          borderRadius: 20,
          padding: "32px 28px",
          maxWidth: 400,
          width: "90%",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>
          Reset your password
        </h1>
        <p style={{ color: "#bbb", marginBottom: 16 }}>
          Enter the email you use for AInthetic and we will send you a reset
          link.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{ color: "#ffd945", marginBottom: 6, display: "block" }}
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: 10,
              border: "1px solid #232323",
              background: "#0b0b0b",
              color: "#fff",
              marginBottom: 12,
            }}
            placeholder="you@example.com"
          />

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fecaca",
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 10,
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          {status && (
            <div
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(22,163,74,0.4)",
                color: "#bbf7d0",
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 10,
                fontSize: "0.9rem",
              }}
            >
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 4,
              background: "#ffd945",
              color: "#191919",
              border: "none",
              borderRadius: 10,
              padding: "11px 16px",
              fontWeight: 700,
              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Sending link…" : "Send reset link"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              marginTop: 10,
              background: "transparent",
              color: "#e5e7eb",
              border: "none",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
}

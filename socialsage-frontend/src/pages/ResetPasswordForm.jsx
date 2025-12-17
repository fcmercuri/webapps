// src/pages/ResetPasswordForm.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/reset-password", { token, password });
      setStatus("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
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
          Choose a new password
        </h1>
        <p style={{ color: "#bbb", marginBottom: 16 }}>
          Enter a new password for your sAInthetic account.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{ color: "#ffd945", marginBottom: 6, display: "block" }}
          >
            New password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: 10,
              border: "1px solid #232323",
              background: "#0b0b0b",
              color: "#fff",
              marginBottom: 12,
            }}
            placeholder="Enter a new password"
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
            {loading ? "Updating..." : "Update password"}
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

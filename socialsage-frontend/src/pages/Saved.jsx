import React from "react";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0b0b 0%, #05050a 60%, #05060d 100%)",
        color: "#fff",
      }}
    >
      <header
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "20px 20px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logo.jpg"
            alt="SocialSage Logo"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(255, 217, 69, 0.2)",
            }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.3rem",
              letterSpacing: "-0.04em",
            }}
          >
            SocialSage
          </span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 999,
            padding: "7px 16px",
            color: "#eee",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Back to app
        </button>
      </header>

      <main
        style={{
          maxWidth: 1120,
          margin: "40px auto 80px",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 16 }}>
          Saved
        </h1>
        <p style={{ color: "#bbb", maxWidth: 520 }}>
          All your saved personas, prompts, and generated content will appear
          here so you can quickly reuse your best assets.
        </p>
      </main>
    </div>
  );
}

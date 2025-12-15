// src/pages/EmailVerified.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
      }}
    >
      <div
        style={{
          background: "#141416",
          padding: "40px 32px",
          borderRadius: 16,
          maxWidth: 420,
          width: "90%",
          textAlign: "center",
          border: "1px solid rgba(255,217,69,0.2)",
        }}
      >
        <h1 style={{ color: "#ffd945", marginBottom: 12 }}>
          Email confirmed 🎉
        </h1>
        <p style={{ color: "#ddd", marginBottom: 24 }}>
          Your email address has been verified. You can now log in to your
          sAInthetic account.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            background: "#ffd945",
            color: "#191919",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Go to login
        </button>
      </div>
    </div>
  );
}

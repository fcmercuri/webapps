





fvfra152@gmail.com



// src/pages/EmailVerified.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // user still needs to log in after confirming email
    navigate("/login");
  };

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
          maxWidth: 480,
          width: "90%",
          textAlign: "center",
          border: "1px solid rgba(255,217,69,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      >
        <h1 style={{ color: "#ffd945", marginBottom: 12 }}>
          Email confirmed 🎉
        </h1>
        <p style={{ color: "#ddd", marginBottom: 24 }}>
          Your email address has been verified. You can now log in to your
          sAInthetic account.
        </p>

        {/* Next steps box */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            borderRadius: 14,
            padding: "16px 18px",
            border: "1px solid rgba(148, 163, 184, 0.35)",
            marginBottom: 24,
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
              margin: "0 0 10px 0",
              fontWeight: 600,
            }}
          >
            Next steps
          </p>
          <ul
            style={{
              paddingLeft: "1.1rem",
              margin: 0,
              color: "#cbd5f5",
              fontSize: "0.9rem",
            }}
          >
            <li>Select your industry to generate your first AI persona.</li>
            <li>Explore the ready‑made prompts attached to that persona.</li>
            <li>Turn those prompts into tailored website content and offers.</li>
          </ul>
        </div>

        {/* CTA button styled like login primary button */}
        <button
          type="button"
          onClick={handleContinue}
          style={{
            width: "100%",
            background: "#ffd945",
            color: "#191919",
            border: "none",
            padding: "13px 20px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(255, 217, 69, 0.25)",
          }}
        >
          Go to login
        </button>
      </div>
    </div>
  );
}

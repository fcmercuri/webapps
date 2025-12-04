import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(20, 20, 22, 0.9)",
          borderRadius: 20,
          padding: "40px 32px",
          maxWidth: 480,
          width: "90%",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: 12 }}>Welcome to SocialSage 🎉</h1>
        <p style={{ color: "#ccc", marginBottom: 24 }}>
          Your account is ready!
        </p>

        <Link
          to="/dashboard"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: 10,
            background: "#ffd945",
            color: "#191919",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

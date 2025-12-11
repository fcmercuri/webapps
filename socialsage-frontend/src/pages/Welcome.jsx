// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = () => {
    localStorage.setItem("firstLogin", "false");
    navigate("/dashboard", { replace: true });
  };

  // Reuse same Safari blur detection as Login
  const isSafari = /^((?!chrome|android).)*safari/i.test(
    navigator.userAgent
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* same glow as login */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: 350,
          height: 350,
          background:
            "radial-gradient(circle, rgba(255,217,69,0.25), transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "rgba(20, 20, 22, 0.8)",
          backdropFilter: isSafari ? "blur(4px)" : "blur(12px)",
          WebkitBackdropFilter: isSafari ? "blur(4px)" : "blur(12px)",
          border: "1px solid rgba(255, 217, 69, 0.1)",
          borderRadius: "20px",
          padding: "50px 40px",
          maxWidth: 480,
          width: "90%",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      >
        {/* Header with same logo + title as login */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img
            src="/logo.jpg"
            alt="sAInthetic Logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              objectFit: "cover",
              marginBottom: 15,
            }}
          />
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              background:
                "linear-gradient(96deg, #fff 60%, #ffd945 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Welcome to sAInthetic
          </h1>
          <p style={{ color: "#bbb", marginTop: 8 }}>
            Onboarding your new AI‑powered workspace
          </p>
        </div>

        {/* Main welcome copy */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              color: "#d1d5db",
              fontSize: "0.98rem",
              textAlign: "center",
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            Your account has been created and you are now signed in
            {user?.email ? ` as ${user.email}.` : "."}
          </p>
        </div>

        {/* Next steps box */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            borderRadius: 14,
            padding: "16px 18px",
            border: "1px solid rgba(148, 163, 184, 0.35)",
            marginBottom: 24,
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
          Go to your dashboard
        </button>
      </motion.div>
    </div>
  );
}

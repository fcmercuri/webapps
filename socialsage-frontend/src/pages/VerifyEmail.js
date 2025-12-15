// src/pages/VerifyEmail.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams(); // from /verify-email/:token

  useEffect(() => {
    if (!token) return;

    // Let the browser hit the backend endpoint directly.
    // The backend will then redirect to /email-verified.
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email/${token}`;
  }, [token]);

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
          padding: "32px 28px",
          borderRadius: 16,
          maxWidth: 360,
          width: "90%",
          textAlign: "center",
          border: "1px solid rgba(255,217,69,0.2)",
        }}
      >
        <h1 style={{ color: "#ffd945", marginBottom: 12 }}>Verifying...</h1>
        <p style={{ color: "#ddd" }}>
          Please wait while we confirm your email address.
        </p>
      </div>
    </div>
  );
}

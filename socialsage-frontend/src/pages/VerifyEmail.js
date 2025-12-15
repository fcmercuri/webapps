// src/pages/VerifyEmail.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams(); // from /verify-email/:token

  useEffect(() => {
    if (!token) return;

    // Just call the backend; browser will follow the redirect to /email-verified
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email/${token}`,
      { method: "GET", mode: "no-cors" } // avoid CORS warning; we don't need the body
    ).catch(() => {
      // ignore errors; backend will show error page itself if needed
    });
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

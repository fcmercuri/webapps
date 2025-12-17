// src/pages/ResetPasswordRedirect.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ResetPasswordRedirect() {
  const { token } = useParams(); // from /reset-password/:token

  useEffect(() => {
    if (!token) return;

    // Let the browser hit the backend endpoint directly.
    // The backend can validate the token and redirect to the actual reset UI
    // or return an error page if invalid/expired.
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password/${token}`;
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
        <h1 style={{ color: "#ffd945", marginBottom: 12 }}>Checking link...</h1>
        <p style={{ color: "#ddd" }}>
          Please wait while we verify your reset password link.
        </p>
      </div>
    </div>
  );
}

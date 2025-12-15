// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();              // gets the token from URL
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email/${token}`,
          { method: "POST" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Invalid link");

        // success → show your nice success page
        navigate("/email-verified");
      } catch (err) {
        setStatus("error");
      }
    }
    verify();
  }, [token, navigate]);

  if (status === "error") {
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
          }}
        >
          <h1 style={{ color: "#f87171", marginBottom: 12 }}>Link not valid</h1>
          <p style={{ color: "#ddd", marginBottom: 24 }}>
            The verification link is invalid or has expired. Try signing in again
            to request a new email.
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
      <div style={{ color: "white" }}>Verifying your email...</div>
    </div>
  );
}

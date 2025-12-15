// src/pages/VerifyEmail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/verify-email/${token}`);
        if (!res.ok) throw new Error("Failed");
        setStatus("ok");
        setTimeout(() => navigate("/email-verified", { replace: true }), 1500);
      } catch {
        setStatus("error");
      }
    }
    verify();
  }, [token, navigate]);

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
          maxWidth: 420,
          width: "90%",
          textAlign: "center",
        }}
      >
        {status === "loading" && (
          <>
            <h2 style={{ color: "#ffd945" }}>Verifying your email…</h2>
            <p style={{ color: "#ccc" }}>
              This will only take a second. Please wait.
            </p>
          </>
        )}

        {status === "ok" && (
          <>
            <h2 style={{ color: "#ffd945" }}>Email verified</h2>
            <p style={{ color: "#ccc" }}>
              Redirecting you to the login page…
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ color: "#ff6b6b" }}>Link not valid</h2>
            <p style={{ color: "#ccc", marginBottom: 16 }}>
              The verification link is invalid or has expired. Try signing in
              again to request a new email.
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "10px 18px",
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
          </>
        )}
      </div>
    </div>
  );
}

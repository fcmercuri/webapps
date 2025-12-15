// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams(); // gets b65122e6... from /verify-email/:token
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "error"

  useEffect(() => {
    async function verify() {
      try {
        // IMPORTANT: use GET to match backend `app.get('/api/auth/verify-email/:token')`
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email/${token}`,
          { method: "GET" }
        );

        // backend redirects directly to /email-verified on success
        if (res.redirected) {
          window.location.href = res.url; // follow redirect if needed
          return;
        }

        if (!res.ok) {
          setStatus("error");
          return;
        }

        // if backend ever returns 200 without redirect:
        navigate("/email-verified");
      } catch (err) {
        setStatus("error");
      }
    }

    if (token) {
      verify();
    } else {
      setStatus("error");
    }
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
            border: "1px solid rgba(248,113,113,0.3)",
          }}
        >
          <h1 style={{ color: "#f87171", marginBottom: 12 }}>Link not valid</h1>
          <p style={{ color: "#ddd", marginBottom: 24 }}>
            The verification link is invalid or has expired. Try signing in
            again to request a new email.
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

  // loading state while verifying
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

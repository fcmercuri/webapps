// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams(); // from /verify-email/:token
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    async function verify() {
      try {
        if (!token) {
          setStatus("error");
          return;
        }

        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email/${token}`,
          { method: "GET" }
        );

        console.log("verify status", res.status, res.redirected, res.url);

        // If backend redirects (302) straight to /email-verified
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        // Treat any 2xx/3xx as success
        if (res.ok || (res.status >= 200 && res.status < 400)) {
          navigate("/email-verified");
          return;
        }

        // Only here is it really an invalid link
        setStatus("error");
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

  // Loading state
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

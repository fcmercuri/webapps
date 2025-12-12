import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const goAfterLogin = () => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (!firstLogin || firstLogin === "true") {
      localStorage.setItem("firstLogin", "true");
      navigate("/welcome", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError("");

        const res = await fetch(`${BASE_URL}/api/auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Google login failed");

        loginSuccess(data.token, data.user);
        goAfterLogin();
      } catch (err) {
        setError(err.message || "Google login failed");
      }
    },
    onError: () => setError("Google login failed"),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      loginSuccess(data.token, data.user);
      goAfterLogin();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

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
          background: "rgba(20, 20, 22, 0.75)",
          backdropFilter: isSafari ? "blur(4px)" : "blur(12px)",
          WebkitBackdropFilter: isSafari ? "blur(4px)" : "blur(12px)",
          border: "1px solid rgba(255, 217, 69, 0.1)",
          borderRadius: "20px",
          padding: "50px 40px",
          maxWidth: 420,
          width: "90%",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img
            src="/logo.jpg"
            alt="SocialSage Logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              objectFit: "cover",
              marginBottom: "15px",
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
            Welcome Back
          </h1>
          <p style={{ color: "#bbb", margin: 0 }}>
            Sign in to your sAInthetic account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label style={{ color: "#ffd945", marginBottom: 8, display: "block" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "#0B0B0B",
                border: "1.5px solid #232323",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#ffd945", marginBottom: 8, display: "block" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "#0B0B0B",
                border: "1.5px solid #232323",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: -8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                color: "#ffd945",
                cursor: "pointer",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ff6b6b",
                padding: "12px 14px",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#ffd945",
              color: "#191919",
              border: "none",
              padding: "13px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: 22,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: "#777" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <button
          type="button"
          onClick={() => loginWithGoogle()}
          style={{
            width: "100%",
            background: "#0B0B0B",
            color: "#fff",
            border: "1.5px solid #232323",
            borderRadius: "10px",
            padding: "12px 16px",
            fontWeight: 600,
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img src="/google-icon.svg" alt="Google logo" style={{ width: 18 }} />
          Continue with Google
        </button>

        <p style={{ textAlign: "center", color: "#bbb", marginTop: 25 }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#ffd945",  textDecoration: "none", fontWeight: 600 }}>
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

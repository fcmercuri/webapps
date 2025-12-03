import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../api/axios";   // <- single, correct import


export default function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError("");

        const res = await api.post("/api/auth/google-login", {
          access_token: tokenResponse.access_token,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        loginSuccess(token, user);
        navigate("/dashboard");
      } catch (err) {
        const message =
          err.response?.data?.error || err.message || "Google login failed";
        setError(message);
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

      const loginRes = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = loginRes.data;
      localStorage.setItem("token", token);
      loginSuccess(token, user);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Login failed";
      setError(message);
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
      {/* Glow background */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #ffd94533 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "rgba(20, 20, 22, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 217, 69, 0.1)",
          borderRadius: "20px",
          padding: "50px 40px",
          maxWidth: 420,
          width: "90%",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Header with Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img
            src="/logo.jpg"
            alt="SocialSage Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              objectFit: "cover",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(255, 217, 69, 0.2)",
            }}
          />

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 10px 0",
              background: "linear-gradient(96deg, #fff 60%, #ffd945 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#bbb", fontSize: "1rem", margin: 0 }}>
            Sign in to your SocialSage account
          </p>
        </div>

        {/* Email / password form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                color: "#ffd945",
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
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
                fontSize: "1rem",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#ffd945",
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
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
                fontSize: "1rem",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
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
              marginTop: "10px",
              boxShadow: "0 8px 20px rgba(255, 217, 69, 0.2)",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Separator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "22px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <span style={{ color: "#777", fontSize: "0.85rem" }}>or</span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Google button */}
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
            fontSize: "0.95rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img
            src="/google-logo.svg"
            alt="Google logo"
            style={{ width: 18, height: 18 }}
          />
          <span>Continue with Google</span>
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#bbb",
            fontSize: "0.9rem",
            marginTop: "25px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#ffd945", textDecoration: "none", fontWeight: 600 }}
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

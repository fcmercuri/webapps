// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

function Register() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const isJson = response.headers.get("Content-Type")?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        setFormError(data?.error || "Registration failed.");
        setLoading(false);
        return;
      }

      loginSuccess(data.token, data.user);

      // Set first login flag so Welcome shows once
      localStorage.setItem("firstLogin", "true");

      navigate("/welcome");
    } catch {
      setFormError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const googleRegister = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch("/api/auth/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: tokenResponse.code }),
        });

        const isJson = response.headers.get("Content-Type")?.includes("application/json");
        const data = isJson ? await response.json() : null;

        if (!response.ok) {
          setFormError(data?.error || "Google registration failed.");
          return;
        }

        loginSuccess(data.token, data.user);

        // Show welcome page first time
        localStorage.setItem("firstLogin", "true");

        navigate("/welcome");
      } catch {
        setFormError("Google registration failed. Try again.");
      }
    },
  });

  return (
    <div className="register-page">
      <h2>Create Account</h2>

      {formError && <div className="error-message">{formError}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Register"}
        </button>
      </form>

      <button onClick={() => googleRegister()}>Sign up with Google</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
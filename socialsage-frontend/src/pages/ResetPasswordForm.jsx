// src/pages/ResetPasswordForm.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("");

    try {
      await api.post("/api/auth/reset-password", { token, password });
      setStatus("Password updated. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    }
  }

  // Simple UI
  return (
    <div> 
      {/* style like ForgotPassword if you want */}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />
        <button type="submit">Update password</button>
        {error && <p>{error}</p>}
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}

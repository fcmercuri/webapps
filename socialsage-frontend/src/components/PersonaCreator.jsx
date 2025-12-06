import React, { useState } from "react";
import { apiPost } from "../api/index";

function PersonaCreator({ token, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    industry: "",
    goals: "",
    pains: "",
    channels: "",
    tone: "",
    expertise: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdPersona, setCreatedPersona] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const normaliseList = (value) =>
    value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

  // Simple lead score (0–100) from cold → hot
  const calculateConversionScore = (data = form) => {
    const { role, industry, goals, pains, channels, expertise } = data;
    let score = 0;

    const hotRoles = ["founder", "owner", "ceo", "director", "vp", "head", "manager"];
    const hotIndustries = ["saas", "software", "tech", "marketing", "agency", "ecommerce"];

    if (role && hotRoles.some((r) => role.toLowerCase().includes(r))) score += 25;
    if (industry && hotIndustries.some((i) => industry.toLowerCase().includes(i))) score += 20;

    const goalsCount = normaliseList(goals || "").length;
    const painsCount = normaliseList(pains || "").length;
    const channelsCount = normaliseList(channels || "").length;

    if (goalsCount >= 3) score += 15;
    else if (goalsCount >= 1) score += 5;

    if (painsCount >= 3) score += 15;
    else if (painsCount >= 1) score += 5;

    if (channelsCount >= 3) score += 10;
    else if (channelsCount >= 1) score += 5;

    const yearsMatch = (expertise || "").match(/(\d+)/);
    if (yearsMatch) {
      const years = parseInt(yearsMatch[1], 10);
      if (years >= 10) score += 10;
      else if (years >= 5) score += 5;
    }

    if (role || industry || goals || pains) score += 5; // base fit

    const finalScore = Math.max(0, Math.min(score, 100));
    return Number.isFinite(finalScore) ? finalScore : 0;
  };

  const currentScore = calculateConversionScore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreatedPersona(null);

    try {
      // recompute score using latest form
      const scoreToSend = calculateConversionScore(form);

      const payload = {
        name: form.name,
        role: form.role,
        industry: form.industry,
        goals: normaliseList(form.goals),
        painPoints: normaliseList(form.pains),
        channels: normaliseList(form.channels),
        tone: form.tone,
        expertise: form.expertise,
        conversionScore: scoreToSend,
      };

      const res = await apiPost("/api/personas", payload, token);

      if (res?.error) {
        setError(res.error);
      } else {
        setCreatedPersona(res);
        if (onCreated) onCreated(res);
        setForm({
          name: "",
          role: "",
          industry: "",
          goals: "",
          pains: "",
          channels: "",
          tone: "",
          expertise: "",
        });
      }
    } catch (err) {
      setError("Failed to create persona");
    } finally {
      setLoading(false);
    }
  };

  const leadLabel =
    currentScore >= 70 ? "Hot lead" : currentScore >= 40 ? "Warm lead" : "Cold lead";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20, color: "#fff" }}>Create Persona</h2>

      {/* Live lead score */}
      <div
        style={{
          marginBottom: 20,
          padding: 14,
          borderRadius: 12,
          border: "1px solid rgba(250, 204, 21, 0.4)",
          background: "rgba(250, 204, 21, 0.06)",
          color: "#fde68a",
          fontSize: 14,
        }}
      >
        Lead score:{" "}
        <strong style={{ fontSize: 18, color: "#facc15" }}>
          {currentScore}/100
        </strong>{" "}
        · {leadLabel}
      </div>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <input
              name={key}
              placeholder={
                key === "goals"
                  ? "Goals (comma separated)"
                  : key === "pains"
                  ? "Pain points (comma separated)"
                  : key === "channels"
                  ? "Channels (comma separated)"
                  : key.charAt(0).toUpperCase() + key.slice(1)
              }
              value={form[key]}
              onChange={handleChange}
              required={key === "name" || key === "role"}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(15,23,42,0.9)",
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            width: "100%",
            padding: "12px 18px",
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
            fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            background: "#ffd945",
            color: "#111827",
          }}
        >
          {loading ? "Loading..." : "Create"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

      {createdPersona && (
        <div
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 12,
            border: "1px solid rgba(16,185,129,0.5)",
            background: "rgba(16,185,129,0.12)",
            color: "#a7f3d0",
            fontSize: 14,
          }}
        >
          <h3 style={{ margin: "0 0 6px 0", color: "#6ee7b7" }}>
            Persona Created Successfully
          </h3>
          <div>
            {createdPersona.name} · {createdPersona.role} · {createdPersona.industry} · Score:{" "}
            {Math.round(createdPersona.conversionScore ?? currentScore)}/100
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonaCreator;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

export default function Prompts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBestPersona() {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/api/personas/best");
        setPersona(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load persona");
      } finally {
        setLoading(false);
      }
    }
    loadBestPersona();
  }, []);

  // Safely normalise goals and pains
  const goalsArray = Array.isArray(persona?.goals)
    ? persona.goals
    : typeof persona?.goals === "string"
    ? persona.goals
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
    : [];

  const painsArray = Array.isArray(persona?.painPoints)
    ? persona.painPoints
    : typeof persona?.painPoints === "string"
    ? persona.painPoints
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const mainGoal = goalsArray[0] || "their main goal";
  const mainPain = painsArray[0] || "their key pain point";
  const goalsSummary =
    goalsArray.length > 0 ? goalsArray.slice(0, 2).join(", ") : "their main goals";

  const prompts = persona
    ? [
        {
          title: "Understand their day",
          text: `Describe a typical workday for ${persona.name}. What tasks take most of ${persona.name} time, and where does ${persona.name} feel the most friction?`,
        },
        {
          title: "Hidden frustrations",
          text: `List 10 specific frustrations ${persona.name} experiences when trying to achieve ${mainGoal}. Prioritize the ones that feel emotionally painful.`,
        },
        {
          title: "Jobs to be done",
          text: `For ${persona.name}, list the top 5 'jobs to be done' they hire a product like ours for. Write them as short, action‑oriented sentences.`,
        },
        {
          title: "Buying triggers",
          text: `What events or situations make ${persona.name} actively start looking for a solution like ours? Give 8 examples with context, based on their pains such as ${mainPain}.`,
        },
        {
          title: "Objections and fears",
          text: `List 10 common objections or fears someone like ${persona.name} has before buying our product. Suggest a concise response for each one.`,
        },
        {
          title: "Information sources",
          text: `Where does ${persona.name} go to research solutions like ours (people, channels, sites, tools)? Describe 8 realistic sources.`,
        },
        {
          title: "Messaging angles",
          text: `Create 7 different messaging angles to pitch our product to ${persona.name}, each focused on a different benefit or outcome ${persona.name} cares about.`,
        },
        {
          title: "Story hook",
          text: `Write a short story (150–200 words) about a day when ${persona.name} finally solves ${mainPain} using a product like ours.`,
        },
        {
          title: "Content ideas",
          text: `Generate 15 content ideas (titles only) that would feel irresistibly useful to ${persona.name} this month, given their goals like ${goalsSummary}.`,
        },
        {
          title: "Before/after grid",
          text: `Create a before/after grid for ${persona.name}: describe their 'before' situation and 'after' situation across 6 dimensions (results, feelings, time, money, status, control), using their pains like ${mainPain} as input.`,
        },
      ]
    : [];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0b0b0b 0%, #05050a 60%, #05060d 100%)",
        color: "#fff",
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onItemClick={() => setIsSidebarOpen(false)}
      />

      <div className="dashboard-main">
        {/* Mobile header */}
        <div
          className="dashboard-mobile-header"
          style={{ padding: "10px 10px 0" }}
        >
          <button
            type="button"
            onClick={() => setIsSidebarOpen((v) => !v)}
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src="/logo.jpg"
              alt="SocialSage"
              style={{ width: 32, height: 32, borderRadius: 10 }}
            />
            <span style={{ color: "#fff", fontWeight: 700 }}>Menu</span>
          </button>
        </div>

        <div className="dashboard-content">
          <h1
            style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 8 }}
          >
            Persona prompts for LLMs
          </h1>

          {loading && <p style={{ color: "#bbb" }}>Loading best persona…</p>}

          {error && (
            <p style={{ color: "#fca5a5", marginBottom: 16 }}>{error}</p>
          )}

          {persona && (
            <p style={{ color: "#bbb", maxWidth: 640, marginBottom: 24 }}>
              These prompts are tailored to your highest‑converting persona:{" "}
              <span style={{ color: "#ffd945", fontWeight: 600 }}>
                {persona.name}
              </span>
              . Copy any of them into your LLM.
            </p>
          )}

          {!loading && !error && !persona && (
            <p style={{ color: "#bbb" }}>
              You do not have any personas yet. Generate some personas first.
            </p>
          )}

          {persona && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              {prompts.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#15151f",
                    borderRadius: 18,
                    padding: "16px 18px 18px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "#888",
                      marginBottom: 6,
                    }}
                  >
                    Prompt #{idx + 1}
                  </div>
                  <h2
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      margin: "0 0 6px",
                      color: "#ffd945",
                    }}
                  >
                    {p.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#ddd",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

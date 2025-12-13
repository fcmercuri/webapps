// src/pages/Prompts.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

export default function Prompts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [persona, setPersona] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keywordLoading, setKeywordLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBestPersonaPrompts() {
      try {
        setLoading(true);
        setError("");
        // 1) Get best persona + raw prompts from backend
        const res = await api.get("/api/prompts/best-persona");
        const personaData = res.data.persona;
        const basePrompts = res.data.prompts || [];
        setPersona(personaData);
        setPrompts(basePrompts);

        // 2) Ask backend to extract focus keywords for each prompt
        if (basePrompts.length) {
          setKeywordLoading(true);
          try {
            const kwRes = await api.post("/api/prompts/volume", {
              prompts: basePrompts.map((p) => ({ prompt: p.prompt })),
            });
            const enriched = kwRes.data.prompts || [];
            const byPrompt = {};
            enriched.forEach((p) => {
              byPrompt[p.prompt] = p;
            });
            setPrompts(
              basePrompts.map((p) => byPrompt[p.prompt] || p)
            );
          } catch (kwErr) {
            console.error("Focus keyword extraction failed", kwErr);
          } finally {
            setKeywordLoading(false);
          }
        }
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Failed to load prompts for your best persona"
        );
      } finally {
        setLoading(false);
      }
    }

    loadBestPersonaPrompts();
  }, []);

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
              These prompts are generated from your highest‑converting persona:{" "}
              <span style={{ color: "#ffd945", fontWeight: 600 }}>
                {persona.name}
              </span>
              . Copy any of them into your favourite LLM or search engine.
              {keywordLoading && " Extracting focus keywords…"}
            </p>
          )}

          {!loading && !error && !persona && (
            <p style={{ color: "#bbb" }}>
              You do not have any personas yet. Go to the Dashboard and
              generate personas first.
            </p>
          )}

          {persona && prompts.length > 0 && (
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
                    Prompt #{idx + 1} · {p.intent} · {p.channel}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#ddd",
                      margin: "0 0 8px 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.prompt}
                  </p>

                  {p.focusKeyword && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 11,
                        color: "#9ca3af",
                      }}
                    >
                      Focus Area:{" "}
                      <span style={{ color: "#ffd945" }}>
                        {p.focusKeyword}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

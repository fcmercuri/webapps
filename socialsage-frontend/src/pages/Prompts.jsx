// src/pages/Prompts.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Prompts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [personas, setPersonas] = useState([]);
  const [selectedPersonaId, setSelectedPersonaId] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keywordLoading, setKeywordLoading] = useState(false);
  const [error, setError] = useState("");
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const { user } = useAuth();

  // Language inherited from dashboard
  const [language] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en"
      : "en"
  );

  // How many times prompts have been generated (persona selections) on this device
  const [promptGenerationsUsed, setPromptGenerationsUsed] = useState(() => {
    if (typeof window === "undefined") return 0;
    const raw = localStorage.getItem("promptGenerationsUsed") || "0";
    const n = Number(raw);
    return Number.isNaN(n) ? 0 : n;
  });

  const MAX_FREE_GENERATIONS = 5;

  const isFreePlan = !user || !user.plan || user.plan === "free";
  const selectedPersona = personas.find((p) => p._id === selectedPersonaId);

  // Load all personas first
  useEffect(() => {
    async function loadPersonas() {
      try {
        setError("");
        const res = await api.get("/api/personas");
        const list = Array.isArray(res.data) ? res.data : [];
        setPersonas(list);
        if (list.length > 0) {
          setSelectedPersonaId(list[0]._id); // default first persona
        }
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to load your personas"
        );
      }
    }
    loadPersonas();
  }, []);

  // Generate prompts when selected persona changes
  useEffect(() => {
    if (!selectedPersonaId) return;

    async function generatePromptsForPersona() {
      // Hard gate for free plan after 5 persona selections
      if (isFreePlan && promptGenerationsUsed >= MAX_FREE_GENERATIONS) {
        setLoading(false);
        setPrompts([]);
        setError(
          "You have used your 5 free persona prompt generations. Upgrade to unlock prompts for all personas."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");
        setPrompts([]);

        // 1) generate prompts for that persona, with language
        const res = await api.post("/api/prompts/generate", {
          personaId: selectedPersonaId,
          language,
        });

        // increment usage on successful generation for free users
        if (isFreePlan) {
          const next = promptGenerationsUsed + 1;
          setPromptGenerationsUsed(next);
          if (typeof window !== "undefined") {
            localStorage.setItem("promptGenerationsUsed", String(next));
          }
        }

        const basePrompts = Array.isArray(res.data) ? res.data : [];
        setPrompts(basePrompts);

        // 2) enrich with focus keywords
        if (basePrompts.length) {
          setKeywordLoading(true);
          try {
            const kwRes = await api.post("/api/prompts/volume", {
              prompts: basePrompts.map((p) => ({
                // send some stable text to keyword API
                prompt: p.title || p.description || "",
              })),
            });

            const enriched = kwRes.data.prompts || [];
            const byPrompt = {};
            enriched.forEach((p) => {
              byPrompt[p.prompt] = p; // key is the text we sent above
            });

            setPrompts(
              basePrompts.map((p) => {
                const key = p.title || p.description || "";
                const match = byPrompt[key];
                return match
                  ? { ...p, focusKeyword: match.focusKeyword }
                  : p;
              })
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
            "Failed to generate prompts for this persona"
        );
      } finally {
        setLoading(false);
      }
    }

    generatePromptsForPersona();
  }, [selectedPersonaId, language, isFreePlan, promptGenerationsUsed]);

  async function handleUpgradeStarter() {
    try {
      setUpgradeLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_1SdH1fPwyyuQCEbaZt4loxPH",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start upgrade checkout");
      }
      window.location = data.url;
    } catch (err) {
      console.error("Upgrade error:", err);
      setError(err.message || "Failed to start upgrade checkout");
    } finally {
      setUpgradeLoading(false);
    }
  }

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
              alt="sAInthetic"
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

          {error && (
            <p style={{ color: "#fca5a5", marginBottom: 16 }}>{error}</p>
          )}

          {/* Persona dropdown */}
          {personas.length > 0 ? (
            <div
              style={{
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span style={{ color: "#bbb", fontSize: 14 }}>Persona:</span>
              <select
                value={selectedPersonaId}
                onChange={(e) => setSelectedPersonaId(e.target.value)}
                style={{
                  background: "#020617",
                  color: "#e5e7eb",
                  borderRadius: 999,
                  border: "1px solid #4b5563",
                  padding: "6px 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {personas.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>
                Language: {language === "en" ? "English" : "Italiano"}
              </span>
              {isFreePlan && (
                <span style={{ color: "#facc15", fontSize: 12 }}>
                  Used {promptGenerationsUsed} / {MAX_FREE_GENERATIONS} free
                  persona prompts
                </span>
              )}
            </div>
          ) : (
            !error && (
              <p style={{ color: "#bbb", marginBottom: 16 }}>
                You do not have any personas yet. Go to the Dashboard and
                generate personas first.
              </p>
            )
          )}

          {loading && (
            <p style={{ color: "#bbb" }}>
              Generating prompts for this persona…
            </p>
          )}

          {selectedPersona && !loading && prompts.length > 0 && (
            <p style={{ color: "#bbb", maxWidth: 640, marginBottom: 24 }}>
              These prompts are generated from:{" "}
              <span style={{ color: "#ffd945", fontWeight: 600 }}>
                {selectedPersona.name}
              </span>
              . Copy any of them into your favourite LLM or search engine.
              {keywordLoading && " Extracting focus keywords…"}
            </p>
          )}

          {selectedPersona && prompts.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
                marginBottom: 24,
              }}
            >
              {prompts.map((p, idx) => (
                <div
                  key={p._id || idx}
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
                    Prompt #{idx + 1} · {p.category || "Prompt"}
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      color: "#ddd",
                      margin: "0 0 4px 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.title || p.prompt}
                  </p>

                  {p.description && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "#9ca3af",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {p.description}
                    </p>
                  )}

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

          {isFreePlan && (
            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                borderRadius: 12,
                background: "rgba(250, 204, 21, 0.07)",
                border: "1px solid rgba(250, 204, 21, 0.4)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxWidth: 520,
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#e5e7eb",
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
                You have used{" "}
                <strong>
                  {promptGenerationsUsed} / {MAX_FREE_GENERATIONS}
                </strong>{" "}
                free persona prompt generations. Upgrade to unlock unlimited
                prompt generations and full access to all prompts for every
                persona.
              </p>
              <button
                type="button"
                onClick={handleUpgradeStarter}
                disabled={upgradeLoading}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 4,
                  background: "#facc15",
                  color: "#111827",
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 13,
                  border: "none",
                  cursor: upgradeLoading ? "default" : "pointer",
                  opacity: upgradeLoading ? 0.7 : 1,
                  boxShadow: "0 4px 12px rgba(250, 204, 21, 0.35)",
                }}
              >
                {upgradeLoading ? "Starting checkout…" : "Unlock all prompts"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// src/pages/Prompts.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Prompts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [persona, setPersona] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keywordLoading, setKeywordLoading] = useState(false);
  const [error, setError] = useState("");
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const { user } = useAuth(); // get current user (with plan)

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
            setPrompts(basePrompts.map((p) => byPrompt[p.prompt] || p));
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

  const isFreePlan = !user || !user.plan || user.plan === "free";

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
                marginBottom: 24,
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

          {/* CTA: Upgrade for more prompts – only for free plan users */}
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
                maxWidth: 480,
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
                Want more high‑intent prompts every week for your personas?
                Upgrade to the <strong>Starter plan</strong> to unlock larger
                prompt packs and more generations.
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
                {upgradeLoading ? "Starting checkout…" : "Upgrade to Starter"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

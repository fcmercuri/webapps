import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Personas() {
  const navigate = useNavigate();
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    async function loadPersonas() {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/personas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to load personas");
        const data = await res.json();
        setPersonas(data || []);
      } catch (err) {
        setError(err.message || "Failed to load personas");
      } finally {
        setLoading(false);
      }
    }
    loadPersonas();
  }, [BASE_URL]);

  const total = personas.length;
  const premiumCount = personas.filter((p) => p.isPremium).length;

  // Most converting persona (highest conversionScore)
  const topConverting = useMemo(() => {
    if (!personas.length) return null;
    // change "conversionScore" to your actual field if different
    return [...personas].sort(
      (a, b) => (b.conversionScore || 0) - (a.conversionScore || 0)
    )[0];
  }, [personas]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0b0b0b 0%, #05050a 60%, #05060d 100%)",
        color: "#fff",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "20px 20px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logo.jpg"
            alt="SocialSage Logo"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(255, 217, 69, 0.2)",
            }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.3rem",
              letterSpacing: "-0.04em",
            }}
          >
            SocialSage
          </span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 999,
            padding: "7px 16px",
            color: "#eee",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Back to app
        </button>
      </header>

      {/* Main */}
      <main
        style={{
          maxWidth: 1120,
          margin: "40px auto 80px",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 16 }}>
          Personas
        </h1>

        {loading && <p style={{ color: "#bbb" }}>Loading personas…</p>}

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.45)",
              color: "#fecaca",
              padding: "10px 14px",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  flex: "0 0 200px",
                  background: "#15151f",
                  borderRadius: 16,
                  padding: "16px 18px",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ fontSize: 13, color: "#aaa" }}>
                  Total personas
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    marginTop: 4,
                  }}
                >
                  {total}
                </div>
              </div>

              <div
                style={{
                  flex: "0 0 200px",
                  background: "#15151f",
                  borderRadius: 16,
                  padding: "16px 18px",
                  border: "1px solid rgba(255,217,69,0.15)",
                }}
              >
                <div style={{ fontSize: 13, color: "#aaa" }}>
                  Premium personas
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#ffd945",
                    marginTop: 4,
                  }}
                >
                  {premiumCount}
                </div>
              </div>
            </div>

            {total === 0 && (
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 18,
                  padding: "20px 22px",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  color: "#ddd",
                  maxWidth: 520,
                }}
              >
                You don’t have any personas yet. Go back to the dashboard and
                select an industry to generate your first 4 personas.
              </div>
            )}

            {topConverting && (
              <div
                style={{
                  marginTop: 8,
                  background: "linear-gradient(135deg,#171727,#111119)",
                  borderRadius: 20,
                  padding: "20px 22px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  maxWidth: 640,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffd945",
                    marginBottom: 4,
                  }}
                >
                  Most converting persona
                  {typeof topConverting.conversionScore === "number" && (
                    <span style={{ color: "#aaa", marginLeft: 8 }}>
                      · Score: {topConverting.conversionScore.toFixed(2)}
                    </span>
                  )}
                </div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    margin: "0 0 6px",
                  }}
                >
                  {topConverting.name} · {topConverting.age} ·{" "}
                  {topConverting.industry}
                </h2>
                <p
                  style={{
                    color: "#ccc",
                    fontSize: 14,
                    margin: "0 0 10px",
                  }}
                >
                  {topConverting.bio}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    fontSize: 13,
                    color: "#aaa",
                  }}
                >
                  <div>
                    <strong style={{ color: "#fff", fontSize: 12 }}>
                      Goals
                    </strong>
                    <ul style={{ margin: "6px 0 0 16px" }}>
                      {topConverting.goals.slice(0, 3).map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: "#fff", fontSize: 12 }}>
                      Pain points
                    </strong>
                    <ul style={{ margin: "6px 0 0 16px" }}>
                      {topConverting.painPoints.slice(0, 3).map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

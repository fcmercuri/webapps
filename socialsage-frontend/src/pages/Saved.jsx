import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

export default function Saved() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadSaved() {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/api/content"); // adjust if your endpoint differs
        setItems(res.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load saved content");
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
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
            onClick={() => setIsSidebarOpen(v => !v)}
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
            style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 16 }}
          >
            Saved content
          </h1>

          {loading && <p style={{ color: "#bbb" }}>Loading saved content…</p>}

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

          {!loading && !error && items.length === 0 && (
            <p style={{ color: "#bbb" }}>
              You do not have any saved content yet.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 18,
              }}
            >
              {items.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "#15151f",
                    borderRadius: 16,
                    padding: "16px 18px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "#9ca3af",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.type || "Content"}
                  </div>
                  <h2
  style={{
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 8px",
  }}
>
  {item.title}
</h2>

<div
  style={{
    fontSize: 13,
    color: "#d1d5db",
    margin: 0,
  }}
>
  {item.body
    ?.split(/\n\s*\n/) // split on blank line = new paragraph
    .filter(Boolean)
    .map((para, idx) => (
      <p key={idx} style={{ margin: idx === 0 ? 0 : "8px 0 0" }}>
        {para}
      </p>
    ))}
</div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Sidebar from "../components/Sidebar";

const personaPrompts = [
  {
    title: "Understand their day",
    text:
      "Describe a typical workday for [Persona Name]. What tasks take most of their time, and where do they feel the most friction?",
  },
  {
    title: "Hidden frustrations",
    text:
      "List 10 specific frustrations [Persona Name] experiences when trying to achieve [main goal]. Prioritize the ones that feel emotionally painful.",
  },
  {
    title: "Jobs to be done",
    text:
      "For [Persona Name], list the top 5 'jobs to be done' they hire a product like ours for. Write them as short, action‑oriented sentences.",
  },
  {
    title: "Buying triggers",
    text:
      "What events or situations make [Persona Name] actively start looking for a solution like ours? Give 8 examples with context.",
  },
  {
    title: "Objections and fears",
    text:
      "List 10 common objections or fears [Persona Name] has before buying our product. Suggest a concise response for each one.",
  },
  {
    title: "Information sources",
    text:
      "Where does [Persona Name] go to research solutions like ours (people, channels, sites, tools)? Describe 8 realistic sources.",
  },
  {
    title: "Messaging angles",
    text:
      "Create 7 different messaging angles to pitch our product to [Persona Name], each focused on a different benefit or outcome.",
  },
  {
    title: "Story hook",
    text:
      "Write a short story (150–200 words) about a day when [Persona Name] finally solves [pain point] using a product like ours.",
  },
  {
    title: "Content ideas",
    text:
      "Generate 15 content ideas (titles only) that would feel irresistibly useful to [Persona Name] this month.",
  },
  {
    title: "Before/after grid",
    text:
      "Create a before/after grid for [Persona Name]: describe their 'before' situation and 'after' situation across 6 dimensions (results, feelings, time, money, status, control).",
  },
];

export default function Prompts() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
            style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 8 }}
          >
            Persona prompts for LLMs
          </h1>
          <p style={{ color: "#bbb", maxWidth: 640, marginBottom: 24 }}>
            Copy any of these into your LLM and replace{" "}
            <span style={{ color: "#ffd945" }}>[Persona Name]</span> and{" "}
            <span style={{ color: "#ffd945" }}>[main goal]</span> /
            <span style={{ color: "#ffd945" }}>[pain point]</span> with one of
            your personas.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {personaPrompts.map((p, idx) => (
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
        </div>
      </div>
    </div>
  );
}

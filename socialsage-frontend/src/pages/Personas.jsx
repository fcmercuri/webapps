// src/pages/Personas.jsx

import React from "react";
import { motion } from "framer-motion";

const personas = [
  {
    id: 1,
    name: "SaaS Start-up Marketer",
    industry: "Tech",
    bio: "Focuses on growth hacking and viral strategies for B2B apps.",
    avatar: "/avatars/saas.png",
    score: 86,
    trend: +8,
    scoreLabel: "Visibility Score",
    scoreDesc: "How often this persona appears in your analysis.",
  },
  // ...add more as needed
];

export default function Personas() {
  return (
    <section>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Your Personas</h1>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
      }}>
        {personas.map((persona, idx) => (
          <motion.div
            key={persona.id}
            className="card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #ffd94544" }}
            transition={{ duration: 0.6 + idx * 0.06 }}
            style={{
              maxWidth: 330,
              minWidth: 260,
              flex: "1 1 260px",
              textAlign: "center"
            }}
          >
            <img
              src={persona.avatar}
              alt={persona.name}
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                marginBottom: "1rem",
                border: "2px solid #222"
              }}
            />
            <h3 style={{ marginBottom: 4 }}>{persona.name}</h3>
            <span style={{
              color: "#ffd945", fontWeight: 600, fontSize: "0.98rem"
            }}>{persona.industry}</span>
            <p style={{ color: "#bdbdbd", margin: "14px 0", fontSize: "1rem" }}>{persona.bio}</p>
            <div style={{
              margin: "15px 0 7px 0",
              background: "#19191b",
              borderRadius: 7,
              padding: 10
            }}>
              <strong>{persona.scoreLabel}: </strong>
              <span style={{ color: "#bbb" }}>{persona.scoreDesc}</span>
              <div style={{ marginTop: 6 }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", marginRight: 7 }}>{persona.score}%</span>
                <span style={{ color: persona.trend >= 0 ? "#2cf78e" : "#ef476f", fontWeight: 700 }}>
                  {persona.trend >= 0 ? "↑" : "↓"} {Math.abs(persona.trend)}%
                </span>
              </div>
            </div>
            <button className="cta" style={{ width: "100%", marginTop: 12 }}>View / Edit</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

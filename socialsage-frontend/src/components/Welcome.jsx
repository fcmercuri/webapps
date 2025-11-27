import React from "react";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <section style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "3.7rem",
      textAlign: "center"
    }}>
      <div
        style={{
          background: "#222",
          borderRadius: "26px",
          padding: "0.47rem 1.2rem",
          display: "inline-block",
          marginBottom: "2.1rem",
          fontWeight: 700,
          color: "#ffd945",
          fontSize: "1rem",
          letterSpacing: "0.7px"
        }}>
        The AI OS for Social Media Managers
      </div>
      <motion.h1
        className="hero-text"
        style={{
          fontWeight: 900,
          fontSize: "2.1rem",
          color: "#fff",
          marginBottom: "1.5rem",
          lineHeight: 1.13
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        All your social content, planning, personas & competitor insights in one place.
      </motion.h1>
      <p style={{
        color: "#bbbbbb",
        fontSize: "1.10rem",
        maxWidth: 420,
        fontWeight: 400,
        margin: "0 auto 1.3rem"
      }}>
        Save hours every week and grow faster with SocialSage’s Persona Builder, Topic Generator, Content Briefs & Competitor Inbox.
      </p>
      <motion.a
        href="#signup"
        className="hero-btn"
        whileHover={{ scale: 1.06 }}
      >
        Try Free Now
      </motion.a>
    </section>
  );
}

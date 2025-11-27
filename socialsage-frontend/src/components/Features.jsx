import React, { useState } from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Video Generator",
    desc: "Create viral videos automatically with AI.",
    videoSrc: "/demo-ai-video.mp4" // Use your demo video path here
  },
  {
    title: "Persona Builder",
    desc: "Define detailed customer avatars and instantly generate tailored content ideas.",
  },
  {
    title: "Topic Generator",
    desc: "End writer’s block—get custom post topics every day based on your brand goals.",
  },
  {
    title: "Competitor Inbox",
    desc: "Watch your rivals’ posts, engagement, and unlock proven content inspiration.",
  },
];

export function Features() {
  return (
    <section id="features" style={{ margin: "0 auto", marginBottom: 40 }}>
      <div className="card-row">
        {features.map((f, i) => (
          <Feature 
            key={f.title} 
            title={f.title} 
            desc={f.desc} 
            videoSrc={f.videoSrc}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function Feature({ title, desc, videoSrc, index }) {
  const [hovered, setHovered] = useState(false);

  const containerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 62 }
  };

  const staggerDuration = 0.5;

  return (
    <motion.div
      className="feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={containerVariants}
      transition={{ 
        duration: staggerDuration + index * 0.12,
        type: "spring"
      }}
      whileHover={{ scale: 1.06, rotate: -3 }} 
    >
      <motion.h3
        style={{ color: "#ffd945", marginBottom: 12, fontWeight: 800 }}
        initial={{ opacity: 0, y: 20 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h3>
      <motion.p
        style={{ color: "#f1f1f1", fontWeight: 500 }}
        initial={{ opacity: 0, y: 20 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {desc}
      </motion.p>
      {videoSrc && (
        <motion.video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            marginTop: 16,
            borderRadius: 14,
            display: hovered ? "block" : "none",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  );
}

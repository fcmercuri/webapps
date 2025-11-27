import React from "react";

export default function Footer() {
  return (
    <footer style={{
      background: "#0B0B0B",
      color: "#bbb",
      textAlign: "center",
      fontWeight: 500,
      padding: "2rem 0",
      borderTop: "1px solid #232323",
      marginTop: "3rem"
    }}>
      © {new Date().getFullYear()} SocialSage. All rights reserved.
      <div style={{ fontSize: ".95rem", color: "#999", marginTop: 2 }}>
        Empowering AI-powered creators and brands.
      </div>
    </footer>
  );
}

import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <span className="logo">
          <img src="/logo192.png" alt="Logo" />
          SocialSage
        </span>
        <div className="nav-actions">
          <Link to="/pricing">Pricing</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login" className="cta">Login</Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer style={{ background: "#0B0B0B", color: "#888", textAlign: "center", padding: "2rem 0" }}>
        © 2025 SocialSage. All rights reserved.
      </footer>
    </>
  );
}

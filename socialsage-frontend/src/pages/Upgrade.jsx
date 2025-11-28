import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upgrade() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(2); // default Pro
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  async function handleUpgrade(priceId) {
    if (!user.email) {
      localStorage.setItem("upgradePriceId", priceId);
      navigate("/register");
      return;
    }
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, customerEmail: user.email }),
    });
    const { url } = await res.json();
    window.location = url;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0b0b 0%, #05050a 60%, #05060d 100%)",
        color: "#fff",
      }}
    >
      {/* Top nav similar to LandingPage */}
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

      {/* Main content */}
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 20px 80px",
        }}
      >
        <div style={{ maxWidth: 1120, width: "100%" }}>
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 900,
              marginBottom: 32,
            }}
          >
            Upgrade your plan
          </h1>

          <div
            style={{
              background: "#111119",
              borderRadius: 24,
              padding: "32px 32px 40px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              maxWidth: 760,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 24,
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {/* Starter plan */}
              <div
                onClick={() => setSelectedPlan(1)}
                style={{
                  minWidth: 260,
                  maxWidth: 320,
                  padding: "2rem 1.3rem",
                  borderRadius: "1.1rem",
                  background:
                    selectedPlan === 1
                      ? "linear-gradient(120deg, #1a1a28 85%, #2a2a45 100%)"
                      : "linear-gradient(120deg, #191924b7 85%, #232845c7 100%)",
                  border:
                    selectedPlan === 1
                      ? "2px solid #ffd945"
                      : "2px solid transparent",
                  boxShadow:
                    selectedPlan === 1
                      ? "0 8px 40px #ffd94555"
                      : "0 3px 28px #0009",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.25s",
                }}
              >
                <h3
                  style={{
                    color: "#ffd945",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                  }}
                >
                  Starter
                </h3>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    margin: "18px 0 8px",
                    color: "#ffd945",
                  }}
                >
                  $19<span style={{ fontSize: 18, color: "#fff" }}>/mo</span>
                </div>
                <ul
                  style={{
                    color: "#bbb",
                    textAlign: "left",
                    margin: "0 auto 18px auto",
                    maxWidth: 240,
                    paddingLeft: 20,
                    listStyle: "none",
                  }}
                >
                  <li style={{ marginBottom: 10 }}>✓ Up to 5 Personas</li>
                  <li style={{ marginBottom: 10 }}>✓ 50 Content Pieces / Month</li>
                  <li style={{ marginBottom: 10 }}>✓ Advance Analytics</li>
                  <li style={{ marginBottom: 10 }}>✓ Email Support</li>
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpgrade("PRICE_STARTER_ID"); // replace with your Stripe price ID
                  }}
                  style={{
                    width: "100%",
                    background:
                      selectedPlan === 1
                        ? "#ffd945"
                        : "rgba(255, 217, 69, 0.2)",
                    color: selectedPlan === 1 ? "#000" : "#ffd945",
                    fontWeight: 700,
                    padding: "0.9rem 1.5rem",
                    borderRadius: 8,
                    border:
                      selectedPlan === 1 ? "none" : "1px solid #ffd945",
                    cursor: "pointer",
                    fontSize: "1.02rem",
                  }}
                >
                  Get Starter
                </button>
              </div>

              {/* Pro plan */}
              <div
                onClick={() => setSelectedPlan(2)}
                style={{
                  minWidth: 260,
                  maxWidth: 320,
                  padding: "2.3rem 1.3rem",
                  borderRadius: "1.1rem",
                  background:
                    selectedPlan === 2
                      ? "linear-gradient(120deg, #1a1a28 85%, #2a2a45 100%)"
                      : "linear-gradient(120deg, #191924b7 85%, #232845c7 100%)",
                  border:
                    selectedPlan === 2
                      ? "2px solid #ffd945"
                      : "2px solid transparent",
                  boxShadow:
                    selectedPlan === 2
                      ? "0 8px 40px #ffd94555"
                      : "0 3px 28px #0009",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.25s",
                }}
              >
                {selectedPlan === 2 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#ffd945",
                      color: "#000",
                      padding: "4px 16px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    SELECTED
                  </div>
                )}

                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "#ffd945",
                    color: "#000",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  POPULAR
                </div>

                <h3
                  style={{
                    color: "#ffd945",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    marginBottom: "1rem",
                  }}
                >
                  Pro
                </h3>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    margin: "18px 0",
                    color: "#ffd945",
                  }}
                >
                  $49<span style={{ fontSize: 18, color: "#fff" }}>/mo</span>
                </div>
                <ul
                  style={{
                    color: "#bbb",
                    textAlign: "left",
                    margin: "0 auto 18px auto",
                    maxWidth: 240,
                    paddingLeft: 20,
                    listStyle: "none",
                  }}
                >
                  <li style={{ marginBottom: 10 }}>✓ Unlimited Personas</li>
                  <li style={{ marginBottom: 10 }}>✓ Unlimited Content</li>
                  <li style={{ marginBottom: 10 }}>✓ Priority Support</li>
                  <li style={{ marginBottom: 10 }}>✓ API access</li>
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpgrade("PRICE_PRO_ID"); // replace with your Stripe price ID
                  }}
                  style={{
                    width: "100%",
                    background:
                      selectedPlan === 2
                        ? "#ffd945"
                        : "rgba(255, 217, 69, 0.2)",
                    color: selectedPlan === 2 ? "#000" : "#ffd945",
                    fontWeight: 700,
                    padding: "0.9rem 1.5rem",
                    borderRadius: 8,
                    border:
                      selectedPlan === 2 ? "none" : "1px solid #ffd945",
                    cursor: "pointer",
                    fontSize: "1.02rem",
                  }}
                >
                  Get Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

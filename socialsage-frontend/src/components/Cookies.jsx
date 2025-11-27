mport React, { useState, useEffect } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie_notice_dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem("cookie_notice_dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={bannerStyle}>
      <span>
        We use cookies to improve your experience. By using our site, you agree to our{" "}
        <a href="/privacy" style={{ color: "#4af" }}>Privacy Policy</a>.
      </span>
      <button onClick={dismiss} style={buttonStyle}>OK</button>
    </div>
  );
}

const bannerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  background: "#222",
  color: "white",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 9999
};

const buttonStyle = {
  padding: "8px 14px",
  border: "none",
  background: "white",
  cursor: "pointer"
};
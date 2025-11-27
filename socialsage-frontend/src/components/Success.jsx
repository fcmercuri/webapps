import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  // Extract session_id from query params
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("Session ID not found.");
      setLoading(false);
      return;
    }

    // Example: fetch session details from your backend (optional)
    fetch(`/api/stripe-session?sessionId=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch session data.");
        return res.json();
      })
      .then((data) => {
        setSessionData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) return <p>Loading confirmation...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      {/* Display any useful session data here */}
      {sessionData && (
        <>
          <p>Subscription ID: {sessionData.subscriptionId}</p>
          <p>Status: {sessionData.status}</p>
        </>
      )}
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
}

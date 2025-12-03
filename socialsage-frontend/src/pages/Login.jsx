// File: src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Simple Error Boundary to catch runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "red" }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId="865439905014-ne9g11a5cil273h0cgoq1c1nfvahuolk.apps.googleusercontent.com">
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </GoogleOAuthProvider>
);

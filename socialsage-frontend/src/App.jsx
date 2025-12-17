import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Account from "./pages/Account";
import Personas from "./pages/Personas";
import Prompts from "./pages/Prompts";
import Content from "./pages/Content";
import Saved from "./pages/Saved";
import Analytics from "./pages/analytics";
import ForgotPassword from "./pages/ForgotPassword";
import Success from "./pages/Success";
import ResetPasswordRedirect from "./pages/ResetPasswordRedirect";
import ResetPasswordForm from "./pages/ResetPasswordForm";

// NEW
import EmailVerified from "./pages/EmailVerified";
import VerifyEmail from "./pages/VerifyEmail";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { token, user } = useAuth();

  if (!token) return children;

  const email = user?.email;
  const key = email ? `firstLogin:${email}` : null;
  const firstLogin = key ? localStorage.getItem(key) : null;

  if (!firstLogin || firstLogin === "true") {
    return <Navigate to="/welcome" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          <Route path="/success" element={<Success />} />

          {/* NEW public email + reset routes */}
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordRedirect />}
          />

          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/personas"
            element={
              <PrivateRoute>
                <Personas />
              </PrivateRoute>
            }
          />

          <Route
            path="/prompts"
            element={
              <PrivateRoute>
                <Prompts />
              </PrivateRoute>
            }
          />

          <Route
            path="/content"
            element={
              <PrivateRoute>
                <Content />
              </PrivateRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <PrivateRoute>
                <Saved />
              </PrivateRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />

          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

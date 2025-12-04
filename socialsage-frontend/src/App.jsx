import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import Welcome from './pages/Welcome';      // NEW

import Personas from './pages/Personas';
import Prompts from './pages/Prompts';
import Content from './pages/Content';
import Saved from './pages/Saved';
import Upgrade from './pages/Upgrade';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/welcome" element={<Welcome />} />   {/* NEW */}

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
            path="/upgrade"
            element={
              <PrivateRoute>
                <Upgrade />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

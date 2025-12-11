// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const goAfterLogin = () => {
    const firstLogin = localStorage.getItem("firstLogin");

    // First time ever logging in
    if (firstLogin === null) {
      localStorage.setItem("firstLogin", "true");
      return navigate("/welcome", { replace: true });
    }

    // If user has not completed welcome before
    if (firstLogin === "true") {
      return navigate("/welcome", { replace: true });
    }

    // Completed welcome previously
    navigate("/dashboard", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const isJson = response.headers.get('Content-Type')?.includes('application/json');
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        setFormError(data?.error || 'Login failed.');
        setLoading(false);
        return;
      }

      loginSuccess(data.token, data.user);
      goAfterLogin();
    } catch {
      setFormError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('/api/auth/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: tokenResponse.code }),
        });

        const isJson = response.headers.get('Content-Type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (!response.ok) {
          setFormError('Google login failed.');
          return;
        }

        loginSuccess(data.token, data.user);
        goAfterLogin();
      } catch {
        setFormError('Google login failed. Try again.');
      }
    },
    flow: 'auth-code',
  });

  return (
    <div className="login-page">
      <h2>Login</h2>

      {formError && <div className="error-message">{formError}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>

      <button onClick={() => googleLogin()}>Continue with Google</button>

      <p>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
import React, { useState } from 'react';
import { apiPost } from '../api/index';

function PersonaCreator({ token }) {
  const [form, setForm] = useState({
    name: '',
    role: '',
    industry: '',
    goals: '',
    pains: '',
    channels: '',
    tone: '',
    expertise: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdPersona, setCreatedPersona] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreatedPersona(null);

    try {
      // apiPost will prepend BASE_URL and add Authorization header
      const res = await apiPost('/api/personas', form, token);
      if (res.error) {
        setError(res.error);
      } else {
        setCreatedPersona(res);
      }
    } catch (err) {
      setError('Failed to create persona');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Persona</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key]}
            onChange={handleChange}
            required={key === 'name' || key === 'role'}
          />
        ))}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Create'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {createdPersona && (
        <div>
          <h3>Persona Created Successfully</h3>
          <pre>{JSON.stringify(createdPersona, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default PersonaCreator;

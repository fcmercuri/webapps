import React, { useState, useEffect, useContext } from 'react';
import { useAsync } from '../hooks/useAsync';
import { apiPost, apiGet } from '../api/index';
import { AuthContext } from '../context/AuthContext';
import { AppStateContext } from '../context/AppStateContext';

function ContentBrief() {
  const { token } = useContext(AuthContext);
  const { selectedPersona, selectedTopic } = useContext(AppStateContext);
  const [format, setFormat] = useState('blog post');
  const [contentBrief, setContentBrief] = useState(null);

  const { execute, loading, error } = useAsync(async ({ personaId, topicId, format }) => {
    return await apiPost('/api/content-briefs', { personaId, topicId, format }, token);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPersona || !selectedTopic) {
      alert('Please select a persona and topic first.');
      return;
    }
    try {
      const res = await execute({ personaId: selectedPersona._id, topicId: selectedTopic._id, format });
      setContentBrief(res.content);
    } catch {
      // error handled by hook
    }
  };

  return (
    <div>
      <h2>Generate Content Brief</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          placeholder="Format (e.g., blog post)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Brief'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {contentBrief && (
        <div>
          <h3>Content Brief Result</h3>
          <pre>{contentBrief}</pre>
        </div>
      )}
    </div>
  );
}

export default ContentBrief;

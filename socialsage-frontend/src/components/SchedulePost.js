import React, { useState, useContext } from 'react';
import { useAsync } from '../hooks/useAsync';
import { apiPost } from '../api/index';
import { AuthContext } from '../context/AuthContext';
import { AppStateContext } from '../context/AppStateContext';

function SchedulePost() {
  const { token } = useContext(AuthContext);
  const { selectedPersona, selectedTopic } = useContext(AppStateContext);

  const [content, setContent] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [platform, setPlatform] = useState('');

  const { execute, loading, error } = useAsync(async (postData) => {
    return await apiPost('/api/schedule', postData, token);
  });

  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPersona || !selectedTopic) {
      alert('Please select a persona and topic first.');
      return;
    }
    try {
      const postData = {
        personaId: selectedPersona._id,
        topicId: selectedTopic._id,
        content,
        scheduledFor,
        platform,
      };
      await execute(postData);
      setConfirmation('Post scheduled successfully!');
      setContent('');
      setScheduledFor('');
      setPlatform('');
    } catch {
      // error handled by useAsync hook
    }
  };

  return (
    <div>
      <h2>Schedule Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
          required
        />
        <input
          placeholder="Platform (e.g., Twitter)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Scheduling...' : 'Schedule Post'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {confirmation && <p style={{ color: 'green' }}>{confirmation}</p>}
    </div>
  );
}

export default SchedulePost;

import React, { useState, useEffect, useContext } from 'react';
import { useAsync } from '../hooks/useAsync';  // single import only
import { apiPost, apiGet } from '../api/index';
import { AuthContext } from '../context/AuthContext';
import { AppStateContext } from '../context/AppStateContext';

function TopicBuilder() {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [intent, setIntent] = useState('');
  const [seasonality, setSeasonality] = useState('');
  const [topics, setTopics] = useState([]);

  const { execute: fetchTopics, loading: loadingTopics, error: errorTopics } = useAsync(async () => {
    return await apiGet('/api/topics', token);
  });

  const { execute: addTopic, loading: addingTopic, error: errorAddTopic } = useAsync(async (topic) => {
    return await apiPost('/api/topics', topic, token);
  });

  useEffect(() => {
    fetchTopics().then(data => {
      setTopics(data);
    }).catch(() => {
      // error is handled by useAsync's error state
    });
  }, [fetchTopics]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newTopic = { title, category, intent, seasonality };
      const savedTopic = await addTopic(newTopic);
      setTopics([savedTopic, ...topics]);
      setTitle('');
      setCategory('');
      setIntent('');
      setSeasonality('');
    } catch (e) {
      // error handled in errorAddTopic
    }
  };

  return (
    <div>
      <h2>Create Topic</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Intent" value={intent} onChange={e => setIntent(e.target.value)} />
        <input placeholder="Seasonality" value={seasonality} onChange={e => setSeasonality(e.target.value)} />
        <button type="submit" disabled={addingTopic}>{addingTopic ? 'Adding...' : 'Add Topic'}</button>
      </form>

      {errorAddTopic && <p style={{color:'red'}}>{errorAddTopic}</p>}

      <h3>Existing Topics</h3>
      {loadingTopics ? <p>Loading topics...</p> : (
        <ul>
          {topics.map(topic => <li key={topic._id}>{topic.title} - {topic.category}</li>)}
        </ul>
      )}
      {errorTopics && <p style={{color:'red'}}>{errorTopics}</p>}
    </div>
  );
}

export default TopicBuilder;

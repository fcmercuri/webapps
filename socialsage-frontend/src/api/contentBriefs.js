import api from './axios';

export async function generateContentBrief(personaId, topicId, format = 'blog post') {
  const res = await api.post('/content-briefs', { personaId, topicId, format });
  return res.data;
}

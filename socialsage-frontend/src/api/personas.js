import api from './axios';

export async function getPersonas() {
  const res = await api.get('/api/personas');
  return res.data;
}

export async function createPersona(data) {
  const res = await api.post('/api/personas', data);
  return res.data;
}

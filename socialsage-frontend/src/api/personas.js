import api from './axios';

export async function getPersonas() {
  const res = await api.get('/personas');
  return res.data;
}
export async function createPersona(data) {
  const res = await api.post('/personas', data);
  return res.data;
}

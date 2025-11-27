import api from './axios';

export async function register(email, password) {
  const res = await api.post('/auth/register', { email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
}

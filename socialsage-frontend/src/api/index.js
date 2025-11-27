const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    let errorMessage = data?.error || data || 'Unknown error';
    throw new Error(errorMessage);
  }
  return data;
}

export async function apiPost(endpoint, payload, token) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });
  return await handleResponse(res);
}

export async function apiGet(endpoint, token) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return await handleResponse(res);
}

// Optionally, add PUT, DELETE helpers similarly...

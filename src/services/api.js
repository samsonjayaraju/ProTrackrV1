const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const getToken = () => localStorage.getItem('protrackr_token');

async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const authToken = token || getToken();
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.error || data?.message || 'Request failed';
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authService = {
  login: (email, password) => apiRequest('/api/auth/login', { method: 'POST', body: { email, password } }),
  register: (data) => apiRequest('/api/auth/register', { method: 'POST', body: data }),
  me: () => apiRequest('/api/auth/me'),
};

export { API_BASE_URL };

export const projectService = {
  getAll: () => apiRequest('/api/projects'),
  create: (data) => apiRequest('/api/projects', { method: 'POST', body: data }),
};

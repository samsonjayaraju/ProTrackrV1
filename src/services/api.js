import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('protrackr_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('protrackr_token');
      localStorage.removeItem('protrackr_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ Auth Service ============
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// ============ Project Service ============
export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// ============ Milestone Service ============
export const milestoneService = {
  getByProject: (projectId) => api.get(`/milestones/${projectId}`),
  create: (projectId, title) => api.post(`/milestones/${projectId}`, { title }),
  toggle: (id) => api.put(`/milestones/toggle/${id}`),
  delete: (id) => api.delete(`/milestones/${id}`),
};

// ============ Feedback Service ============
export const feedbackService = {
  getByProject: (projectId) => api.get(`/feedback/${projectId}`),
  create: (projectId, text) => api.post(`/feedback/${projectId}`, { text }),
  delete: (id) => api.delete(`/feedback/${id}`),
};

// ============ Review Service ============
export const reviewService = {
  getByProject: (projectId) => api.get(`/reviews/${projectId}`),
  submit: (projectId, data) => api.post(`/reviews/${projectId}`, data),
};

// ============ User Service ============
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  updatePassword: (data) => api.put('/users/password', data),
  getAll: () => api.get('/users/all'),
  getById: (id) => api.get(`/users/${id}`),
};

// ============ Stats Service ============
export const statsService = {
  getStudentStats: () => api.get('/stats/student'),
  getAdminStats: () => api.get('/stats/admin'),
  getReports: () => api.get('/stats/reports'),
};

// ============ Upload Service ============
export const uploadService = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/uploads/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  listProjectMedia: (projectId) => api.get(`/uploads/projects/${projectId}`),
  uploadProjectMedia: (projectId, files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('media', file));
    return api.post(`/uploads/projects/${projectId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteMedia: (mediaId) => api.delete(`/uploads/media/${mediaId}`),
};

export default api;

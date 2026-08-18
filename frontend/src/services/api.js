/**
 * api.js — centralised Axios instance.
 * All frontend API calls must go through this client.
 *
 * - Reads base URL from the VITE_API_URL environment variable.
 * - Automatically attaches the JWT Bearer token to every request.
 * - Handles 401 responses by clearing the token and redirecting to login.
 *
 * Full interceptor logic implemented in Phase 7.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

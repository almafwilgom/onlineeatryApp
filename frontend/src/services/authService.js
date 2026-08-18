// authService.js — implemented in Phase 7
import api from './api';
export const signup = (data) => api.post('/auth/signup', data);
export const login  = (data) => api.post('/auth/login', data);

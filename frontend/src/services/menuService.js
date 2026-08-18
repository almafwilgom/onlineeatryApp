// menuService.js — implemented in Phase 7
import api from './api';
export const getMenu     = (params) => api.get('/menu', { params });
export const getMenuItem = (id)     => api.get(`/menu/${id}`);
export const createItem  = (data)   => api.post('/menu', data);
export const updateItem  = (id, data) => api.put(`/menu/${id}`, data);
export const deleteItem  = (id)     => api.delete(`/menu/${id}`);

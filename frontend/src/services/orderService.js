// orderService.js — implemented in Phase 7
import api from './api';
export const placeOrder    = (data) => api.post('/orders', data);
export const getMyOrders   = ()     => api.get('/orders/my-orders');
export const getAllOrders   = ()     => api.get('/orders');
export const getOrderById  = (id)   => api.get(`/orders/${id}`);
export const updateStatus  = (id, status) => api.patch(`/orders/${id}/status`, { status });

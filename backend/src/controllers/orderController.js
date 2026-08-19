/**
 * orderController.js — HTTP layer for order endpoints.
 */
const orderService = require('../services/orderService');
const { sendSuccess, sendError } = require('../utils/response');

/** POST /api/orders — customer places an order */
const createOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress } = req.body;
    const order = await orderService.createOrder(req.user.id, items, deliveryAddress);
    return sendSuccess(res, 201, 'Order placed successfully.', { order });
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

/** GET /api/orders/my-orders — customer views own orders */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    return sendSuccess(res, 200, 'Orders retrieved.', { count: orders.length, orders });
  } catch (err) {
    next(err);
  }
};

/** GET /api/orders/:id — customer or admin views a single order */
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user.id, req.user.role);
    return sendSuccess(res, 200, 'Order retrieved.', { order });
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

/** GET /api/orders — admin views all orders */
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    return sendSuccess(res, 200, 'All orders retrieved.', { count: orders.length, orders });
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/orders/:id/status — admin updates order status */
const updateStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateStatus(req.params.id, req.body.status);
    return sendSuccess(res, 200, 'Order status updated.', { order });
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

/** GET /api/orders/dashboard — admin metrics */
const getDashboard = async (req, res, next) => {
  try {
    const metrics = await orderService.getDashboardMetrics();
    return sendSuccess(res, 200, 'Dashboard metrics retrieved.', metrics);
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateStatus, getDashboard };

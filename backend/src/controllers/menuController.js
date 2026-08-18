/**
 * menuController.js — HTTP layer for menu endpoints.
 * Delegates all business logic to menuService.
 */
const menuService = require('../services/menuService');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * GET /api/menu
 * Public. Supports query params: search, category, minPrice, maxPrice
 */
const getMenu = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const items = await menuService.getMenu({ search, category, minPrice, maxPrice });
    return sendSuccess(res, 200, 'Menu retrieved.', { count: items.length, items });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/menu/:id
 * Public.
 */
const getMenuItem = async (req, res, next) => {
  try {
    const item = await menuService.getMenuItem(req.params.id);
    return sendSuccess(res, 200, 'Menu item retrieved.', { item });
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

/**
 * POST /api/menu
 * Admin only.
 */
const createItem = async (req, res, next) => {
  try {
    const item = await menuService.createItem(req.body);
    return sendSuccess(res, 201, 'Menu item created.', { item });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/menu/:id
 * Admin only.
 */
const updateItem = async (req, res, next) => {
  try {
    const item = await menuService.updateItem(req.params.id, req.body);
    return sendSuccess(res, 200, 'Menu item updated.', { item });
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

/**
 * DELETE /api/menu/:id
 * Admin only.
 */
const deleteItem = async (req, res, next) => {
  try {
    await menuService.deleteItem(req.params.id);
    return sendSuccess(res, 200, 'Menu item deleted.');
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

module.exports = { getMenu, getMenuItem, createItem, updateItem, deleteItem };

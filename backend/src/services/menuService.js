/**
 * menuService.js — business logic for menu operations.
 *
 * Handles:
 *  - Listing with optional search, category, and price filters
 *  - Single item lookup
 *  - Create, update, delete (admin only — enforced at route level)
 */
const Menu = require('../models/Menu');

/**
 * Get all available menu items with optional filters.
 * @param {object} filters - { search, category, minPrice, maxPrice }
 */
const getMenu = async ({ search, category, minPrice, maxPrice } = {}) => {
  const query = {};

  // Text search on name and description (uses the text index)
  if (search) {
    query.$text = { $search: search };
  }

  // Category filter (case-insensitive exact match)
  if (category) {
    query.category = { $regex: new RegExp(`^${category}$`, 'i') };
  }

  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
    if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
  }

  const items = await Menu.find(query).sort({ createdAt: -1 });
  return items;
};

/**
 * Get a single menu item by ID.
 * @throws {Error} 404 if not found
 */
const getMenuItem = async (id) => {
  const item = await Menu.findById(id);
  if (!item) {
    const err = new Error('Menu item not found.');
    err.statusCode = 404;
    throw err;
  }
  return item;
};

/**
 * Create a new menu item (admin only).
 */
const createItem = async (data) => {
  const item = await Menu.create(data);
  return item;
};

/**
 * Update an existing menu item (admin only).
 * @throws {Error} 404 if not found
 */
const updateItem = async (id, data) => {
  const item = await Menu.findByIdAndUpdate(id, data, {
    new:            true,
    runValidators:  true,
  });
  if (!item) {
    const err = new Error('Menu item not found.');
    err.statusCode = 404;
    throw err;
  }
  return item;
};

/**
 * Delete a menu item (admin only).
 * @throws {Error} 404 if not found
 */
const deleteItem = async (id) => {
  const item = await Menu.findByIdAndDelete(id);
  if (!item) {
    const err = new Error('Menu item not found.');
    err.statusCode = 404;
    throw err;
  }
  return item;
};

module.exports = { getMenu, getMenuItem, createItem, updateItem, deleteItem };

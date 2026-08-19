/**
 * orderValidators.js — express-validator rules for order endpoints.
 */
const { body } = require('express-validator');
const { validate } = require('./authValidators');

// ── Create order ──────────────────────────────────────────────────────────────
const createOrderValidator = [
  body('items')
    .isArray({ min: 1 }).withMessage('Order must include at least one item.'),

  body('items.*.menuItem')
    .notEmpty().withMessage('Each item must include a menuItem ID.')
    .isMongoId().withMessage('Each menuItem must be a valid ID.'),

  body('items.*.quantity')
    .notEmpty().withMessage('Each item must include a quantity.')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer.'),

  body('deliveryAddress')
    .trim()
    .notEmpty().withMessage('Delivery address is required.'),

  validate,
];

// ── Update order status ───────────────────────────────────────────────────────
const updateStatusValidator = [
  body('status')
    .notEmpty().withMessage('Status is required.')
    .isIn(['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'])
    .withMessage('Status must be one of: Pending, Preparing, Out for Delivery, Delivered, Cancelled.'),

  validate,
];

module.exports = { createOrderValidator, updateStatusValidator };

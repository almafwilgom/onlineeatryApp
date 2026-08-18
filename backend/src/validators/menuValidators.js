/**
 * menuValidators.js — express-validator rules for menu endpoints.
 */
const { body, param } = require('express-validator');
const { validate }    = require('./authValidators'); // reuse the shared helper

// ── Create menu item ──────────────────────────────────────────────────────────
const createMenuValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required.'),

  body('price')
    .notEmpty().withMessage('Price is required.')
    .isFloat({ min: 0.01 }).withMessage('Price must be a number greater than zero.'),

  body('category')
    .trim()
    .notEmpty().withMessage('Category is required.'),

  body('imageUrl')
    .optional({ checkFalsy: true })
    .trim()
    .isURL().withMessage('Image URL must be a valid URL.'),

  body('isAvailable')
    .optional()
    .isBoolean().withMessage('isAvailable must be true or false.'),

  validate,
];

// ── Update menu item (all fields optional, but validated if present) ──────────
const updateMenuValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name cannot be empty.'),

  body('description')
    .optional()
    .trim()
    .notEmpty().withMessage('Description cannot be empty.'),

  body('price')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Price must be a number greater than zero.'),

  body('category')
    .optional()
    .trim()
    .notEmpty().withMessage('Category cannot be empty.'),

  body('imageUrl')
    .optional({ checkFalsy: true })
    .trim()
    .isURL().withMessage('Image URL must be a valid URL.'),

  body('isAvailable')
    .optional()
    .isBoolean().withMessage('isAvailable must be true or false.'),

  validate,
];

module.exports = { createMenuValidator, updateMenuValidator };

/**
 * authValidators.js — express-validator rules for authentication endpoints.
 *
 * Used as middleware arrays in routes:
 *   router.post('/signup', signupValidator, authController.signup)
 *
 * The validationResult() check happens inside a shared middleware
 * or directly in the controller.
 */
const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/response');

// ── Reusable helper: run after validator chains ───────────────────────────────
/**
 * Checks for validation errors and sends a 400 if any exist.
 * Must be the LAST item in the middleware array before the controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg).join(', ');
    return sendError(res, 400, messages);
  }
  next();
};

// ── Signup validator ──────────────────────────────────────────────────────────
const signupValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone().withMessage('Please provide a valid phone number.'),

  validate,
];

// ── Login validator ───────────────────────────────────────────────────────────
const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.'),

  validate,
];

module.exports = { signupValidator, loginValidator, validate };

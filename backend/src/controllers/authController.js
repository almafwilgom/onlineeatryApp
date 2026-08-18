/**
 * authController.js — handles HTTP layer for authentication.
 *
 * Keeps controllers thin:
 *  - Extract validated input from req.body
 *  - Call the service
 *  - Send the response
 *  - Pass unexpected errors to next() → errorHandler
 */
const authService        = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * POST /api/auth/signup
 * Public. Creates a new customer account and returns a JWT.
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const { token, user } = await authService.signup({ name, email, password, phone });

    return sendSuccess(res, 201, 'Account created successfully.', { token, user });
  } catch (err) {
    // Known errors (409 duplicate) have statusCode set by the service
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Public. Authenticates a user and returns a JWT.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login({ email, password });

    return sendSuccess(res, 200, 'Login successful.', { token, user });
  } catch (err) {
    if (err.statusCode) return sendError(res, err.statusCode, err.message);
    next(err);
  }
};

module.exports = { signup, login };

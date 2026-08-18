/**
 * auth.js — JWT authentication middleware.
 *
 * Verifies the Bearer token sent in the Authorization header.
 * On success, attaches the decoded payload to req.user:
 *   req.user = { id: '...', role: 'customer' | 'admin' }
 *
 * On failure, sends 401 — never calls next() with an error,
 * so the error handler doesn't need to handle auth failures specially.
 */
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const { sendError }  = require('../utils/response');

const protect = (req, res, next) => {
  // 1. Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];

  // 2. Verify and decode the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    // jwt.verify throws JsonWebTokenError or TokenExpiredError
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Token has expired. Please log in again.');
    }
    return sendError(res, 401, 'Invalid token. Please log in again.');
  }
};

module.exports = { protect };

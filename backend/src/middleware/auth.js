/**
 * auth.js — JWT authentication middleware.
 * Verifies the Bearer token on every protected route.
 * Attaches the decoded user payload to req.user for downstream use.
 *
 * Implementation will be completed in Phase 4.
 */
const { sendError } = require('../utils/response');

const protect = (req, res, next) => {
  // Placeholder — full implementation in Phase 4
  return sendError(res, 501, 'Auth middleware not yet implemented.');
};

module.exports = { protect };

/**
 * admin.js — role-based authorization middleware.
 *
 * MUST be used AFTER the protect middleware, because it reads req.user
 * which protect sets.
 *
 * Usage:
 *   router.post('/menu', protect, adminOnly, menuController.createItem)
 *
 * Returns 403 Forbidden if the authenticated user is not an admin.
 * Returns 401 if called without protect (req.user is undefined).
 */
const { sendError } = require('../utils/response');

const adminOnly = (req, res, next) => {
  if (!req.user) {
    return sendError(res, 401, 'Access denied. Not authenticated.');
  }
  if (req.user.role !== 'admin') {
    return sendError(res, 403, 'Access denied. Admin privileges required.');
  }
  next();
};

module.exports = { adminOnly };

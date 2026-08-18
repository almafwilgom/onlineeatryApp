/**
 * admin.js — role-based authorization middleware.
 * Must be used AFTER the protect middleware.
 * Denies access to any user whose role is not 'admin'.
 *
 * Implementation will be completed in Phase 4.
 */
const { sendError } = require('../utils/response');

const adminOnly = (req, res, next) => {
  // Placeholder — full implementation in Phase 4
  return sendError(res, 501, 'Admin middleware not yet implemented.');
};

module.exports = { adminOnly };

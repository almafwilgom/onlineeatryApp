/**
 * notFound.js — catches any request to an undefined route.
 * Must be registered AFTER all valid routes, BEFORE the errorHandler.
 */
const { sendError } = require('../utils/response');

const notFound = (req, res, next) => {
  return sendError(res, 404, `Route not found: ${req.originalUrl}`);
};

module.exports = notFound;

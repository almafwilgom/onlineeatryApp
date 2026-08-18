/**
 * errorHandler.js — centralized error handling middleware.
 * Must be registered LAST in server.js (after all routes).
 * Catches errors passed via next(error) from any route or middleware.
 */
const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  // Log full error on the server (never sent to client)
  console.error(`[ERROR] ${err.stack || err.message}`);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendError(res, 400, messages.join(', '));
  }

  // Mongoose duplicate key error (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, 400, `An account with that ${field} already exists.`);
  }

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    return sendError(res, 400, 'Invalid ID format.');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'Invalid token. Please log in again.');
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 401, 'Token expired. Please log in again.');
  }

  // Generic server error — use statusCode if set, otherwise 500
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? 'Internal server error.' : err.message;

  return sendError(res, statusCode, message);
};

module.exports = errorHandler;

/**
 * response.js — helper functions for consistent API responses.
 * Every controller uses these instead of writing res.json({}) inline.
 */

/**
 * Send a success response.
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g. 200, 201)
 * @param {string} message - Human-readable success message
 * @param {*} data - The payload to send (object, array, etc.)
 */
const sendSuccess = (res, statusCode, message, data = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response.
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g. 400, 401, 404, 500)
 * @param {string} message - Human-readable error message (safe to show to client)
 */
const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { sendSuccess, sendError };

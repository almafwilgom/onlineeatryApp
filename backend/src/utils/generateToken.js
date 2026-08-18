/**
 * generateToken.js — creates a signed JWT for an authenticated user.
 */
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

/**
 * Generate a JWT containing only the user's id and role.
 * @param {string} id - The user's MongoDB ObjectId
 * @param {string} role - 'customer' or 'admin'
 * @returns {string} Signed JWT string
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = generateToken;

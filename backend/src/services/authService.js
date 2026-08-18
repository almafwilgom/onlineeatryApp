/**
 * authService.js — business logic for authentication.
 *
 * Controllers stay thin by delegating here.
 * This file handles:
 *  - Creating a new user (signup)
 *  - Verifying credentials (login)
 */
const User          = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Register a new customer account.
 * @throws {Error} 409 if email already registered
 */
const signup = async ({ name, email, password, phone }) => {
  // Check for duplicate email before attempting to create
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error('An account with that email already exists.');
    err.statusCode = 409;
    throw err;
  }

  // Role is NOT accepted from the client — always defaults to 'customer'
  const user = await User.create({ name, email, password, phone });

  const token = generateToken(user._id, user.role);

  return { token, user };
};

/**
 * Authenticate an existing user.
 * @throws {Error} 401 if email not found or password incorrect
 */
const login = async ({ email, password }) => {
  // Must use .select('+password') because password has select:false in schema
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id, user.role);

  // Remove password from the user object before returning
  user.password = undefined;

  return { token, user };
};

module.exports = { signup, login };

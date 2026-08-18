/**
 * userController.js — handles profile GET and PUT for authenticated customers.
 *
 * Both endpoints require the protect middleware (JWT verified, req.user set).
 */
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * GET /api/users/profile
 * Authenticated. Returns the current user's profile (no password).
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, 404, 'User not found.');
    return sendSuccess(res, 200, 'Profile retrieved.', { user });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/users/profile
 * Authenticated. Updates name, phone. Email and role changes are NOT allowed here.
 */
const updateProfile = async (req, res, next) => {
  try {
    // Whitelist allowed fields — prevent role or email escalation via this endpoint
    const { name, phone } = req.body;
    const updates = {};
    if (name  !== undefined) updates.name  = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true } // return the updated doc, run schema validators
    );

    if (!user) return sendError(res, 404, 'User not found.');
    return sendSuccess(res, 200, 'Profile updated successfully.', { user });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };

// User.js — Mongoose model (implemented in Phase 4)
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);

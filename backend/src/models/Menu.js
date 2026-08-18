// Menu.js — Mongoose model (implemented in Phase 5)
const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({}, { timestamps: true });
module.exports = mongoose.model('Menu', MenuSchema);

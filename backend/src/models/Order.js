// Order.js — Mongoose model (implemented in Phase 6)
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({}, { timestamps: true });
module.exports = mongoose.model('Order', OrderSchema);

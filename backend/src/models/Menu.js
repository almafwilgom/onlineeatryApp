/**
 * Menu.js — Mongoose schema for the menus collection.
 *
 * Design decisions:
 *  - Category is a plain String (not a hard-coded enum) so admins can
 *    introduce new categories without a code change.
 *  - imageUrl is optional — defaults to a placeholder.
 *  - isAvailable controls whether a menu item can be added to an order.
 *    The order service checks this server-side.
 */
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Menu item name is required.'],
      trim:     true,
    },
    description: {
      type:     String,
      required: [true, 'Description is required.'],
      trim:     true,
    },
    price: {
      type:     Number,
      required: [true, 'Price is required.'],
      min:      [0.01, 'Price must be greater than zero.'],
    },
    category: {
      type:     String,
      required: [true, 'Category is required.'],
      trim:     true,
    },
    imageUrl: {
      type:    String,
      default: '',
      trim:    true,
    },
    isAvailable: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ── Text index for search ─────────────────────────────────────────────────────
// Allows: Menu.find({ $text: { $search: 'jollof' } })
menuSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Menu', menuSchema);

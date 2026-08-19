/**
 * Order.js — Mongoose schema for the orders collection.
 *
 * Design decisions:
 *  - items[].price is snapshotted from the menu at order time.
 *    This means order history is never affected by future price changes.
 *  - totalAmount is calculated server-side in the service, NOT from the client.
 *  - user and menuItem use ObjectId references for relational queries.
 *  - Status starts as 'Pending' and progresses through admin updates only.
 */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Menu',
      required: [true, 'Menu item reference is required.'],
    },
    quantity: {
      type:     Number,
      required: [true, 'Quantity is required.'],
      min:      [1, 'Quantity must be at least 1.'],
    },
    price: {
      type:     Number,
      required: [true, 'Price snapshot is required.'],
      min:      [0, 'Price cannot be negative.'],
    },
  },
  { _id: false } // No separate _id for sub-documents
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'User reference is required.'],
    },
    items: {
      type:     [orderItemSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message:   'Order must contain at least one item.',
      },
    },
    totalAmount: {
      type:     Number,
      required: true,
      min:      [0, 'Total amount cannot be negative.'],
    },
    deliveryAddress: {
      type:     String,
      required: [true, 'Delivery address is required.'],
      trim:     true,
    },
    status: {
      type:    String,
      enum:    ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
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

module.exports = mongoose.model('Order', orderSchema);

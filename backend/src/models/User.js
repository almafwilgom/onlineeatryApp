/**
 * User.js — Mongoose schema for the users collection.
 *
 * Design decisions:
 *  - Password is hashed with bcryptjs BEFORE saving (pre-save hook).
 *  - Password is excluded from query results by default (select: false).
 *  - Role defaults to 'customer'; 'admin' must be set manually/seeded.
 *  - toJSON transform removes __v and password even if accidentally selected.
 */
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required.'],
      trim:     true,
    },
    email: {
      type:      String,
      required:  [true, 'Email is required.'],
      unique:    true,
      lowercase: true,
      trim:      true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email address.',
      ],
    },
    password: {
      type:     String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters.'],
      select:   false, // Never returned in query results by default
    },
    phone: {
      type:    String,
      trim:    true,
      default: null,
    },
    role: {
      type:    String,
      enum:    ['customer', 'admin'],
      default: 'customer',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: {
      // Strip sensitive/internal fields when sending to client
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ── Pre-save hook: hash password before storing ───────────────────────────────
userSchema.pre('save', async function (next) {
  // Only hash if the password field has been modified (or is new)
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Instance method: compare a candidate password against the stored hash ─────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

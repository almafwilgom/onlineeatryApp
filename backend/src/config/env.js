/**
 * env.js — centralises environment variable access.
 * Import this instead of reading process.env directly across the app.
 *
 * Also validates that required variables are present at startup.
 * The app will exit immediately with a clear error if any are missing,
 * rather than failing silently later during a request.
 */
require('dotenv').config();

// ── Required variable check ───────────────────────────────────────────────────
const REQUIRED = ['MONGO_URI', 'JWT_SECRET'];

const missing = REQUIRED.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('   Copy backend/.env.example to backend/.env and fill in your values.');
  process.exit(1);
}

module.exports = {
  PORT:         process.env.PORT || 5000,
  MONGO_URI:    process.env.MONGO_URI,
  JWT_SECRET:   process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL:   process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV:     process.env.NODE_ENV || 'development',
};

/**
 * server.js — application entry point.
 *
 * Responsibilities:
 *  - Load environment variables
 *  - Connect to MongoDB
 *  - Configure Express middleware
 *  - Mount API routes
 *  - Register 404 and error handlers
 *  - Start the HTTP server
 */

require('dotenv').config();
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const morgan  = require('morgan');

const connectDB    = require('./config/db');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/env');

// Route files
const authRoutes  = require('./routes/authRoutes');
const userRoutes  = require('./routes/userRoutes');
const menuRoutes  = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware
const notFound     = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// ── Connect to database ──────────────────────────────────────────────────────
connectDB();

// ── Create Express app ───────────────────────────────────────────────────────
const app = express();

// ── Security middleware ──────────────────────────────────────────────────────
app.use(helmet());

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// ── Logging ──────────────────────────────────────────────────────────────────
if (NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Health check (public, no auth required) ───────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Online Eatery API is running.',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',   authRoutes);
app.use('/api/users',  userRoutes);
app.use('/api/menu',   menuRoutes);
app.use('/api/orders', orderRoutes);

// ── 404 handler — must come after all valid routes ───────────────────────────
app.use(notFound);

// ── Centralized error handler — must come last ────────────────────────────────
app.use(errorHandler);

// ── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});

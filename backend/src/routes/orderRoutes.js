const express = require('express');
const router  = express.Router();

const orderController                       = require('../controllers/orderController');
const { protect }                            = require('../middleware/auth');
const { adminOnly }                          = require('../middleware/admin');
const { createOrderValidator, updateStatusValidator } = require('../validators/orderValidators');

// All order endpoints require authentication
router.use(protect);

// ── Customer routes ───────────────────────────────────────────────────────────
router.post('/',           createOrderValidator, orderController.createOrder);
router.get('/my-orders',   orderController.getMyOrders);

// ── Admin routes ──────────────────────────────────────────────────────────────
router.get('/dashboard',   adminOnly, orderController.getDashboard);
router.get('/',            adminOnly, orderController.getAllOrders);
router.patch('/:id/status', adminOnly, updateStatusValidator, orderController.updateStatus);

// ── Shared route (ownership check inside controller) ──────────────────────────
router.get('/:id',         orderController.getOrderById);

module.exports = router;

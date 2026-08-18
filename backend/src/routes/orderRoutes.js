const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const { protect } = require('../middleware/auth');    // enabled Phase 6
// const { adminOnly } = require('../middleware/admin'); // enabled Phase 6

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', orderController.updateStatus);

module.exports = router;

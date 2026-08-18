const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { protect } = require('../middleware/auth'); // enabled Phase 4

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;

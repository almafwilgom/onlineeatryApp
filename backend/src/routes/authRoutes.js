const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// validators imported in Phase 4
// const { signupValidator, loginValidator } = require('../validators/authValidators');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;

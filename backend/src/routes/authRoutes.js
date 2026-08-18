const express = require('express');
const router  = express.Router();

const authController              = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidators');

// POST /api/auth/signup — public
router.post('/signup', signupValidator, authController.signup);

// POST /api/auth/login — public
router.post('/login', loginValidator, authController.login);

module.exports = router;

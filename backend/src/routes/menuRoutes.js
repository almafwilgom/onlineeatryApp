const express = require('express');
const router  = express.Router();

const menuController                          = require('../controllers/menuController');
const { protect }                             = require('../middleware/auth');
const { adminOnly }                           = require('../middleware/admin');
const { createMenuValidator, updateMenuValidator } = require('../validators/menuValidators');

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/',    menuController.getMenu);      // ?search=&category=&minPrice=&maxPrice=
router.get('/:id', menuController.getMenuItem);

// ── Admin-only routes ─────────────────────────────────────────────────────────
router.post('/',    protect, adminOnly, createMenuValidator, menuController.createItem);
router.put('/:id',  protect, adminOnly, updateMenuValidator, menuController.updateItem);
router.delete('/:id', protect, adminOnly, menuController.deleteItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
// const { protect } = require('../middleware/auth');    // enabled Phase 5
// const { adminOnly } = require('../middleware/admin'); // enabled Phase 5

router.get('/', menuController.getMenu);
router.get('/:id', menuController.getMenuItem);
router.post('/', menuController.createItem);
router.put('/:id', menuController.updateItem);
router.delete('/:id', menuController.deleteItem);

module.exports = router;

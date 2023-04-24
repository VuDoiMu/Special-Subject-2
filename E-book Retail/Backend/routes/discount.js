const express = require('express');
const router = express.Router();
const disController = require('../controllers/discountController');

router.route('/')
    .post(disController.newDiscount)
    .get(disController.getDiscount)
router.route('/:id')
    .put(disController.updateDiscount)
    .delete(disController.deleteDiscount)


module.exports = router;
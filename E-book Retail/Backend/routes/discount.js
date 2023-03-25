const express = require('express');
const router = express.Router();
const disController = require('../controllers/discountController');

router.route('/')
    .post(disController.newDiscount)
    .get(disController.getDiscount)


module.exports = router;
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.route('/')
    .put(cartController.addToCart)
    .delete(cartController.deleteCart)
    .post(cartController.saveToOrder);

router.route('/:id')
    .get(cartController.getCart)

module.exports = router;
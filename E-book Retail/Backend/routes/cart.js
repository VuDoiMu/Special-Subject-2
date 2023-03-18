const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.route('/')
    .put(cartController.addToCart)
    .get(cartController.getCart)
    .delete(cartController.deleteCart)
    .post(cartController.saveToOrder);

// router.route('/:id')
//     .get(bookController.getByID);

module.exports = router;
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.route('/')
    .delete(orderController.deleteOrder)
    .post(orderController.addOrder)
    .get(orderController.getAllOrder);

router.route('/:id')
    .get(orderController.getByID)

module.exports = router;
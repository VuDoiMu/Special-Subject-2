const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.route('/')
    .get(orderController.getAllOrder)
    .put(orderController.updateOrder)
    .post(orderController.addOrder)
    .delete(orderController.deleteOrder);

router.route('/:id')
    .get(orderController.getByID);

module.exports = router;
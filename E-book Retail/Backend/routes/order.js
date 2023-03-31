const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.route('/')
    .get(orderController.getAllOrder)
    .delete(orderController.deleteOrder)
    .post(orderController.addOrder);
    
router.route('/:id')
    .get(orderController.getByID);

module.exports = router;
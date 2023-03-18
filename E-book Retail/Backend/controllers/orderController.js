const Order = require('../models/Order');

const getAllOrder = async (req, res) => {
    const orders = await Order.find();

    if (!orders)
        return res.status(204).json({ 'message': 'No order found!' });

    res.json(orders);
}

const getByID = async (req, res) => {
    if (!req.params.id)
        return res.status(400).json({ 'message': 'Order ID is required1' });

    const order = await Order.findOne({ _id: req.params.id }).exec();

    if (!book) {
        return res.status(204).json({ 'message': `Order with ID ${req.params.id} does not exist!` });
    }

    res.json(order);
}

const deleteOrder = async (req, res) => {
    const order = await Order.deleteMany();
    res.status(200).json(order);
}


module.exports = {
    getAllOrder,
    getByID,
    deleteOrder
}
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
    if (!req.params.id)
        return res.status(400).json({ 'message': 'Order ID is required1' });

    const order = await Order.findOne({ _id: req.params.id }).exec();

    if (!book) {
        return res.status(204).json({ 'message': `Order with ID ${req.params.id} does not exist!` });
    }

    const result = await Order.deleteOne({ _id: req.params.id});
    res.status(200).json(result);
}

const updateOrder = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ 'message': `Order ID is required!`});
    }

    const order = await Order.findOne({ _id: req.body.id});

    if(!order) {
        return res.status(204).json({ 'message': `Order with ID ${req.body.id} does not exist!`});
    }

    const updateData = req.body;

    const orderUpdated = await Order.findOneAndUpdate({ _id: req.body.id}, updateData, {
        new: true
    });

    res.status(200).json(orderUpdated);
}

const addOrder = async (req, res) => {
    const newOrder = req.body;

    try {
        const result = await Order.create({
            cart: newOrder.cart,
            custormerID: newOrder.custormerID,
            isPaid: newOrder.isPaid      
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllOrder,
    getByID,
    deleteOrder,
    updateOrder,
    addOrder
}
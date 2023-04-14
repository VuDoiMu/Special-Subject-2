const Order = require('../models/Order');

const getAllOrder = async (req, res) => {
    const orders = await Order.find();

    if (!orders)
        return res.status(204).json({ 'message': 'No order found!' });

    res.json(orders);
}

const getByID = async (req, res) => {
    const userId = req.params.id;
    const order = await Order.find({ userId }).populate('items.product').exec();

    if (!order) {
        return res.status(204).json({ 'message': `Order with ID ${order._id} does not exist!` });
    }
    res.json(order);
}

const deleteOrder = async (req, res) => {
    const order = await Order.deleteMany();
    res.status(200).json(order);
}

const addOrder = async (req, res) => {
    const {userId, items, finalTotal} = req.body
    const order = new Order( {
        userId:  userId,
        items: items,
        finalTotal: finalTotal
    })
    await order.save();
}


module.exports = {
    getAllOrder,
    getByID,
    deleteOrder,
    addOrder
}
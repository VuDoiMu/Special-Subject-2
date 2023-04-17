const express = require("express");
const app = express();
const Cart =  require('../models/Cart');
const Book = require('../models/Book')
const Order = require('../models/Order')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const addToCart = async (req, res ) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    const {book, quantity} = req.body;
    const b = await Book.findById(book);
    const price = b.price;
    const total = price * quantity;
    const cart = await Cart.findOne({userId: userId})
    const final = cart.finalTotal;
   
    const finalTotal = final +total 
    try{
        let newCart = {
             $push: {items: [{
                product:book,
                quantity: quantity,
                price : price,
                total: total
        }]},
            finalTotal: finalTotal
        }
        const updateCart = await Cart.findOneAndUpdate({userId: userId}, newCart, {new:  true})
        
        res.json({success : true,message:"new", updateCart})
    
    }catch(error){
        res.json(error)
    }
}
const getCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await Cart.findOne({ userId: userId });
        res.json({ success: true, cart });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
}

const saveToOrder = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    const cart = JSON.parse(req.cookies.cart)
    const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.newPrice), 0);
  
    try {
       let items =  [] 
       let inventory = []
      cart.forEach(element => {
        items.push({
          product: element.id,
          quantity: 1,
          price: parseFloat(element.newPrice),
          total: parseFloat(element.newPrice)
        })
        inventory.push(element.id)
      });
      const order = new Order({
        userId: userId,
        items: items,
        finalTotal: totalPrice
      })
      await order.save();
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { inventory:inventory } },
        { new: "true" }
      );
      res.json({ success: true, message: 'checkout', order })
      

    } catch (error) {
      console.error(error);
    }
  }
  
const deleteCart = async(req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    const updateCart = await Cart.findOneAndDelete({userId: userId})
    
}
module.exports = {
   addToCart,
   getCart,
   saveToOrder,
    deleteCart
};
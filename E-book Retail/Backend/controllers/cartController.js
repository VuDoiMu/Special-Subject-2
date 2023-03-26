const express = require("express");
const app = express();
const Cart =  require('../models/Cart');
const Book = require('../models/Book')
const Order = require('../models/Order')
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
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    const cart = await Cart.findOne({userId: userId})
    // const cart = await Cart.find();
    res.json({success : true, cart })
}
const saveToOrder = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    try{
    const cart = await Cart.findOne({userId: userId})
    const order = new Order( {
        userId:  cart.userId,
        items: cart.items,
        finalTotal: cart.finalTotal
    })
    await order.save();
    
    Cart.findById(cart._id)
    .populate('items.product', 'id')
    .then((cart) => {
      const bookSells = cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
  
      bookSells.forEach((item) => {
        Book.updateOne({ _id: item.productId }, { $inc: { countSale : item.quantity }  })
          .then(() => {
            console.log(`Updated quantity for product ${item.productId}`);
          })
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => console.log(error));

    
    const deleteCart = await Cart.deleteOne({userId: userId})
    const newcart = new Cart({userId : userId, finalTotal: 0})
    await newcart.save();
    res.json({success: true, message:'checkout', newcart})
      
    }catch(error){
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
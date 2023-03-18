const express = require("express");
const app = express();
const User = require ("../models/User")
const Cart = require( "../models/Cart")
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const register = async (req, res) => {
    const { email, password} = req.body;
    
    if(!email || !password )
    return res.status(400).json({success: false, message:"Missing data "})
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status.json(`${email} is not a valid email address`);
    }
   try{
    const emailValid = await User.findOne({email});
    if( emailValid)
    return res.json( { 'message': 'this email is already used!'});
    const hashPassword = await argon2.hash(password)
    const newUser = new User({email, password: hashPassword});
    await newUser.save();

        // const accesstoken = jwt.sign({userId: newUser._id, role: newUser.role},"thisisourwebsite!")

         res.json({success: true, message:'user created', newUser})

 } catch(error){
    console.error(error);
 }
}
const login = async (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password)
    return res.status(400).json({success: false, message:"Missing data "})
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) 
    return res.status.json(`${email} is not a valid email address`)
    try {
        const user = await User.findOne({email})
        const userId = user._id;
        if (!user){
            return res.status(400).json({success: false, message:"Wrong email "})
        }

        const passwordValid = await argon2.verify(user.password, password )
        
        if (!passwordValid)
        return res.status(400).json({success: false, message:" Wrong password"});
        const cartValid = await Cart.findOne({userId})
        console.log(cartValid)
        if(!cartValid){
        const cart = new Cart({userId})
        await cart.save();
        }
        const accesstoken = jwt.sign({userId: user._id, role: user.role},"thisisourwebsite!")
        res.cookie('token', accesstoken);
        res.json({success: true, message:'user login', accesstoken})
      
    } catch (error) {
        console.error(error);
    }
}
const deleteUser = async(req, res) => {
    const deleteUser = await User.deleteMany();
    res.json(deleteUser)
}
const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({success: true, message:'user logout'})
}
const access = async (req, res) => {
    
    if (req.user.role === 'admin') {
        res.redirect('/admin');
      } else if (req.user.role === 'customer') {
        res.redirect('/customer');
      } else {
        res.status(403).send('Forbidden');
} 
}
module.exports = {register, login, logout, access, deleteUser};

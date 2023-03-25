const express = require("express");
const app = express();
const User = require ("../models/User")
const Cart = require( "../models/Cart")
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const mailer = require('../utils/mailer')

app.use(cookieParser());

const register = async (req, res) => {
    const { email,username, password} = req.body;
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
    const newUser = new User({email, password: hashPassword, username});
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
    return res.json(`${email} is not a valid email address`)
    try {
      console.log(email)
        const user = await User.findOne({email})
        console.log(user)
        const userId = user._id;
        if (!user){
            return res.status(400).json({success: false, message:"Wrong email "})
        }

        const passwordValid = await argon2.verify(user.password, password )
        
        if (!passwordValid)
        return res.status(400).json({success: false, message:" Wrong password"});
        const cartValid = await Cart.findOne({userId})
        
        if(!cartValid){
        const cart = new Cart({userId, finalTotal: 0})
        await cart.save();
        }
        const accesstoken = jwt.sign({userId: user._id, role: user.role},"thisisourwebsite!")
        res.cookie('token', accesstoken);
        res.json({success: true, message:'user login', accesstoken})
      
    } catch (error) {
        console.error(error);
    }
}
const updateInfo = async (req, res) => {
  const {username, dateOfBirth, userPhone, address} = req.body;
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "thisisourwebsite!");
  const userId = decoded.userId;
  try{
    let updateUser = {
      username, dateOfBirth, userPhone, address
    }
    const userUpdateCondition = {_id : userId}
    
    updateUser = await User.findOneAndUpdate(userUpdateCondition, updateUser, {new:  true})

    if(!updateUser)
    return res.status(401).json({success: false, message:"not know what ưởng"});

    res.json({success : true,message:"new", updateUser})
}catch(error){
console.log(error)
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

let sendMail = async (req, res) => {
  try {

    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    const newPassword = "newpassword"
    const hashPassword = await argon2.hash(newPassword)
    const newUser = await User.findOneAndUpdate({_id : userId}, {password: hashPassword},{new: true})
    const text = "You requested for reset password, kindly use this "+ newUser.password + " to reset your password"
    // Lấy data truyền lên từ form phía client
    const { to, subject } = req.body

    // Thực hiện gửi email
    await mailer.sendMail(to, subject, text)
   
    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
    res.json({success : true, message:"sent it"})
  } catch (error) {
    // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
    res.json({success : false, message:"wrogn"})
  }
}

module.exports = {register, login, logout, access, deleteUser, sendMail, updateInfo};

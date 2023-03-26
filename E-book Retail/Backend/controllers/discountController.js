const express = require("express");
const app = express();
const Cart =  require('../models/Cart');
const Book = require('../models/Book')
const Tag = require('../models/Tag')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
const Discount = require("../models/Discount");
app.use(cookieParser());

const newDiscount = async(req, res) => {
    try{
    const {name, discountRate} = req.body
    const disValid = await Discount.findOne({name});
    if( disValid)
    return res.json( { 'message': 'this discount is already used!'});
    const discount = new Discount({name, discountRate})
    await discount.save();
    res.json({success: true, message:'new discount', discount})
      
    }catch(error) {
        console.log(error)
    }
}

const getDiscount = async (req, res) => {
    
    try{
        const discounts = await Discount.find();
        res.json({success: true, message:'new discout', discounts})
      
    }catch(error) {
        console.log(error)
    }
}

module.exports = {
newDiscount,
getDiscount
}
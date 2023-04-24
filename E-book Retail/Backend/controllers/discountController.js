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
        res.json({success: true, message:' discout', discounts})
      
    }catch(error) {
        console.log(error)
    }
}
const updateDiscount = async(req, res) => {
    const tagId = req.params.id;
        const {name, discountRate, discountItem} = req.body
    try {
        const discountValid = await Discount.findById(tagId);
        if( !discountValid)
        return res.json( { 'message': 'This Discount is not exist!'});
        
        const discount = await Discount.findByIdAndUpdate({_id: tagId},{ name, description, discountItem}, {new: 'true'} )
        res.json({success: true, message:'updated tag', discount})
          
    }catch(error) {
        console.log(error)
    }
}
const deleteDiscount = async ( req, res) => {
    const id = req.params.id;
try {
    const discountValid = await Discount.findById(id);
    if( !discountValid)
    return res.json( { 'message': 'This Dsicount is not exist!'});

    const discount = await Discount.findByIdAndDelete({_id: id})
    res.json({success: true, message:'deleted tag', discount})
}catch(error) {
    console.log(error)
}
}

module.exports = {
newDiscount,
getDiscount,
updateDiscount,
deleteDiscount
}
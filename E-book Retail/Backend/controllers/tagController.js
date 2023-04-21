const express = require("express");
const app = express();
const Cart =  require('../models/Cart');
const Book = require('../models/Book')
const Tag = require('../models/Tag')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const newTag = async(req, res) => {
    try{
    const {name, description} = req.body
    const tagValid = await Tag.findOne({name});
    if( tagValid)
    return res.json( { 'message': 'This Tag is already used!'});
    const tag = new Tag({name, description})
    await tag.save();
    res.json({success: true, message:'new tag', tag})
      
    }catch(error) {
        console.log(error)
    }
}
const updateTag = async(req, res) => {
    const tagId = req.params.id;
        const {name, description} = req.body
    try {
        const tagValid = await Tag.findById(tagId);
        if( !tagValid)
        return res.json( { 'message': 'This Tag is not exist!'});
        
        const tag = await Tag.findByIdAndUpdate({_id: tagId},{ name, description}, {new: 'true'} )
        res.json({success: true, message:'updated tag', tag})
          
    }catch(error) {
        console.log(error)
    }
}

const getTag = async (req, res) => {
    
    try{
        const tags = await Tag.find();
        res.json({success: true, message:'new tag', tags})
      
    }catch(error) {
        console.log(error)
    }
}
const getByTag = async (req, res)=> {
    const tag = req.params.name;
    try{

    const books = await Tag.find({name: tag}).populate('books');
    
    res.json( {success : true,books })

    }catch(error){

    res.json({success : false, message:"wrogn"})
    }
}
const deleteTag = async ( req, res) => {
    const tagId = req.params.id;
try {
    const tagValid = await Tag.findById(tagId);
    if( !tagValid)
    return res.json( { 'message': 'This Tag is not exist!'});

    const tag = await Tag.findByIdAndDelete({_id: tagId})
    res.json({success: true, message:'deleted tag', tag})
      
}catch(error) {
    console.log(error)
}
}
const deleteBooksArray = async(req, res) => {
    try {
    const tag = await Tag.updateMany(
        {}, 
        { $set: { books: [] } } 
      );
      res.json({success: true, message:'deleted tag', tag})
      
    }catch(error) {
        console.log(error)
    }
      
}


module.exports = {
newTag,
getTag,
getByTag,
updateTag,
deleteTag,
deleteBooksArray
}
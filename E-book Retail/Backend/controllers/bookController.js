const express = require("express");
const app = express();
const Book = require('../models/Book.js');
const User = require('../models/User')
const Tag = require('../models/Tag');
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const getAllBook = async (req, res) => {
    const books = await Book.find();

    if (!books) 
        return res.status(204).json({ 'message': 'No book found!'});

    res.json(books);

}

const getByID = async (req, res) => {
    if (!req.params.id){
         return res.status(400).json({ 'message': 'Book ID required!'});
        }

    const book = await Book.findOne({ _id: req.params.id }).exec();

    if (!book){ 
        return res.status(204).json({ 'message': `Book does not exist with ${req.body.id}!`});
        }       
    
    res.json(book);   
}

const deleteBook = async(req, res) => {
    if (!req.params.id){
        return res.status(400).json({ 'message': 'Book ID required!'});
       }

   const book = await Book.findOne({ _id: req.params.id }).exec();

   if (!book){ 
       return res.status(204).json({ 'message': `User does not exist with ${req.params.id}!`});
       }       
   
    const result  = await User.deleteOne({ _id: req.params.id});
    res.status(200).json(result);
// const delte = await Book.deleteMany()
}

const updateBook = async (req, res) => {
    if (!req.body.id){
        return res.status(400).json({ 'message': 'Book ID required!'});
       }

   const book = await Book.findOne({ _id: req.body.id }).exec();

   if (!book){ 
       return res.status(204).json({ 'message': `User does not exist with ${req.body.id}!`});
       }      
       
    const updateData = req.body;

    const bookUpdated = await Book.findOneAndUpdate( {_id: req.body.id}, updateData, {
        new: true
    });

    res.status(200).json(bookUpdated);
}

const addBook = async (req, res) => {
    const newBook = req.body;
    const book = await  Book.findOne({ name: newBook.name}).exec();

    if (book != null) {
        return res.status(409).json({ 'message': 'A book with this name is already exist!'});
    }

    try {
        const result = await Book.create({
            name: newBook.name,
            image: newBook.image,
            price: newBook.price,
            description: newBook.description,
            tag: newBook.tag,
            author: newBook.author,
            artist: newBook.artist,
            publisher: newBook.publisher,
            pageCount: newBook.pageCount,
            saleRate: newBook.saleRate,
            content: newBook.content
        });
        const updateResult = await Tag.updateMany({ name: { $in: newBook.tag } }, { $push: { books: result._id } });
  
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}
const addLike = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userId = decoded.userId;
    const bookId = req.params.id;
    
    try{
    
    const updateBook = await Book.findOneAndUpdate({ _id: bookId }, { $inc: { countLike: 1 } });
    
    const updateUser = await User.findOneAndUpdate({ _id: userId }, { $push: { favorbooks: bookId } },{new: "true"});
   
    res.json({success : true, updateBook})
}catch(error){
    res.json(error)
}
}


//pagination
const bookPage = async (req, res) => {
    var aggregateQuery =Book.aggregate();
    const page = req.params.page;
  Book.aggregatePaginate(aggregateQuery, { page: page, limit: 10 }, function(
    err,
    result
  ) {
    if (err) {
      console.err(err);
    } else {
      res.json(result);
    }
  });
}


module.exports = {
    getAllBook,
    getByID,
    deleteBook,
    updateBook,
    addBook,
<<<<<<< HEAD
    bookPage
=======
    bookPage,
    addLike

>>>>>>> d40f8db43b8ff9067503db21e68d5c8d2af8d806
};
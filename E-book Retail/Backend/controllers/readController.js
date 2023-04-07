const Book = require('../models/Book.js');

const readBook = async (req, res) => {
    const bookID = req.body._id;

    if (!req.body._id){
        return res.status(400).json({ 'message': 'Book ID required!'});
       }

   const book = await Book.findOne({ _id: req.body._id }).exec();

       res.status(200).json(book);
} 

module.exports = {
    readBook
}
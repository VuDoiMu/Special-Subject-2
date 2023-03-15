const Book = require('../models/Book.js');


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
            cover: newBook.cover,
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

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllBook,
    getByID,
    deleteBook,
    updateBook,
    addBook
};
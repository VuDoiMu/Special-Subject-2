const Book = require('../models/Book.js');
const Tag = require('../models/Tag');


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
// try {
//         // We destructure the req.query object to get the page and limit variables from url 
//         const { page } = req.params.page;
//         const limit = 10
//         const books = await Book.find()
//             // We multiply the "limit" variables by one just to make sure we pass a number and not a string
//             .limit(limit * 1)
//             // I don't think i need to explain the math here
//             .skip((page - 1) * limit)
//             // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
//             .sort({ createdAt: -1 })

//         // Getting the numbers of products stored in database
//         const count = await Book.countDocuments();

//         return res.status(200).json({
//             books
//             ,totalPages: Math.ceil(count / limit),
//             currentPage: page,
//         });
//     } catch (err) {
//         next(err);
//     }
// };

module.exports = {
    getAllBook,
    getByID,
    deleteBook,
    updateBook,
    addBook,
    bookPage
};
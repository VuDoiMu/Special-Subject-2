const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/')
    .get(bookController.getAllBook)
    .put(bookController.updateBook)
    .post(bookController.addBook)
<<<<<<< HEAD
=======
    .delete(bookController.deleteBook);
>>>>>>> aee886f3c78034b8315a0eac8c6ea0dbb949e15e

router.route('/:id')
    .get(bookController.getByID)
    .delete(bookController.deleteBook);


router.route('/like/:id')
    .put(bookController.addLike);

router.route('/pages/:page')
.get(bookController.bookPage);

module.exports = router;
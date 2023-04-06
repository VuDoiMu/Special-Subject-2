const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController')
router.route('/')
    .get(bookController.getAllBook)
    .put(bookController.updateBook)
    .post(bookController.addBook)
    .delete(bookController.deleteBook);

router.route('/:id')
    .get(bookController.getByID)
    .delete(bookController.deleteBook)
    .post(reviewController.reviewing);

router.route('/addlike/:id')
    .put(bookController.addLike);
router.route('/sublike/:id')
    .put(bookController.subLike);

// router.route('/pages/:page')
// .get(bookController.bookPage);

module.exports = router;
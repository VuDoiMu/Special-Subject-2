const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/')
    .get(bookController.getAllBook)
    .put(bookController.updateBook)
    .post(bookController.addBook)

router.route('/:id')
    .get(bookController.getByID)
    .delete(bookController.deleteBook);


router.route('/like/:id')
    .put(bookController.addLike);

router.route('/topsell')
    .get(bookController.topSell);

router.route('/toplike')
    .get(bookController.topLike);

router.route('/pages/:page')
.get(bookController.bookPage);

module.exports = router;
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/')
    .get(bookController.getAllBook)
    .put(bookController.updateBook)
    .post(bookController.addBook)
    .delete(bookController.deleteBook);
router.route('/add')
    .put(bookController.addLike);

router.route('/:id')
    .get(bookController.getByID);

router.route('/tag/:id')
    .get(bookController.getByCate);

router.route('/pages/:page')
.get(bookController.bookPage);

module.exports = router;
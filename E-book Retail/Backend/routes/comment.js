const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/:bookId')
    .get(commentController.getBookComments)
    .post(commentController.addComment);

router.route('/:bookId/:commentId')
    .put(commentController.editComment)
    .delete(commentController.deleteComment);

module.exports = router;

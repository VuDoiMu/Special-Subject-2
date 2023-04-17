const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.route('/')
    .post(tagController.newTag)
    .get(tagController.getTag)

router.route('/:id')
    .put(tagController.updateTag)
    .delete(tagController.deleteTag)

router.route('/books/:name')
    .get(tagController.getByTag);

module.exports = router;
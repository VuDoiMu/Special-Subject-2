const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
router.route('/')
    .post(tagController.newTag)
    .get(tagController.getTag)
    .delete(tagController.deleteBooksArray)

router.route('/:id')
    .put(tagController.updateTag)
    .delete(tagController.deleteTag)
router.route('/get/:name')
    .get(tagController.getEachTag)
router.route('/books/:name')
    .get(tagController.getByTag);

module.exports = router;
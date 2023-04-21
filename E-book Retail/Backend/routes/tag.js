const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
console.log(tagController);
router.route('/')
    .post(tagController.newTag)
    .get(tagController.getAllTag)

router.route('/:id')
    .put(tagController.updateTag)
    .delete(tagController.deleteTag)
router.route('/get/:name')
    .get(tagController.getTag)
router.route('/books/:name')
    .get(tagController.getByTag);

module.exports = router;
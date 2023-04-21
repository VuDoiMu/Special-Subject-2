const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
console.log(tagController);
router.route('/')
    .post(tagController.newTag)
<<<<<<< HEAD
    .get(tagController.getAllTag)
=======
    .get(tagController.getTag)
    .delete(tagController.deleteBooksArray)
>>>>>>> 8d26da40223865189e15be3e69890b3bfea5d76b

router.route('/:id')
    .put(tagController.updateTag)
    .delete(tagController.deleteTag)
router.route('/get/:name')
    .get(tagController.getTag)
router.route('/books/:name')
    .get(tagController.getByTag);

module.exports = router;
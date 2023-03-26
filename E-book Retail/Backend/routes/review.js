const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.route('/')
.get(reviewController.getReview)
.put(reviewController.updateReview)
.delete(reviewController.deleteReview)
 

module.exports = router;
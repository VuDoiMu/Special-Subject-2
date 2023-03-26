const express = require('express');
const router = express.Router();
const cataController = require('../controllers/catalogController');
const reviewController = require('../controllers/reviewController')
const { route } = require('./books');


router.route('/topsell')
    .get(cataController.topSell);

router.route('/toplike')
    .get(cataController.topLike);

 router.route('/topsale')
    .get(cataController.topSale);

router.route('/search/:name')
    .get(cataController.searchByName);

route.route('/review')
    .get(reviewController.getReview)
    module.exports = router;
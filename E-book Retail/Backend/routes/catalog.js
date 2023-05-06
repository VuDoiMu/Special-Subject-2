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
    
 router.route('/priceAsc')
 .get(cataController.priceAsc);
 
 router.route('/priceDesc')
    .get(cataController.priceDesc);
    
 router.route('/nameSort')
 .get(cataController.nameSort);
  
 router.route('/dateSort')
 .get(cataController.dateSort);

router.route('/search/:name')
    .get(cataController.searchByName);

router.route('/search/author/:name')
    .get(cataController.searchBookByAuthor);

router.route('/review')
    .get(reviewController.getReview);

router.route('/orderToday')
    .get(cataController.today);

router.route('/orderYesterday')
    .get(cataController.getYesterday);
    
router.route('/orderWeek')
    .get(cataController.getLastWeek);

router.route('/orderMonth')
    .get(cataController.getLastMonth);
    
router.route('/order')
    .get(cataController.divideOrdersByTime);

module.exports = router;
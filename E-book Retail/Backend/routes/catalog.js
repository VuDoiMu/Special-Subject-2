const express = require('express');
const router = express.Router();
const cataController = require('../controllers/catalogController');


router.route('/topsell')
    .get(cataController.topSell);

router.route('/toplike')
    .get(cataController.topLike);
    
    module.exports = router;
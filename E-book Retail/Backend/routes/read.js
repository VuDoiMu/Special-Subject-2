const express = require('express');
const router = express.Router();
const readController = require('../controllers/readController');

router.route('/')
.get(readController.readBook)
 

module.exports = router;
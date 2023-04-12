const express = require('express');
const router = express.Router();
const readController = require('../controllers/readController');
const readAuth = require("../middleware/readAuth");

router.route('/')
.get(readAuth.readAuth, readController.readBook)
 

module.exports = router;
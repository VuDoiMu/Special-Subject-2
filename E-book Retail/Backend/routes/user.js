const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route("/register").post(userController.register);
router.route("/updateInfo").put(userController.updateInfo);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
router.route("/deleteAll").delete(userController.deleteUser);
router.route("/dashboard").get(userController.access);
router.route('/sendmail').post(userController.sendMail);

module.exports = router;

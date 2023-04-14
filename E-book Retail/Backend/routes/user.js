const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/register").post(userController.register);
router.route("/updateInfo").put(userController.updateInfo);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
router.route("/deleteAll").delete(userController.deleteUser);
router.route("/getUser").get(userController.getUserInfor);
router.route("/sendmail").post(userController.sendMail);
router.route("/getAllUser").get(userController.getAllUser);
router.route("/profile").get(userController.userProfile);

module.exports = router;

const express = require("express");
const userController = require("../Controllers/userController.js");
const profileController = require("../Controllers/profileController.js");
const addFundController=require("../Controllers/addFundController.js")
const transferFundController=require("../Controllers/transferFundController.js")


const { authenticateUser } = require("../Middlewares/authenticate");

const router = express.Router();

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);
router.get("/api/user/account", authenticateUser, userController.account);
router.delete("/api/user/logout", authenticateUser, userController.logout,);
router.delete("/api/user/delete", authenticateUser, userController.delete);
router.post("/api/user/send-email",  userController.sms);

router.post("/api/profile/create",authenticateUser, profileController.create);
router.put("/api/profile/update/:id", authenticateUser, profileController.update);
router.get("/api/profile/list", authenticateUser, profileController.list);
router.delete("/api/profile/delete/:id", authenticateUser,profileController.delete);


router.get("/api/user/addFund", authenticateUser,  addFundController.list);
router.post("/api/user/addFund", authenticateUser,  addFundController.create);


router.get("/api/user/transferFund", authenticateUser,transferFundController.list);
router.post("/api/user/transferFund", authenticateUser,  transferFundController.create);




module.exports = router;

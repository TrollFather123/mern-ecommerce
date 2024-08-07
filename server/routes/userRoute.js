const userController = require("../controllers/userController")
const express = require("express");
const { authToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/signup",userController.signup)
router.post("/login",userController.login);
router.get("/user-details",authToken,userController.userDetails);
router.get("/all-users",authToken,userController.getAllUsers);
router.put("/update-user-role/:id",authToken,userController.updateUserRole);
router.post("/password-change-link-sent",userController.userPasswordResetEmailLinkSent);
router.put("/change-password/:id",userController.changePassword);



module.exports = router
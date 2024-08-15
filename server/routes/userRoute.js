const userController = require("../controllers/userController")
const express = require("express");
const { authToken } = require("../middlewares/authToken");
const upload = require("../config/multerConfig")

const router = express.Router();




router.post("/signup",upload.single("profilePic"),userController.signup);
router.post("/verify-otp",userController.verifyOTP);
router.post("/resend-otp",userController.resendOTP);
router.post("/login",userController.login);
router.get("/user-details",authToken,userController.userDetails);
router.get("/all-users",authToken,userController.getAllUsers);
router.put("/update-user-role/:id",authToken,userController.updateUserRole);
router.post("/password-change-link-sent",userController.userPasswordResetEmailLinkSent);
router.put("/change-password/:id",userController.changePassword);



module.exports = router
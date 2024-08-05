const userController = require("../controllers/userController")
const express = require("express");
const { authToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/signup",userController.signup)
router.post("/login",userController.login);
router.get("/user-details",authToken,userController.userDetails)



module.exports = router
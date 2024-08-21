const paymentController = require("../controllers/paymentController");
const express = require("express");



const router = express.Router();

router.post("/payment", paymentController.makePayment);
router.get("/payment/:paymentID", paymentController.getPayment);


module.exports = router;

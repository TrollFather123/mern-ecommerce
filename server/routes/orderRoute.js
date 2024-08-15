const orderController = require("../controllers/orderController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");


const router = express.Router();

router.post("/orders", authToken,orderController.createOrder);
router.get("/orders", authToken,orderController.getOrders);


module.exports = router;

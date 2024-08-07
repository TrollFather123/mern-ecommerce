const productController = require("../controllers/productController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/products", authToken, productController.uploadProducts);
router.get("/products", authToken, productController.getAllProducts);

module.exports = router;

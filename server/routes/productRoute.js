const productController = require("../controllers/productController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/products", authToken, productController.uploadProducts);
router.get("/products", authToken, productController.getAllProducts);
router.get("/products/:id", authToken, productController.getSingleProduct);
router.put("/products/:id", authToken, productController.updateProduct);

module.exports = router;

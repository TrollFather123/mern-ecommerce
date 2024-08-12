const productController = require("../controllers/productController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");
const upload = require("../config/multerConfig")

const router = express.Router();

router.post("/products", authToken, upload.array("productImages", 10),productController.uploadProducts);
router.get("/products", authToken, productController.getAllProducts);
router.get("/products/:id", authToken, productController.getSingleProduct);
router.put("/products/:id", authToken,upload.array("productImages", 10), productController.updateProduct);
router.get("/single-category-product",productController.getCategoryProducts);

module.exports = router;

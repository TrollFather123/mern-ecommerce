const productController = require("../controllers/productController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");
const upload = require("../config/multerConfig")

const router = express.Router();

router.post("/products", authToken, upload.array("productImages", 10),productController.uploadProducts);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", authToken, productController.getSingleProduct);
router.put("/products/:id", authToken,upload.array("productImages", 10), productController.updateProduct);
router.put("/delete-product-image",productController.deleteImage),
router.get("/single-category-product",productController.getCategoryProducts);
router.get("/product-details/:product_id",productController.getProductDetails);
router.get("/product-stats",productController.getProductStats);
router.get("/get-categories",productController.getCategories)
router.get("/get-product-by-category",productController.getProductByCategory);
router.delete("/delete-product/:id",productController.deleteProduct)

module.exports = router;

const blogController = require("../controllers/blogController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");


const router = express.Router();

router.post("/blogs", authToken,blogController.createBlog);
router.get("/blog-details/:blogID",authToken,blogController.blogDetails)



module.exports = router;

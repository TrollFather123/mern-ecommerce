const commentController = require("../controllers/commentController");
const express = require("express");
const { authToken } = require("../middlewares/authToken");


const router = express.Router();

router.post("/comments/:blog_id", authToken,commentController.createComment);



module.exports = router;

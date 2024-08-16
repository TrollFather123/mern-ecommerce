const Comment = require("../models/commentModel")

exports.createComment = async (req, res) => {
    try {

    const { blog_id} = req.params
      const payload = {
        ...req.body,
        blog_id,
      };
  
      const comments = await Comment.create(payload);
  
      res.status(201).json({
        status: 201,
        data: comments,
        message: "comments created successfully!!",
      });
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: err.message,
      });
    }
  };
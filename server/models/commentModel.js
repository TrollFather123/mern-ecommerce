const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Comment",commentSchema)
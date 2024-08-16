const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);

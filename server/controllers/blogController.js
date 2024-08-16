const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

exports.createBlog = async (req, res) => {
  try {
    const userID = req.userId;

    const payload = {
      ...req.body,
      author_id: userID,
    };

    const blogs = await Blog.create(payload);

    res.status(201).json({
      status: 201,
      data: blogs,
      message: "blogs created successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.blogDetails = async (req, res) => {
  try {
    const { blogID } = req.params;

    const id = new mongoose.Types.ObjectId(blogID);

    const blog = await Comment.aggregate([
      {
        $match: {
          blog_id: id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "comment_author_details",
        },
      },
      {
        $lookup: {
          from: "blogs",
          localField: "blog_id",
          foreignField: "_id",
          as: "blog",
        },
      },
      {
        $unwind: "$blog",
      },
      {
        $unwind: "$comment_author_details",
      },

      {
        $addFields: {
          comment_id: "$_id",
        },
      },
      {
        $project: { _id: 0 },
      },

      {
        $project: {
          comment: 1,
          blog: 1,
          author: "$comment_author_details.name",
          comment_id: 1,
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: "$blog",
          comments: {
            $push: {
              comment_id: "$comment_id",
              comment: "$comment",
              author: "$author",
              createdAt: "$createdAt",
            },
          },
        },
      },
      {
        $addFields: {
          blog_details: "$_id",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "blog_details.author_id",
          foreignField: "_id",
          as: "blog_author_details",
        },
      },
      {
        $unwind: "$blog_author_details",
      },
      {
        $project: {
          _id: 0,
          title: "$blog_details.title",
          description: "$blog_details.description",
          author: "$blog_author_details.name",
          _id: "$blog_details._id",
          comments: 1,
        },
      },
    ]);

    res.status(201).json({
      status: 201,
      data: blog,
      message: "blogs fetched successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

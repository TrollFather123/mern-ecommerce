const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.uploadProducts = async (req, res, next) => {
  try {
    const sessionId = req.userId;
    const user = await User.findOne({ _id: sessionId });

    if (user?.role !== "ADMIN") {
      throw new Error("Permission Denied!!");
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      status: 201,
      data: product,
      message: "Product added successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 200,
      data: products,
      message: "Product fetched successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

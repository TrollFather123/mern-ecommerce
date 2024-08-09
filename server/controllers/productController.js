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

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 200,
      data: product,
      message: "Product fetched successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      data: product,
      message: "Product Updated successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};


exports.getCategoryProducts = async(req,res,next)=>{
    try{
      const categoryList = await Product.distinct("category");

      const productListByCategory = [];
      
      for (let i = 0 ; i<= categoryList.length - 1; i++) {
        const eachProduct = await Product.findOne({ category:categoryList[i] });
        productListByCategory.push(eachProduct);
      }
      
      res.status(200).json({
        status:200,
        data:productListByCategory,
        message:"Products fetched Succuessfully!!"
      })
      
    }catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
}
const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.uploadProducts = async (req, res, next) => {
  try {
    const sessionId = req.userId;
    const user = await User.findOne({ _id: sessionId });

    if (user?.role !== "ADMIN") {
      return next(res.status(400).json({ error: "Permission Denied!!" }));
    }

    if (!req.files || req.files.length === 0) {
      return next(res.status(400).json({ error: "No files uploaded" }));
    }

    const productImageUrls = req.files.map((file) => {
      return `${process.env.BACKEND_URL}/uploads/${file.filename}`;
    });

    const payload = {
      ...req.body,
      productImages: productImageUrls,
    };

    console.log(payload,"payload")

    const product = await Product.create(payload);

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
      count: products?.length,
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
    const currentProduct = await Product.findById(id);

    const productImageUrls = req.files.map((file) => {
      return `${process.env.BACKEND_URL}/uploads/${file.filename}`;
    });

    const payload = {
      ...req.body,
      productImages: [...currentProduct?.productImages, ...productImageUrls],
    };

    const product = await Product.findByIdAndUpdate(id, payload, {
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

exports.deleteImage = async (req, res, next) => {
  try {
    const { image, id } = req.body;
    const currentProduct = await Product.findById(id);

    const deletedImages = currentProduct?.productImages?.filter(
      (_data, index) => _data !== image
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productImages: deletedImages,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: 200,
      data: updatedProduct,
      message: "Image Deleted successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.getCategories = async(req,res) =>{
  try{

    const categories = await Product.distinct("category");

    res.status(200).json({
      status: 200,
      data: categories,
      message: "categories fetched Succuessfully!!",
    });
  }
  catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
}

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const categoryList = await Product.distinct("category");

    const productListByCategory = [];

    for (let i = 0; i <= categoryList.length - 1; i++) {
      const eachProduct = await Product.findOne({ category: categoryList[i] });
      productListByCategory.push(eachProduct);
    }

    res.status(200).json({
      status: 200,
      data: productListByCategory,
      message: "Products fetched Succuessfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.getProductByCategory = async(req,res) =>{
  try{
    const {category} = req.query;

    const product = await Product.find({category});

    res.status(200).json({
      status: 200,
      data: product,
      message: "Products fetched Succuessfully!!",
    });
  }
  catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
}

exports.getProductDetails = async(req,res) =>{
  try{
    const {product_id} = req.params;

    const product = await Product.findById(product_id);

    res.status(200).json({
      status: 200,
      data: product,
      message: "Products fetched Succuessfully!!",
    });
  }
  catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
}



exports.getProductStats = async (req, res) => {
  try {
    const { brand } = req.query;

    console.log(brand, "brand");
    const products = await Product.aggregate([
      { $match: { price: { $gte: 2000 } } },
      {
        $group: {
          _id: "$brandName",
          avgPrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
          products: { $push: "$productName" },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $addFields: { brandName: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { maxPrice: -1 },
      },
      {
        $match: { brandName: brand },
      },
    ]);

    res.status(200).json({
      status: 200,
      count: products?.length,
      data: products,
      message: "Products fetched Succuessfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.deleteProduct = async(req,res) =>{
  try{
    const {id} = req.params;

     await Product.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: "Product Deleted Successfully",
    });
  }
  catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
}


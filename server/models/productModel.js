const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Brand name is required!"],
  },
  productName: {
    type: String,
    required: [true, "Product name is required!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
  },
  productImages: [
    {
      type: String,
      required: [true, "Product image is required!"],
    },
  ],
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "Selling price is required!"],
  },
});

module.exports = mongoose.model("Product", productSchema);

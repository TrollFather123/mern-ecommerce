const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const userID = req.userId;

    const payload = {
      ...req.body,
      userId: userID,
    };

    const orders = await Order.create(payload);

    res.status(201).json({
      status: 201,
      data: orders,
      message: "orders created successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product_details",
        },
      },
      {
        $unwind:"$product_details"
      },
      {
        $group: {
          _id: {
            userId: '$userId',
            productId: '$productId'
          },
          product_name: { $first: '$product_details.productName' },
          order_ids: { $push: '$_id' }, 
          quantity: { $sum: 1 }, 
        },
      },
      {
        $group:{
          _id:'$_id.userId',
          productList:{
            $push:{
              productName:'$product_name',
              order_ids:'$order_ids',
              quantity:'$quantity'
            }
          }
        }
      },
      {
        $addFields: { user_id: "$_id" },
      },
      {
        $project: {
          _id:0
        }
      },
    
    ]);

    res.status(200).json({
      status: 200,
      data: orders,
      message: "orders fetch successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

const Order = require("../models/orderModel");
const mongoose = require("mongoose");

exports.createOrder = async (req, res, next) => {
  try {
    const userID = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: 400,
        message: "Product ID is required!",
      });
    }

    const isOrderExist = await Order.findOne({ productId, userId: userID });

    if (isOrderExist) {
      const updatedOrder = await Order.findByIdAndUpdate(
        isOrderExist._id,
        {
          $inc: { quantity: 1 },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        status: 200,
        data: updatedOrder,
        message: "Order updated successfully!",
      });
    } else {
      const payload = {
        ...req.body,
        userId: userID,
        quantity: 1,
      };
      const newOrder = await Order.create(payload);

      return res.status(201).json({
        status: 201,
        data: newOrder,
        message: "Order created successfully!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  const currentUser = new mongoose.Types.ObjectId(req.userId);

  try {
    const orders = await Order.aggregate([
      {
        $match: { userId: currentUser },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product_details",
        },
      },
      {
        $unwind: "$product_details",
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            productId: "$productId",
          },
          product_name: { $first: "$product_details.productName" },
          order_id: { $first: "$_id" },
          quantity: { $first: "$quantity" },
          price: { $first: "$product_details.sellingPrice" },
        },
      },
      {
        $group: {
          _id: "$_id.userId",
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
          productList: {
            $push: {
              productName: "$product_name",
              order_id: "$order_id",
              quantity: "$quantity",
              price: "$price",
            },
          },
        },
      },
      {
        $addFields: { user_id: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          productList: 1,
          totalPrice: 1,
          user_name: "$user.name",
        },
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

exports.updateOrder = async (req, res, next) => {
  const { order_id, quantity } = req.body;

  try {
    const isOrderExist = await Order.findOne({ _id: order_id });

    if (!isOrderExist) {
      return next(
        res.status(401).json({
          status: 401,
          message: "Order not exists",
        })
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      isOrderExist._id,
      {
        quantity,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: 200,
      data: updatedOrder,
      message: "Order updated successfully!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { order_id } = req.params;

  try {
    const isOrderExist = await Order.findOne({ _id: order_id });

    if (!isOrderExist) {
      return next(
        res.status(401).json({
          status: 401,
          message: "Order not exists",
        })
      );
    }

    await Order.findByIdAndDelete(order_id);

    return res.status(200).json({
      status: 200,
      message: "Order deleted successfully!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

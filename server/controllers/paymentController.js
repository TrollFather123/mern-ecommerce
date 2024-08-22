const Razorpay = require("razorpay");

exports.makePayment = async (req, res) => {
  try {
    const keyId = process.env.RAZOR_PAY_KEY_ID;
    const keySecret = process.env.RAZOR_PAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({
        status: 500,
        message: "Razorpay API keys are missing.",
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    let orderId = "OD_" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));


    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: orderId,
      payment_capture: 1,

    };

    const payment = await instance.orders.create(options);

    res.status(200).json({
      status: 200,
      message: "Payment Successful",
      data: payment,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Payment can't be processed",
      error: err.message,
    });
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const keyId = process.env.RAZOR_PAY_KEY_ID;
    const keySecret = process.env.RAZOR_PAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({
        status: 500,
        message: "Razorpay API keys are missing.",
      });
    }

    const { paymentID } = req.params;

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const payment = await instance.payments.fetch(paymentID);

    if (!payment) {
      return res.status(404).json({
        status: 404,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Payment can't be fetched",
      error: err.message,
    });
  }
};

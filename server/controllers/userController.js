const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const transporter = require("../config/emailConfig");

exports.signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!name) {
      throw new Error("name is required!");
    }
    if (!email) {
      throw new Error("email is required!");
    }
    if (!password) {
      throw new Error("password is required!");
    }

    await User.create(req.body);

    res.status(201).json({
      status: 201,
      message: "Account Created Successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });

    const checkPassword = await bcrypt.compare(password, currentUser.password);

    if (!currentUser || !checkPassword) {
      throw new Error("password or Email is incorrect");
    }

    next();

    const token = await jwt.sign(
      { id: currentUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "90d",
      }
    );

    res.status(200).json({
      status: 200,
      token,
      message: "Login Successfull!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.userPasswordResetEmailLinkSent = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const link = `http://localhost:3000/auth/forgot-password/${user?._id}`;

    // Send Email
    transporter.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Abhisek E-Commerce App - Password Reset Link",
        html: `<a href="${link}">Click Here</a> to Reset Your Password`,
      },
      (error, info) => {
        if (error) {
          throw new Error("Oops Something went wrong!! can't sent mail");
        }
        // console.log("Message sent: %s", info.messageId);
      }
    );

    res.status(200).json({
      status: 200,
      message: "Your link has been sent to your email id successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (newPassword !== confirmNewPassword) {
      throw new Error("password and confirm password are not same!!");
    }

    if (!user) {
      throw new Error("User not found!!");
    }

    const hashPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status:200,
      data:updatedUser,
      message:"Password updated successfully!!!"
    })
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.userDetails = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      throw new Error("user not found!!!");
    }

    res.status(200).json({
      status: 200,
      data: currentUser,
      message: "User found Successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 200,
      data: users,
      message: "Users found Successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (currentUser?.role !== "ADMIN") {
      throw new Error("User must be Admin to change the role!!");
    }

    const { name, email, role } = req.body;

    console.log(role, "role");

    const payload = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
    };

    const user = await User.findByIdAndUpdate(req.params.id, payload);

    res.status(200).json({
      status: 200,
      data: user,
      message: "User updated Successfully!!",
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

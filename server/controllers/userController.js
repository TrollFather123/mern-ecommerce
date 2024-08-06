const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    const currentUser = await User.findOne({_id:req.userId});

    // if(currentUser?.role !== "ADMIN"){
    //   throw new Error("User must be Admin to change the role!!")
    // }

    const {name,email,role} = req.body

    console.log(role,"role")

    const payload = {
      ...(name && {name}),
      ...(email && {email}),
      ...(role && {role})
    };

  
    const user = await User.findByIdAndUpdate(req.params.id,payload);

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
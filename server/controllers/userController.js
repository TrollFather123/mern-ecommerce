const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const {email,name,password} = req.body;

    if(!name){
        throw new Error("name is required!")
    }
    if(!email){
        throw new Error("email is required!")
    }
    if(!password){
        throw new Error("password is required!")
    }


    const user = await User.create(req.body);

    const token = await jwt.sign({id:user._id},process.env.SECRET_KEY,{
        expiresIn:"90d"
    })

    res.status(201).json({
        status:201,
        data:user,
        token,
        message:"Account Created Successfully!!"
    })



  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required!!!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required!!!"],
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long"],
    required: [true, "Password is Required!!!"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is Required!!!"],
    validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
  },
  profilePic:{
    type:String,
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.confirmPassword = undefined;
  next();
});

module.exports = new mongoose.model("User", userSchema);

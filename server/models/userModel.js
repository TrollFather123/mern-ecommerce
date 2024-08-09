const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const transporter = require("../config/emailConfig");
const path = require("path");
const fs = require("fs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!!!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!!!"],
      validate: [validator.isEmail, "Invalid email format"],
      unique: true,
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
    role: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    otp: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const sendMailOTP = async (email, otp) => {
  try {
    transporter.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Abhisek E-Commerce App - OTP verification",
        html: `${otp} is your one time password.`,
      },
      (error, info) => {
        if (error) {
          throw new Error("Oops Something went wrong!! can't sent mail");
        }
      }
    );
  } catch (err) {
    console.log(err?.message);
  }
};

userSchema.pre("save", async function (next) {
  // For hash password
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.confirmPassword = undefined;

  // For Mail Sent
  sendMailOTP(this.email, this.otp);

  // For Image Save in DB
  const imagePath = path.resolve(this.profilePic);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: "File not found." });
  }
  this.profilePic = imagePath;
  next();
});

module.exports = new mongoose.model("User", userSchema);

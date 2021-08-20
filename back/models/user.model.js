const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    minlength: [6, "your password must be at least 6 characters"],
    select: false,
  },
  phone:{
    type: String,
    required: [true, "Please enter your phone"],
  },
  role: { //  public-user / private / issuer / admin 
    type: String,
    default: "user",
  },
  //incase this is a private exam with a pre defined user
  exam_id:{
    type: mongoose.Schema.ObjectId,
    ref: "Exam",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  descrption: {
    type: String,
  },
  status: {
    type: String,
    default: "not Verified",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash it and save it in resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

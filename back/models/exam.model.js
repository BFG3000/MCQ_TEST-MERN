const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Exam Name"],
    maxlength: [30, "your Exam Name cannot exceed 30 characters"],
  },
  issuer_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  examCode: {
    type: String,
    required: [true, "Please Enter Exam code"],
    maxlength: [30, "your Exam code cannot exceed 30 characters"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  //in minutes
  duration: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  type:{  // 0 public - 1 private - 2 custom(not implemented yet)
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Exam", examSchema);

const mongoose = require("mongoose");
const validator = require("validator");

const questionSchema = new mongoose.Schema({
  head: {
    type: String,
    required: [true, "Please Enter Question head"],
    maxlength: [200, "your Question head cannot exceed 200 characters"],
  },
  choices: [
    {
      choice: {
        type: String,
        required: [true, "Please Enter Question Choice"],
        maxlength: [100, "your Question Choice cannot exceed 100 characters"],
      },
      correct: {
        type: Boolean,
        default: false,
        // select: false,
      },
    },
  ],
  exam_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Exam",
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);

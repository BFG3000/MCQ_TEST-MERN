const mongoose = require("mongoose");
const validator = require("validator");
const Question = require("./question.model");

// i could create another table to track student answer but here should be fine i guess?
const resultSchema = new mongoose.Schema({
  score: {
    type: Number,
    default: 0,
  },
  exam_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Exam",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  issuer_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  //0 not started , 1 started , 2 finished
  status: {
    type: Number,
    default: 0,
  },
  // just to keep track of user and all answers not just score
  answers: [
    {
      questionIndex: {
        type: Number,
      },
      answerIndex: {
        type: Number,
      },
    },
  ],
});

resultSchema.methods.calculateScore = async function () {
  const answers = [...this.answers];
  let score = 0;
  console.log(answers);
  //get exam questions and start to calculate score
  const questions = await Question.find({ exam_id: this.exam_id }).sort({
    index: 1,
  });
  // score = questions.reduce((sum,), 0);
  answers.forEach((answer) => {
    if (answer.answerIndex !== -1) {
      // console.log(answer.answerIndex);
      // console.log(answer.questionIndex);
      console.log(questions[answer.questionIndex - 1].choices[answer.answerIndex - 1]);
      if (questions[answer.questionIndex - 1].choices[answer.answerIndex - 1].correct === true) score += 1;
    }
  });
  return score;
};

module.exports = mongoose.model("Result", resultSchema);

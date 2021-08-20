const Exam = require("../models/exam.model");
const User = require("../models/user.model");
const Result = require("../models/results.model");
const Question = require("../models/question.model");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

exports.createExamResult = async (req, res, next) => {
  const { examCode, userId } = req.body;

  try {
    if (!examCode || !userId) next(new ErrorHandler("Invalid link1", 400));
    const exam = await Exam.findOne({ examCode: examCode });
    const user = await User.findOne({ _id: userId });
    console.log(user.exam_id);
    console.log(exam._id);
    if (!exam || !user) return next(new ErrorHandler("Invalid link2", 400));
    if (exam.type === 1) {
      // 1 means private
      // does this exam belong to this user?
      if (user.exam_id.toString() === exam._id.toString()) {
        //did he took this exam before?
        const resultCheck = await Result.findOne({ user_id: userId });
        console.log(resultCheck);
        if (resultCheck) return next(new ErrorHandler("You already entered this exam", 401));
      } else {
        return next(new ErrorHandler("unauthorized", 401));
      }
    }
    const questions = await Question.find({ exam_id: exam._id }).sort({
      index: 1,
    });

    //initialize the result array so that we can edit it later and calculate the score
    const answers = [];
    questions.forEach((question) => {
      answers.push({ questionIndex: -1, answerIndex: -1 });
    });

    const result = await Result.create({
      exam_id: exam._id,
      user_id: user._id,
      issuer_id: exam.issuer_id,
      answers,
    });
    res.status(201).json({
      success: true,
      resultId: result._id,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.submitAnswer = async (req, res, next) => {
  const { resultId } = req.params;
  const { answers } = req.body;

  try {
    const result = await Result.findById(resultId);
    result.answers = answers;
    await result.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.fix = async (req, res, next) => {
  try {
    const { resultId, examCode } = req.body;
    const exam = await Exam.findOne({ examCode: examCode });
    const questions = await Question.find({ exam_id: exam._id }).sort({
      index: 1,
    });

    //initialize the result array so that we can edit it later and calculate the score
    const answers = [];

    questions.forEach((question) => {
      answers.push({ questionIndex: -1, answerIndex: -1 });
    });
    const result = await Result.findById(resultId);
    result.answers = answers;
    await result.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.finishExam = async (req, res, next) => {
  const { resultId } = req.params;
  try {
    const result = await Result.findById(resultId);
    result.status = 2;
    result.score = await result.calculateScore();
    await result.save();

    res.status(200).json({
      success: true,
      examStatus: 2, //finished
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.getResult = async (req, res, next) => {
  const { resultId } = req.params;
  try {
    const result = await Result.findById(resultId);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.getAllExamResults = async (req, res, next) => {
  const { examId } = req.params;
  try {
    const result = await Result.find({ exam_id: examId });
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.getAllResults = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const results = await Result.find({ issuer_id: req.user._id })
      .populate("user_id", "name")
      .populate("exam_id", "name")
      .select("score startTime status answers");

    results
    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

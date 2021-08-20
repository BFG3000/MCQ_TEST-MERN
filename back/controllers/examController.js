const Exam = require("../models/exam.model");
const Question = require("../models/question.model");
const User = require("../models/user.model");
const Result = require("../models/results.model");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

//Create new Exam => api/exam -----------------------------------------------------------------------------
exports.createExam = async (req, res, next) => {
  const { exam, questions } = req.body;

  //create a Transaction
  //const session = await mongoose.startSession();
  try {
    const issuerId = req.user._id;

    const check = await Exam.findOne({ examCode: exam.examCode });
    if (check) return next(new ErrorHandler("error this Exam code is already used", 400));
    // await session.withTransaction(async () => {
    const newExam = await Exam.create(
      {
        name: exam.name,
        issuer_id: issuerId,
        examCode: exam.examCode,
        startDate: exam.startDate,
        endDate: exam.endDate,
        duration: exam.duration,
        description: exam.description,
        type: exam.type,
      }

      //  { session: session }
    );
    questions.forEach(async (question) => {
      console.log(question)
      try {
        await Question.create(
          {
            head: question.head,
            choices: question.choices,
            exam_id: newExam._id,
            index: question.index,
          }

          // { session: session }
        );
      } catch (error) {
        // await session.abortTransaction();
        return next(new ErrorHandler(error, 400));
      }
    });
    // });
  } catch (error) {
    // await session.abortTransaction();
    return next(new ErrorHandler(error, 400));
  }
  //end of Transaction
  // session.endSession();
  res.status(200).json({
    succes: true,
  });
};

//get Exam data and Questions => api/exams/:examCode/:resultId -----------------------------------------------------------------------------
exports.getExamData = async (req, res, next) => {
  const { examCode, resultId } = req.params;
  if (!examCode || !resultId) {
    return next(new ErrorHandler("Invalid link", 400));
  }

  try {
    //some checkups
    //check if this is a valid exam and user
    const exam = await Exam.findOne({ examCode: examCode });
    const result = await Result.findOne({ _id: resultId });
    if (!exam || !result) return next(new ErrorHandler("Invalid link", 400));
    // does this result belong to this exam?
    if (result.exam_id.toString() !== exam._id.toString()) return next(new ErrorHandler("Invalid link", 400));
    //did the user finish the exam?
    if (result.status == 2) return next(new ErrorHandler("You already entered this exam", 400));

    //start a transaction

    // get exam questions
    const questions = await Question.find({ exam_id: exam._id }).sort({
      index: 1,
    });

    //set the start timer
    //and set the exam status to started
    if (result.status == 0) {
      result.status = 1;
      result.startTime = Date.now();
      await result.save();
    }
    //remainingTime
    console.log();
    res.status(200).json({
      exam,
      questions,
      //remaining Time in milliseconds
      remainingTime: exam.duration * 60000 - (Date.now() - result.startTime),
      answers: result.answers,
      status: result.status,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//get Exam Info => api/exams/:examCode -----------------------------------------------------------------------------
exports.getExamInfo = async (req, res, next) => {
  const { examCode } = req.params;
  if (!examCode) {
    return next(new ErrorHandler("Invalid hhh", 400));
  }

  try {
    //some checkups
    //check if this is a valid exam and user
    const exam = await Exam.findOne({ examCode: examCode });

    if (!exam) return next(new ErrorHandler("Invalid link", 400));
    //every public user account is used once

    res.status(200).json({
      exam,
      status: "success",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//get all Exams => api/admin/exams -----------------------------------------------------------------------------
exports.getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({ issuer_id: req.user._id });

    res.status(200).json({
      exams,
      status: "success",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//get Exam Info => api/exams/:examCode -----------------------------------------------------------------------------
exports.getExamDataAdmin = async (req, res, next) => {
  const { examId } = req.params;
  if (!examId) {
    return next(new ErrorHandler("Invalid ID", 400));
  }

  try {
    const exam = await Exam.findById(examId);

    if (!exam) return next(new ErrorHandler("Invalid ID", 400));

    const questions = await Question.find({ exam_id: exam._id }).sort({
      index: 1,
    });

    res.status(200).json({
      exam,
      questions,
      status: "success",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//Delete an exam => api/admin/exams -----------------------------------------------------------------------------
exports.DeleteExam = async (req, res, next) => {
  const { examId } = req.params;

  try {
    //we should also delete all the related questions and exam results
    await Question.deleteMany({ exam_id: examId });
    await Result.deleteMany({ exam_id: examId });
    await Exam.findByIdAndDelete(examId);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//check exam code => api/exam-code -----------------------------------------------------------------------------
exports.checkExamCode = async (req, res, next) => {
  const { examCode } = req.params;

  try {
    const exam = await Exam.findOne({ examCode });

    if(exam){
      return next(new ErrorHandler("exam code is already used", 401));
    }

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

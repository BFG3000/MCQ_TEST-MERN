const express = require("express");
const router = express.Router();
const {
  createExam,
  getExamData,
  getExamInfo,
  getAllExams,
  getExamDataAdmin,
  checkExamCode
} = require("../controllers/examController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//admin routes---------------------------

//create new Exam
router.post("/admin/exams", isAuthenticatedUser, authorizeRoles("issuer"), createExam);

//get exam data and questions
router.get("/admin/exams/:examId", isAuthenticatedUser, authorizeRoles("issuer"), getExamDataAdmin);

//get all exams
//TODO add some filters
router.get("/admin/exams", isAuthenticatedUser, authorizeRoles("issuer"), getAllExams);

//delete an exam
router.delete("/admin/exams/:examId", isAuthenticatedUser, authorizeRoles("issuer"), getExamDataAdmin);

//check exam code
router.get("/exam-code/:examCode", isAuthenticatedUser, authorizeRoles("issuer"), checkExamCode);


//-----------------------------------------

router.get("/exams/:examCode/:resultId", getExamData);

router.get("/exams/:examCode", getExamInfo);

module.exports = router;

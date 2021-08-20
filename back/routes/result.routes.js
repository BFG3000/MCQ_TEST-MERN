const express = require("express");
const router = express.Router();
const {
  //   getExamStatus,
  createExamResult,
  submitAnswer,
  finishExam,
  getResult,
  getAllExamResults,
  getAllResults,
  fix,
} = require("../controllers/resultController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//admin routes --------------------------------------------------------------------------//

router.get("/admin/results/all", isAuthenticatedUser, authorizeRoles("issuer"), getAllResults);

router.get("/admin/results/:resultId", isAuthenticatedUser, authorizeRoles("issuer"), getResult);

//TODO add some filters
router.get("/admin/results/exams/:examId", isAuthenticatedUser, authorizeRoles("issuer"), getAllExamResults);




//--------------------------------------------------------------------------------------------//

//submit new Answer
router.post("/results/:resultId", submitAnswer);

//finish the Exam and calculate the score
router.patch("/results/:resultId", finishExam);

//create new Exam result
router.post("/results", createExamResult);

router.post("/fix", fix);

module.exports = router;

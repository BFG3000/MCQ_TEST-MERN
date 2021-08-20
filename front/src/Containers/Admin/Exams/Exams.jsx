import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams,deleteExams } from "../../../store/actions/adminActions";
import "./Exam.css";
import ExamRow from "./ExamRow";

const Exams = () => {
  const dispatch = useDispatch();
  const { exams } = useSelector((state) => state.admin);
  console.log(exams);

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  const deleteExam = (id) => {
    //dispatch(deleteExams(id))
    return
  };

  return (
    <>
      <h2 className="mx-3 pt-4 px-4">Exams</h2>
      <div className="row mx-4 my-5">
        <div className="exam-create-header">
          <div>
            <button className="exam-create">
              <i class="bx bx-plus"></i>Creat New Exam
            </button>
          </div>
          <div>*some filter and search stuff*</div>
        </div>
      </div>
      {/* list of exams */}
      <div className="row p-0 m-0 justify-content-center">
        {exams.legnth !== 0 &&
          exams.map((exam) => <ExamRow name={exam.name} id={exam._id} key={exam._id} deleteExam={deleteExam} />)}
      </div>
    </>
  );
};

export default Exams;

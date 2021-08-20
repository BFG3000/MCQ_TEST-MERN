import React from "react";
import "./Exam.css";

const ExamRow = ({name,id,deleteExam}) => {
  return (
    <div className="exam-row">
      <div className="d-flex">
        <div className="exam-active">Active</div>
        <div className="exam-name">{name}</div>
      </div>
      <div>
        <button className="exam-remove" onClick={()=>deleteExam(id)}><i class='bx bx-trash'></i>Remove</button>
        <button className="exam-edit"><i class='bx bx-edit'></i> Edit</button>
      </div>
    </div>
  );
};

export default ExamRow;

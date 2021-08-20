import React, { useState, useEffect } from "react";
import "./StartExam.css";
import { useSelector, useDispatch } from "react-redux";
import { getExamInfo, initiateExam } from "../../store/actions/examActions";
import { useHistory } from "react-router-dom";

const StartExam = ({ formData, examCode, userId }) => {
  const history = useHistory();

  const { exam, resultId } = useSelector((state) => state.exam);

  const dispatch = useDispatch();
  useEffect(() => {
    const code = formData.examCode ? formData.examCode : examCode;
    dispatch(getExamInfo(code));
    if (resultId !== "xxx") {
      history.push(
        `/exam/${code}/${resultId}`
      );
    }
    if(!code)history.push('/exam-setup')
  }, [resultId, history, formData.examCode]);

  const startExam = async () => {
    dispatch(initiateExam(formData, examCode, userId));
  };
  return (
    <div className="row justify-content-center text-white mt-5 ">
      <h3 className="text-center mb-5">{exam && exam.name}</h3>
      <h4 className="text-center">{exam && exam.description}</h4>
      <button className="startButton" onClick={startExam}>
        Start
      </button>
    </div>
  );
};

export default StartExam;

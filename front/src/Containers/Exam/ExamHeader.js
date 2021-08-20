import React from "react";
import CountDown from "./CountDown";
import "./Exam.css";

const ExamHeader = ({ currentIndex, NumOfQuestions, timer, resultUrl }) => {

  return (
    <div className="examHeader">
      <div>
        <h2>Multiple Choice</h2>
        <h5 className="mt-4">
          Question {currentIndex}/{NumOfQuestions}
        </h5>
      </div>
      <div className="examTimer">
        <CountDown timer={timer} resultId={resultUrl} />
      </div>
    </div>
  );
};

export default ExamHeader;

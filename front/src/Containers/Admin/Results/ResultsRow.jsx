import React from "react";
import "./Results.css";

const ResultsRow = ({ examName, userName, status, date, score, numofQuestions }) => {
  return (
    <div className="result-row">
      <div className="d-flex">
        <div className="exam-finished">Finished</div>
        <div>{date}</div>
        <div className="mx-5 flex-wrap">{examName} - {userName} </div>
      </div>
      <div className="d-flex">
        <div className="result-perc">150%</div>
        <div className="result-score">{score}/{numofQuestions}</div>
      </div>
    </div>
  );
};

export default ResultsRow;

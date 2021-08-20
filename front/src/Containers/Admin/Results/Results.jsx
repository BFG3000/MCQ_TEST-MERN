import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResults } from "../../../store/actions/adminActions";
import "./Results.css";
import ResultsRow from "./ResultsRow";

const Results = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.admin);
  console.log(results);

  useEffect(() => {
    dispatch(getAllResults());
  }, [dispatch]);

  return (
    <>
      <h2 className="mx-3 pt-4 px-4">Results</h2>
      <div className="row mx-4 my-5">
        <div className="exam-create-header">
          <div></div>
          <div>*some filter and search stuff*</div>
        </div>
      </div>
      {/* list of exams */}
      <div className="row p-0 m-0 justify-content-center">
        {results.legnth !== 0 &&
          results.map((result) => (
            <ResultsRow
              examName={result.exam_id.name}
              userName={result.user_id.name}
              status={result.status}
              date={result.startTime}
              score={result.score}
              numofQuestions={result.answers.length}
              key={result._id}
            />
          ))}
      </div>
    </>
  );
};

export default Results;

import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Answer from "./Answer";
import "./Exam.css";
import { useSelector, useDispatch } from "react-redux";
import ExamHeader from "./ExamHeader";
import axios from "axios";
import { getExamData, saveAnswer, endExam } from "../../store/actions/examActions";
import { examActions } from "../../store/slices/examSlice";
import Notification from "../../Components/Notification/Notification";

const Exam = () => {
  const { examCode, resultId } = useParams();
  const { loading, notification } = useSelector((state) => state.notification);
  const { exam, questions, currentIndex, answers, remainingTime, status } = useSelector((state) => state.exam);
  const exam1= useSelector((state) => state.exam);
  console.log(exam1)
  const dispatch = useDispatch();
  const history = useHistory();
  //just in case user refresh i need to retrive exam data again and keep track where the user was
  useEffect(() => {
    if (!examCode || !resultId) {
      history.push("/exam-setup");
    }
    if (status === 2) {
      //make some notification (exam finished then redirect);
      Notification("error", "you already finished this exam");
      history.push("/");
    }

    if (questions.length === 1 && loading === false) {
      console.log("loading again");
      dispatch(getExamData(examCode, resultId));
    }
    // dispatch,examCode,history,loading,questions.length,resultId
  }, [status, resultId, examCode, history]);

  const selectAnswer = (index) => {
    //index of questions and answers will start from 1 instead of 0
    let newAnswers = [...answers];
    newAnswers[currentIndex] = {
      ...newAnswers[currentIndex],
      questionIndex: questions[currentIndex].index,
      answerIndex: index + 1,
    };
    dispatch(saveAnswer(newAnswers, resultId));
  };

  const endTest = () => {
    dispatch(endExam(resultId));
    history.push("/");
  };

  return (
    <div className="row test text-white">
      <div className="examForm">
        <ExamHeader
          currentIndex={currentIndex + 1}
          NumOfQuestions={questions.length}
          timer={remainingTime}
          resultUrl={resultId}
        />
        <div className="examBody">
          <hr />
          <h3 className="testQuestion fw-bold">{questions[currentIndex].head}</h3>
          <div className="radio-buttons">
            {/* exam questions */}
            {questions &&
              questions[currentIndex].choices.map((choice, index) => (
                <Answer
                  key={choice._id}
                  id={choice._id}
                  choice={choice.choice}
                  index={index}
                  selected={answers[currentIndex].answerIndex === index + 1 ? true : false}
                  selectAnswer={selectAnswer}
                />
              ))}
          </div>
          <div className="controlButtons">
            <button
              className="btn btn-rounded btn-primary mt-5 px-4"
              disabled={currentIndex === questions.length - 1 ? false : true}
              onClick={endTest}
            >
              End Exam
            </button>

            <div className="text-right">
              <button
                className="btn btn-rounded btn-primary mt-5 mx-2"
                onClick={() => dispatch(examActions.prevQuestion())}
                disabled={currentIndex !== 0 ? false : true}
              >
                {"<"}Previous
              </button>

              <button
                className="btn btn-rounded btn-primary mt-5 mx-2"
                onClick={() => dispatch(examActions.nextQuestion())}
                disabled={currentIndex < questions.length - 1 ? false : true}
              >
                Next{">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;

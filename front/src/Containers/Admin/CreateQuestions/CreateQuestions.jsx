import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Notification from "../../../Components/Notification/Notification";
import { isValidQuestion } from "../../../utils/isValid";
import { addNewExam } from "../../../store/actions/adminActions";
import Answers from "./Answers";

const CreateQuestions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { exam } = useSelector((state) => state.admin);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState(0);

  const questionRef = useRef();

  useEffect(() => {
    if (!exam.name) {
      history.push("/create-exam");
      return;
    }
  }, [exam, history]);

  useEffect(() => {
    setAnswersArray(4);
  }, []);
  //wtf am i doing
  const setAnswersArray = (num) => {
    let array = [];
    for (let i = 0; i < +num; i++) {
      array.push({});
    }
    setAnswers((prev) => array);
  };

  const answerNumberHandler = (value) => {
    if (+value > 6 || +value < 2) {
      return;
    }
    setAnswersArray(+value);
  };

  const addQuestion = async () => {
    const copy = [...answers];
    copy[correct] = { correct: 1, ...copy[correct] };
    console.log(copy);
    setAnswers(copy);
    //hmmmmmmmmmmmmm when i set choices to answers state it doesnt show the correct answer
    // which means the the object is defined before setAnswers which is javascript fault for me spending 2 hours to fix this
    //but when i set it to the copy it works magically which is absolute bullshit or im dumb
    const formData = await {
      head: questionRef.current.value,
      choices: copy,
      index: questions.length + 1,
    };
    console.log(formData);
    const validation = isValidQuestion(formData);
    if (validation.length !== 0) {
      validation.forEach((error) => {
        Notification("error", error);
      });
      return;
    }
    setQuestions((prev) => [...prev, formData]);
    questionRef.current.value = "";
    setAnswersArray(answers.length);
    console.log(questions);
  };

  const saveExam = () => {
    if (questions.length < 2) return;
    dispatch(addNewExam(exam, questions));
    Notification("success", "Exam Created successfully");
    history.push("/create-exam");
  };
  return (
    <div className="container">
      <h2 className="mx-3 pt-4 px-3">Add Questions</h2>
      <h4 className="mx-3 pt-4 px-3">Question {questions.length + 1}</h4>
      <form className="create-exam-form" onSubmit={saveExam}>
        <div class="mb-3">
          <label for="description" class="form-label">
            Question
          </label>
          <textarea class="form-control" id="description" rows="3" ref={questionRef}></textarea>
        </div>

        <div className="d-flex flex-wrap justify-content-center align-items-center mt-4">
          <div class="form-check" style={{ marginRight: "2rem" }}>
            <input
              class="form-check-input"
              type="radio"
              name="type"
              id="flexRadioDefault1"
              onChange={() => setAnswersArray(4)}
              defaultChecked
            />
            <label class="form-check-label" for="flexRadioDefault1">
              4 Answers
            </label>
          </div>
          <div class="form-check" style={{ marginRight: "2rem" }}>
            <input
              class="form-check-input"
              type="radio"
              name="type"
              id="flexRadioDefault2"
              onChange={() => setAnswersArray(2)}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              2 Answers
            </label>
          </div>
          <div className="d-flex align-items-center">
            <div className="px-3">Answers: </div>
            <input
              type="number"
              class="form-control"
              placeholder="Number of answers"
              onChange={(e) => answerNumberHandler(e.target.value)}
            />
          </div>
        </div>

        {/* Answers section */}
        <div className="d-flex flex-wrap justify-content-center mt-5 ">
          {answers.map((answer, index) => (
            <Answers key={index} index={index} answers={answers} setAnswers={setAnswers} setCorrect={setCorrect} />
          ))}
        </div>

        <div className="mt-5 d-flex justify-content-between">
          <button
            type={"button"}
            className="questions-create"
            style={{ backgroundColor: "#5b6ccc" }}
            onClick={addQuestion}
          >
            Add Question <i class="bx bx-plus"></i>
          </button>
          <button type={"submit"} className="questions-create">
            Finish <i class="bx bx-check"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestions;

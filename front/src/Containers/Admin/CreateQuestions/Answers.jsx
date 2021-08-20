import React from "react";
import "./CreateQuestions.css";

const Answers = ({ index, answers, setAnswers, setCorrect }) => {
  const handleAnswer = (value) => {
    const answers1 = [...answers];
    answers1[index] = { choice: value };
    setAnswers(answers1);
  };
  return (
    <div className="question-answers">
      <div className="qans1">Answer {index + 1}</div>
      <div className="m-3">
        <textarea
          class="form-control"
          rows="3"
          onChange={(e) => handleAnswer(e.target.value)}
          value={answers[index].choice ? answers[index].choice : ""}
          placeholder="Answer..."
        ></textarea>
      </div>
      <div className="mx-3 mb-2">
        <div class="form-check" style={{ marginRight: "2rem" }}>
          <input
            class="form-check-input"
            type="radio"
            name="correct"
            id={`flexRadio${index}`}
            defaultChecked={index === 0 ? true : false}
            onChange={() => setCorrect(index)}
          />
          <label class="form-check-label" for={`flexRadio${index}`}>
            Correct
          </label>
        </div>
      </div>
    </div>
  );
};

export default Answers;

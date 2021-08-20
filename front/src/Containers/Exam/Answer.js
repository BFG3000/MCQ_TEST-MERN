import React from "react";
import { useDispatch } from "react-redux";

const Answer = ({ id, choice, selectAnswer, index, selected }) => {
  const dispatch = useDispatch();
  return (
    <div className="form-check mt-5">
      <input
        className="form-check-input"
        type="radio"
        id={id}
        name="choice"
        value={choice}
        onChange={() => selectAnswer(index)}
        checked={selected}
      />
      <label className="form-check-label" htmlFor={id}>
        {choice}
      </label>
    </div>
  );
};

export default Answer;

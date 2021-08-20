import React, { useRef, useState } from "react";
import "./CreateExam.css";
import { isValidExam } from "../../../utils/isValid";
import { adminActions } from "../../../store/slices/adminSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Notification from '../../../Components/Notification/Notification'

const CreateExam = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [type, setType] = useState(0);
  const nameRef = useRef();
  const examCodeRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const durationRef = useRef();
  const descriptionRef = useRef();

  const CreateExamHandler = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      examCode: examCodeRef.current.value,
      startDate: startRef.current.value,
      endDate: endRef.current.value,
      duration: durationRef.current.value,
      description: descriptionRef.current.value,
      type,
    };
    const validation = await isValidExam(formData);
    if (validation.length !== 0) {
      validation.forEach((error) => {
        Notification("error",error);
      });
      return;
    }

    dispatch(adminActions.setExam({ exam: formData }));
    history.push("/create-questions");
  };

  return (
    <div className="container">
      <h2 className="mx-3 pt-4 px-4">Create Exam</h2>
      <form onSubmit={CreateExamHandler} className="create-exam-form">
        <div class="mb-3">
          <label for="name" class="form-label">
            Exam Name
          </label>
          <input type="text" class="form-control" id="name" placeholder="Enter Test name" ref={nameRef} />
        </div>
        <div class="mb-3">
          <label for="code" class="form-label">
            Exam Code <small style={{ opacity: "0.5" }}> (used to access exam)</small>
          </label>
          <input type="text" class="form-control" id="code" placeholder="Enter Exam Code" ref={examCodeRef} />
        </div>
        <div class="mb-3 d-flex flex-wrap">
          <div style={{marginRight:"2rem"}} >
            <label for="startDate" class="form-label">
              Start Date
            </label>
            <input type="Date" class="form-control" id="startDate" ref={startRef} />
          </div>
          <div>
            <label for="endDate" class="form-label">
              End Date
            </label>
            <input type="Date" class="form-control" id="endDate" ref={endRef} />
          </div>
        </div>
        <div class="mb-3">
          <label for="duration" class="form-label">
            Duration <small style={{ opacity: "0.5" }}> (in minutes)</small>
          </label>
          <input type="number" class="form-control" id="duration" placeholder="Enter Exam Duration" ref={durationRef} />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Exam Description  <small style={{ opacity: "0.5" }}> (Optional)</small>
          </label>
          <textarea class="form-control" id="description" rows="3" ref={descriptionRef}></textarea>
        </div>
        <label class="form-label">Type</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="type"
            id="flexRadioDefault1"
            onClick={() => setType(0)}
            defaultChecked
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Public <small style={{ opacity: "0.5" }}> (anyone with the exam code can register and enter)</small>
          </label>
        </div>
        <div class="form-check mt-3">
          <input class="form-check-input" type="radio" name="type" id="flexRadioDefault2" onClick={() => setType(1)} />
          <label class="form-check-label" for="flexRadioDefault2">
            Private{" "}
            <small style={{ opacity: "0.5" }}>(only predefined users with a secert link can enter the exam once)</small>
          </label>
        </div>
        <div className="mt-5">
          <button type={"submit"} className="questions-create">
            Create Questions <i class="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;

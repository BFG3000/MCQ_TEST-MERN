import React, { useRef } from "react";
import "./UserInfo.css";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../Notification/Notification";
import { isValid } from "../../utils/isValid";

import axios from "axios";

const UserInfo = ({ setFormData, setNext, examCode }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const codeRef = useRef();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.notification);

  const createPublicUser = async () => {
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      examCode: codeRef.current.value,
    };

    const validation = await isValid(formData);
    if (validation.length !== 0) {
      Notification("error", validation.join("*  \n *"));
      return;
    }

    setFormData(formData);
    setNext(2);
  };

  return (
    <div className="d-flex flex row justify-content-center userInfo ">
      <div className="card card1 p-3 shadow">
        <div className="d-flex flex-column">
          <img src="https://i.imgur.com/kFFNY1q.png" height="50" width="50" />
          <span className="nextstep mt-3">Log in</span>
        </div>
        <div className="input-field d-flex flex-column mt-3">
          <span>Full name</span>
          <input
            className="form-control"
            placeholder="ShadowJesus"
            ref={nameRef}
          />

          <span className="mt-3">Email</span>
          <input
            className="form-control"
            placeholder="email@example.com"
            ref={emailRef}
          />

          <span className="mt-3">Phone</span>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Your Phone number"
            ref={phoneRef}
          />

          <span className="mt-4 fw-bold">Exam code</span>
          <input
            className="form-control"
            disabled={examCode ? true : false}
            placeholder="xyzh1z1overwatch"
            ref={codeRef}
            defaultValue={examCode ? examCode : ""}
          />

          <button
            onClick={createPublicUser}
            disabled={loading ? true : false}
            className="btn1 btn-dark d-flex justify-content-center align-items-center"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

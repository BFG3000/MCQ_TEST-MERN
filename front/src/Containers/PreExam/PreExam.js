import React, { useState,useEffect } from "react";

import StartExam from "../../Components/PreExam/StartExam";
import UserInfo from "../../Components/PreExam/UserInfo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {examActions} from '../../store/slices/examSlice'
import { useSelector } from "react-redux";

const PreExam = () => {
  const dispatch = useDispatch()
  const { examCode, userId } = useParams();
  const [next, setNext] = useState(1);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    dispatch(examActions.clearState())
  }, [dispatch])
  return (
    <div className="text-white mt-5">
      {/* step 1 get userinfo and exam code */}
      {next === 1 && !userId && (
        <UserInfo
          setNext={setNext}
          setFormData={setFormData}
          examCode={examCode}
        />
      )}
      {/* step 2 read exam instructions then press start*/}
      {(next === 2 || userId) && (
        <StartExam formData={formData} examCode={examCode} userId={userId} />
      )}
    </div>
  );
};

export default PreExam;

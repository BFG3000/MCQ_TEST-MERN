import { examActions } from "../slices/examSlice";
import { notificationActions } from "../slices/notification";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getExamInfo = (examCode) => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "getting exam info...",
      })
    );

    const { data } = await axios.get(`/api/exams/${examCode}`);

    dispatch(
      examActions.examInfo({
        exam: data.exam,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "exam info retrieved!",
      })
    );
  } catch (error) {
    console.error(error);
    console.log(error.response.data.message);
    console.log(error.response);
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "error",
        message: error.response.data.message,
      })
    );
  }
};

export const getExamData = (examCode, resultId) => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "getting exam info...",
      })
    );

    const { data } = await axios.get(`/api/exams/${examCode}/${resultId}`);
    console.log(data.answers);
    dispatch(
      examActions.getExam({
        exam: data.exam,
        questions: data.questions,
        answers: data.answers,
        remainingTime: data.remainingTime,
        status: data.status,
        currentIndex: +localStorage.getItem("currentIndex") ? JSON.parse(localStorage.getItem("currentIndex")) : 0,

        // startDate:data.startTime
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "exam info retrieved!",
      })
    );
  } catch (error) {
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "error",
        message: error.response.data.message,
      })
    );
  }
};

export const initiateExam = (formData, examCode, userId) => async (dispatch) => {
  try {
    //hmmmmmmm what to do now?
    //should i create user first > create result > get questions
    // or make a bigass route that does every thing
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "loading...",
      })
    );

    let resultData = {
      examCode: formData.examCode ? formData.examCode : examCode,
    };

    //create public user or get user private user from params
    if (userId) {
      resultData.userId = userId;
    } else {
      const userReq = await axios.post(`/api/public-user`, formData, config);
      resultData.userId = userReq.data.userId;
    }

    console.log("resultData", resultData);

    //create an empty result for this user exam
    const resData = await axios.post(`/api/results`, resultData, config);

    dispatch(
      examActions.setResultId({
        resultId: resData.data.resultId,
      })
    );

    //get the exam
    const { data } = await axios.get(`/api/exams/${resultData.examCode}/${resData.data.resultId}`);
    console.log(data);
    dispatch(
      examActions.initiateExam({
        exam: data.exam,
        questions: data.questions,
        answers: data.answers,
        remainingTime: data.remainingTime,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "exam data retrieved!",
      })
    );
  } catch (error) {
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "error",
        message: error.response.data.message,
      })
    );
  }
};

export const saveAnswer = (newAnswers, resultId) => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        message: "submitting answer...",
      })
    );

    dispatch(
      examActions.submitAnswer({
        answers: newAnswers,
      })
    );
    await axios.post(`/api/results/${resultId}`, { answers: newAnswers }, config);
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "answer submitted!",
      })
    );
  } catch (error) {
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "error",
        message: error.response.data.message,
      })
    );
  }
};

export const endExam = (resultId) => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "finalizing...",
      })
    );

    const { data } = await axios.patch(`/api/results/${resultId}`);
    console.log(data);

    dispatch(
      examActions.examStatus({
        status: 2,
      })
    );

    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "Exam ended!",
      })
    );
  } catch (error) {
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "error",
        message: error.response.data.message,
      })
    );
  }
};

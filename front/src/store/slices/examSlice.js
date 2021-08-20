import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exam: {},
    questions: [{ head: "", choices: [] }],
    answers: [],
    currentIndex: 0,
    remainingTime: 99999,
    resultId: "xxx",
    status: 1,
  },
  reducers: {
    getExam(state, action) {
      state.exam = action.payload.exam;
      state.questions = action.payload.questions;
      state.answers = action.payload.answers;
      state.currentIndex = action.payload.currentIndex;
      state.remainingTime = action.payload.remainingTime;
      state.status = action.payload.status;
    },
    examInfo(state, action) {
      state.exam = action.payload.exam;
    },
    initiateExam(state, action) {
      state.exam = action.payload.exam;
      state.questions = action.payload.questions;
      state.answers = action.payload.answers;
      state.remainingTime = action.payload.remainingTime;
      localStorage.setItem("currentIndex", JSON.stringify(0));
    },
    setResultId(state, action) {
      state.resultId = action.payload.resultId;
    },
    nextQuestion(state, action) {
      state.currentIndex += 1;
      //keep track of last question the user visisted
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    prevQuestion(state, action) {
      state.currentIndex -= 1;
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    submitAnswer(state, action) {
      state.answers = action.payload.answers;
    },
    examStatus(state, action) {
      state.status = action.payload.status;
    },
    clearState(state, action) {
      state.exam = {};
      state.questions = [{ head: "", choices: [] }];
      state.answers = [];
      state.currentIndex = 0;
      state.remainingTime = 99999;
      state.resultId = "xxx";
      state.status = 0;
    },
  },
});

export const examActions = examSlice.actions;

export default examSlice;

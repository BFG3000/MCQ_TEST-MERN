import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    exams: [{ name: "" }],
    exam: { name: "" },
    questions: [{ head: "", choices: [] }],
    results: [],
  },
  reducers: {
    getAllExams(state, action) {
      state.exams = action.payload.exams;
    },
    examInfo(state, action) {
      state.exam = action.payload.exam;
    },
    setExam(state, action) {
      state.exam = action.payload.exam;
    },
    setResults(state, action) {
      state.results = action.payload.results;
    },
    clearState(state, action) {
      state.exam = { name: "" };
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;

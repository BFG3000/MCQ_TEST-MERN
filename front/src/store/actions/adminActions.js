import { adminActions } from "../slices/adminSlice";
import { notificationActions } from "../slices/notification";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addNewExam = (exam, questions) => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "creating new exam ...",
      })
    );

    await axios.post("/api/admin/exams", { exam, questions }, config);

    dispatch(adminActions.clearState());
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "exam created!",
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

export const getAllExams = () => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "getting all exams ...",
      })
    );

    const { data } = await axios.get("/api/admin/exams");

    dispatch(
      adminActions.getAllExams({
        exams: data.exams,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "exams retrieved!",
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

export const deleteExams = () => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "...",
      })
    );

    await axios.delete("/api/admin/exams/:examId");

    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "exam deleted!",
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

export const getAllResults = () => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "getting all results ...",
      })
    );

    const { data } = await axios.get("/api/admin/results/all");
    dispatch(
      adminActions.setResults({
        results: data.results,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "results retrieved!",
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

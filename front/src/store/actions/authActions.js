import { authActions } from "../slices/authSlice";
import { notificationActions } from "../slices/notification";
import axios from "axios";

export const loginUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch(
    notificationActions.showNotification({
      loading: true,
      status: "pending",
      message: "Login in progress...",
    })
  );

  try {
    const { data } = await axios.post("/api/login", user, config);
    dispatch(
      authActions.signin({
        user: data.user,
        isAuthenticated: true,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "Logged in successfully!",
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

export const signupUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(
    notificationActions.showNotification({
      loading: true,
      status: "pending",
      message: "Signup in progress...",
    })
  );
  try {
    const { data } = await axios.post("/api/signup", user, config);

    dispatch(
      authActions.signin({
        user: data.user,
        isAuthenticated: true,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "Accout created successfully!",
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

export const getUser = (user) => async (dispatch) => {
  try {
    dispatch(
      notificationActions.showNotification({
        loading: true,
        status: "pending",
        message: "Getting user data...",
      })
    );

    const { data } = await axios.get("/api/me");

    dispatch(
      authActions.loadUser({
        user: data.user,
        isAuthenticated: true,
      })
    );
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "User data retrieved!",
      })
    );
  } catch (error) {
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "erroruser",
        message: error.response.data.message,
      })
    );
  }
};

export const logoutUser = (user) => async (dispatch) => {
  try {
    await axios.get("/api/logout");
    dispatch(
      notificationActions.showNotification({
        loading: false,
        status: "success",
        message: "Logout successfully!",
      })
    );
    dispatch(
      authActions.logout({
        isAuthenticated: false,
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

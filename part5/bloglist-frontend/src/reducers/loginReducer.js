import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: { username: "", password: "", user: null },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload };
    },
    setPassword(state, action) {
      return { ...state, password: action.payload };
    },
    setUser(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUsername, setPassword, setUser } = loginSlice.actions;

export const tryLoginFromStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  };
};

export const loginFromDetails = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      if (user) {
        window.localStorage.setItem(
          "loggedBlogUser",
          JSON.stringify(user.data)
        );
        dispatch(setUser(user.data));
        dispatch(setNotification(`${user.data.username} logged in`));
      }
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "error"));
    }
    dispatch(setUsername(""));
    dispatch(setPassword(""));
  };
};

export default loginSlice.reducer;

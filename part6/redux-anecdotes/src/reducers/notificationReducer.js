import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return "";
    },
    setTimeOut(state, action) {
      return { ...state, timeOut: action.payload };
    },
  },
});

export const { newNotification, clearNotification } = notificationSlice.actions;

let timeOut;
export const setNotification = (content, time) => {
  return async (dispatch) => {
    clearTimeout(timeOut);
    dispatch(newNotification(content));
    timeOut = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

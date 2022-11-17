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
  },
});

export const { newNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    await dispatch(newNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

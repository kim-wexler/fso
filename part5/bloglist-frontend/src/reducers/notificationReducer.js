import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
  },
});

export const { createNotification } = notificationSlice.actions;

let clearMsg;
export const setNotification = (message, type = "info") => {
  return (dispatch) => {
    clearTimeout(clearMsg);
    dispatch(createNotification({ message, type }));
    clearMsg = setTimeout(() => {
      dispatch(createNotification(null));
    }, 5000);
  };
};

export default notificationSlice.reducer;

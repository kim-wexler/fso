import { configureStore, combineReducers } from "@reduxjs/toolkit";
import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

// initialize store without combined reducers:
// const store = configureStore({
//   reducer: {
//     anecdotes: anecdoteReducer,
//     notification: notificationReducer,
//   },
// });

const store = configureStore({
  reducer: reducer,
});

export default store;

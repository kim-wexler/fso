import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const anecdote = state.find((elem) => elem.id === action.payload);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((element) =>
        element.id === action.payload ? updatedAnecdote : element
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateAnecdote = (content) => {
  return () => {
    anecdoteService.update(content);
  };
};

export default anecdoteSlice.reducer;

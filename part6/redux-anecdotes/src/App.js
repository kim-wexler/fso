import NewAnecdote from "./components/NewAnecdote";
import Anecdotes from "./components/Anecdotes";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  });
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;

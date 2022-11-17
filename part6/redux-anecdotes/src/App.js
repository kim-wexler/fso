import NewAnecdote from "./components/NewAnecdote";
import Anecdotes from "./components/Anecdotes";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
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

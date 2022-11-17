import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdoteFilter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(anecdoteFilter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          handleClick={() => {
            dispatch(updateVote(anecdote.id));
            dispatch(setNotification(`You voted: ${anecdote.content}`));
            // setTimeout(() => {
            //   dispatch(setNotification(""));
            // }, 1000);
          }}
          key={anecdote.id}
        />
      ))}
    </>
  );
};

export default Anecdotes;

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  // console.log("state now: ", state);
  // console.log("action", action);

  if (action.type === "vote") {
    const anecdote = state.find((elem) => elem.id === action.id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    return state.map((element) =>
      element.id === action.id ? updatedAnecdote : element
    );
  }
  if (action.type === "NEW_ANECDOTE") {
    return state.concat(asObject(action.data));
  }

  return state;
};

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    data: anecdote,
  };
};

export const doVote = (id) => {
  return { type: "vote", id };
};

export default reducer;

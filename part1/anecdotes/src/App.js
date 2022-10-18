import { useState } from "react"

const chooseIndex = () => {
  return Math.floor(Math.random() * 10) % 7
}

const ChooseAnecdote = (props) => {
  if (props.selected == -1) {
    return (
      <div>
        Click the anecdotes button
      </div>
    )
  }
  return (
    <div>
      <font size="6">
        <b>Anecdote of the day</b>
      </font>
      <p>
        {props.anecdotes[props.selected]}
        <br></br>
        has {props.votes[props.selected]} votes
      </p>
    </div>
  )
}

const MostVoted = (props) => {
  let most = 0
  let index = 0

  props.votes.map((vote, i) => {
    if (vote > most) {
      most = vote
      index = i
    }
  })

  if (most > 0) {
    return (
      <div>
        <p>
          <font size="6">
            <b>Anecdote with most votes</b>
          </font>
        </p>
        {props.anecdotes[index]} 
        <br></br>
        has {most} votes
      </div>
    )
  }
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(-1)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  return (
    <div>
      <ChooseAnecdote
        selected={selected} 
        anecdotes={anecdotes} 
        votes={votes}
      />
      <button onClick={() => {
        if (selected != -1) {
          let copy = [...votes]
          copy[selected] += 1;
          setVotes(copy)
        }
      }}>
        vote
      </button>
      <button onClick={() => setSelected(chooseIndex())}>
        anecdotes
      </button>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App;

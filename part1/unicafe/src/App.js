import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Button = (props) => (
  <button onClick={props.clicker}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text != "positive") {
    return (
      <div>
        <td width={75}>
          {props.text} 
        </td>
        <td>
          {props.value}
        </td>
      </div>
    )
  }
  else {
    return (
      <div>
        <td width={75}>
          {props.text} 
        </td>
        <td>
          {props.value} %
        </td>
      </div>
    )
  }
}

const Statistics = (props) => {
  if (props.total > 0) {
    const avg = (props.good - props.bad) / props.total
    return (
      <div>
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={props.good / props.total * 100} />
      </div>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = bad + neutral + good

  return (
    <div>
      <Header text={"give feedback"} />
      <Button clicker={() => setGood(good+1)} text="good" />
      <Button clicker={() => setNeutral(neutral+1)} text="neutral" />
      <Button clicker={() => setBad(bad+1)} text="bad" />
      <Header text={"statistics"} />
      <table>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={total} />
        </tr>
          <Statistics good={good} bad={bad} total={total} />
      </table>
    </div>
  )
}

export default App
import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
      <table>
        <tbody>
          <tr>
            <td width="55">{props.text}</td>
            <td>{props.value}</td>
            <td>{props.sign}</td>
          </tr>
        </tbody>
      </table>
  )
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
      <StatisticLine text="positive" value={props.good/(props.good + props.neutral + props.bad)*100} sign="%" />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
      <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text="good"/>
        <Button handleClick={handleNeutralClick} text="neutral"/>
        <Button handleClick={handleBadClick} text="bad"/>   
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
      </div>
    </div>
  )
}

export default App

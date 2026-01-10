import { useState } from 'react'

const handleDivision = (dividend, divisor) => {
    if (divisor === 0) {
        return 0
    }
    return dividend / divisor
}

const FeedbackButton = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total === 0) {
        return <p>No feedback given</p>
    }
    return (
        <div>
            <h1>statistics</h1>
            <StatisticLine statName="good" value={good} />
            <StatisticLine statName="neutral" value={neutral} />
            <StatisticLine statName="bad" value={bad} />
            <StatisticLine statName="all" value={total} />
            <StatisticLine statName="average" value={handleDivision((good - bad), total)} />
            <StatisticLine statName="positive" value={handleDivision((good * 100), total)} suffix={" %"} />
        </div>
    )
}

const StatisticLine = ({statName, value, suffix = ""}) => <p>{statName}: {value}{suffix}</p>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <FeedbackButton onClick={() => setGood(good + 1)} text={"good"} />
            <FeedbackButton onClick={() =>setNeutral(neutral + 1)} text={"neutral"} />
            <FeedbackButton onClick={() =>setBad(bad + 1)} text={"bad"} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
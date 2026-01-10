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
            <table>
                <tbody>
                    <StatisticLine statName="good" value={good} />
                    <StatisticLine statName="neutral" value={neutral} />
                    <StatisticLine statName="bad" value={bad} />
                    <StatisticLine statName="all" value={total} />
                    <StatisticLine statName="average" value={handleDivision((good - bad), total)} />
                    <StatisticLine statName="positive" value={handleDivision((good * 100), total)} suffix={" %"} />
                </tbody>
            </table>
        </div>
    )
}

const StatisticLine = ({statName, value, suffix = ""}) => {
    return (
        <tr>
            <td>{statName}: </td>
            <td>{value}{suffix}</td>
        </tr>
    )
}
const ShowAnecdote = ({anecdote, vote}) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {vote} votes</p>
        </div>
    )
}
const Anecdote = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const handleClick = () => {
        const newRandom = Math.floor(Math.random() * (anecdotes.length))
        console.log(newRandom)
        setSelected(newRandom)
    }
    const handleVote = () => {
        const votesNew = [...votes]
        votesNew[selected] += 1
        setVotes(votesNew)
    }
    const maxAnecdote = () => {
        let max = 0, maxIndex = null
        votes.forEach((vote, index) => {
            if (vote > max) {
                max = vote
                maxIndex = index
            }
        })
        if (maxIndex === null) {
            return (<p>There is no favorite yet.</p>)
        }
        return (
            <ShowAnecdote anecdote={anecdotes[maxIndex]} vote={max}/>
        )
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <ShowAnecdote anecdote={anecdotes[selected]} vote={votes[selected]}/>
            <button onClick={handleVote} >vote</button>
            <button onClick={handleClick} >next anecdote</button>
            <h1>Anecdote with most votes</h1>
            {maxAnecdote()}
        </div>
    )
}

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
            <Anecdote />
        </div>
    )
}

export default App
import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer.js'
import {setNotification, removeNotification} from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const ancedotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = ancedotes.filter((anecdote) => anecdote.content.includes(filter))
  const anecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
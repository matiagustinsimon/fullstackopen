import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const ancedotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = ancedotes.filter((anecdote) => anecdote.content.includes(filter))
  const anecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote))} >vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
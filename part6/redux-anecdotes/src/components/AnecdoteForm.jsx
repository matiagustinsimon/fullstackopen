import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer.js'
import {removeNotification, setNotification} from '../reducers/notificationReducer.js'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    const newAnecdote = { content, id: getId(), votes: 0}
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You created '${newAnecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm
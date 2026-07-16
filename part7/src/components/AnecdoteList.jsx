const Anecdote = ({ anecdote, deleteAnecdote }) => {
  return (
    <li>
      {anecdote.content}
      <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
    </li>
  )
}

const AnecdoteList = ({ anecdotes, deleteAnecdote }) => {
  console.log(`anecdotes: ${anecdotes}`)
  anecdotes.map((anecdote) => (console.log(anecdote)))

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} deleteAnecdote={deleteAnecdote} />)}
      </ul>
    </div>
  )
}

export default AnecdoteList

const AnecdoteList = ({ anecdotes }) => {
  console.log(`anecdotes: ${anecdotes}`)
  anecdotes.map((anecdote) => (console.log(anecdote)))

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}</li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote} from './services/anecdoteService.js'
import { useContext } from 'react'
import NotificationContext from './NotificationContex.jsx'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((anecdote) => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notificationDispatch({ type: 'VOTE', content: updatedAnecdote.content })
      setTimeout(()=> notificationDispatch({type: 'RESET'}), 5000)
    }
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return < Notification message={'anecdote service not available.'}/>
  }

  const anecdotes = result.data

  return (
    <div>
      < Notification />
      <h3>Anecdote app</h3>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

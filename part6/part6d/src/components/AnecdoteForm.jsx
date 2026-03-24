import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdoteService.js'
import { useContext } from 'react'
import NotificationContext from '../NotificationContex.jsx'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'CREATE', content: newAnecdote.content })
      setTimeout(()=> notificationDispatch({type: 'RESET'}), 5000)
    },
    onError: (error) => {
        if ( error.message === 'too short anecdote, must have length 5 or more') {
          notificationDispatch({ type: 'ERROR', content: error.message })
          setTimeout(()=> notificationDispatch({type: 'RESET'}), 5000)
        }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
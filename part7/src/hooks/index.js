import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes.js'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => { setValue('') }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (newAnecdote) => {
    const anecdote = await anecdoteService.createNew(newAnecdote)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const deleteAnecdote = async (id) => {
    try {
      await anecdoteService.remove(id)
      setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    } catch (error) {
      console.error("Deletion failed:", error)
    }
  }

  return {anecdotes, addAnecdote, deleteAnecdote}
}
import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import {removeNotification, setNotification} from './notificationReducer.js'

const handleVote = (state, id) => {
  const anecdote = state.find(a => a.id === id)
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return state.map(a => a.id === id ? votedAnecdote : a)
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      return handleVote(state, action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const {setAnecdotes, addAnecdote, addVote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`You created '${newAnecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    console.log(votedAnecdote)
    dispatch(addVote(votedAnecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export default anecdoteSlice.reducer
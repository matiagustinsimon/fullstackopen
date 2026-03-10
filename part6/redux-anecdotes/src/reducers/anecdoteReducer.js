import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const handleVote = (state, id) => {
  const anecdote = state.find(a => a.id === id)
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return state.map(a => a.id === id ? votedAnecdote : a)
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      return handleVote(state, action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const {setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const {createAnecdote, voteAnecdote, } = anecdoteSlice.actions
export default anecdoteSlice.reducer
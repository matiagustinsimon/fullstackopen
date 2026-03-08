import {createSlice} from '@reduxjs/toolkit'

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

export const {createAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
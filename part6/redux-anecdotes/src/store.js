import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer.js'

const store = configureStore({
  reducer: anecdoteReducer
})

export default store
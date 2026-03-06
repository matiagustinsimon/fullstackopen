const reducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.payload
  }
  return state
}

export const filterAnecdote = filter => {
  return {
    type: 'FILTER',
    payload: filter
  }
}

export default reducer
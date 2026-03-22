import {useDispatch} from 'react-redux'
import {filterAnecdote} from '../reducers/filterReducer.js'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(filterAnecdote(filter))
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

const {addNotification, removeNotification} = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => dispatch(removeNotification()), seconds * 1000)
  }
}
export default notificationSlice.reducer
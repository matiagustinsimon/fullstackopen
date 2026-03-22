import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {text: '', id: null},
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return {text: '', id: null}
    }
  }
})

const {addNotification, removeNotification} = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return (dispatch, getState) => {
    const currentNotificationID = getState()
    if (currentNotificationID.notification.id) {
      clearTimeout(currentNotificationID.notification.id)
    }
    const timeOutID = setTimeout(() => dispatch(removeNotification()), seconds * 1000)
    dispatch(addNotification({text: text, id: timeOutID}))
  }
}
export default notificationSlice.reducer
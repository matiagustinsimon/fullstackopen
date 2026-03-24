import { useContext } from 'react'
import NotificationContext from '../NotificationContex.jsx'

const Notification = ({message}) => {
  const { notification } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (message) {
    return (<div>{message}</div>)
  }
  
  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

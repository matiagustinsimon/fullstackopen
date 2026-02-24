import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogCreate from './components/BlogCreate'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogList = ({blogs, setBlogs, setNotification}) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>)}
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({message: 'Succesful login', type: 'text'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({message: 'wrong credentials', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  if (!user) {
    return (
      <>
        {notification ? <Notification message={notification.message} type={notification.type} /> : null}
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    )
  }

  return (
    <>
      {notification ? <Notification message={notification.message} type={notification.type} /> : null}
      <div>
        <span>{user.username} logged in</span>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <Togglable buttonShow={'Create Blog'} buttonHide={'Cancel'} ref={blogFormRef}>
        <BlogCreate
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <BlogList blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
    </>
  )
}

export default App
import {useState} from 'react'
import blogService from '../services/blogs'

const FormPiece = ({state, name, setName}) => {
  return (
    <div>
      <label>
        {name}
        <input
          type="text"
          value={state}
          onChange={({ target }) => setName(target.value)}
        />
      </label>
    </div>
  )
}

const BlogCreate = ({blogs, setBlogs, setNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = { title, author, url }
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, type: 'text'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (error) {
      setNotification({message: error.response.data.error, type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <h2>create new</h2>
      <FormPiece state={title} name={'title'} setName={setTitle} />
      <FormPiece state={author} name={'author'} setName={setAuthor} />
      <FormPiece state={url} name={'url'} setName={setUrl} />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogCreate
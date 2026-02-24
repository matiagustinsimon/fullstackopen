import './Blog.css'
import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setNotification, user }) => {
  console.log(blog)
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const deleteShowWhenVisible = { display: visible && blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleNewLike = async () => {
    try {
      const putBlog = {...blog, likes: blog.likes + 1, user: blog.user.id}
      const returnedBlog = await blogService.update(putBlog.id, putBlog)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
      setNotification({message: `the blog ${returnedBlog.title} by ${returnedBlog.author} has a new like`, type: 'text'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification({message: error.response?.data?.error || 'Error liking blog', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => blog.id !== b.id))
        setNotification({message: `the blog ${blog.title} by ${blog.author} has been deleted`, type: 'text'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (error) {
        setNotification({message: error.response?.data?.error || 'Error deleting the blog', type: 'error'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }
  return (
    <div className="blog-container">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
      </div>
      <div style={showWhenVisible}>
        likes {blog.likes}
        <button onClick={handleNewLike}>like</button>
      </div>
      <div style={showWhenVisible}>
        {blog.user.name}
      </div>
      <button style={deleteShowWhenVisible} onClick={handleDelete}>remove</button>
    </div>
  )
}

export default Blog
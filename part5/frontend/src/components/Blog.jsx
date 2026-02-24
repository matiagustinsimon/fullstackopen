import './Blog.css'
import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setNotification }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

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
    </div>
  )
}

export default Blog
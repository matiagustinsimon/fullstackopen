import './Blog.css'
import {useState} from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleNewLike = () => console.log('new like')
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
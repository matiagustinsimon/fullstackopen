import { useState } from 'react'

const FormPiece = ({ state, name, setName }) => {
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

const BlogCreate = ({ submitBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    submitBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
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
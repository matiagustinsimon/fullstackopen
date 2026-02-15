const Blog = require('../models/blog')

const nonExistingId = async () => {
  const blog = new Blog(
    { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 17 })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { blogsInDb, nonExistingId }
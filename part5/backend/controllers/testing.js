const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/create/:number', async (request, response) => {
  const anyUser = await User.findOne({})
  for (let i = 0; i < request.params.number; i++) {
    const blog = new Blog({
      title: `blog${i}`,
      author: `author${i}`,
      url: `url${i}`,
      likes: Math.floor(Math.random() * 50),
      user: anyUser.id
    })
    await blog.save()
  }
  response.status(201).end()
})

module.exports = router
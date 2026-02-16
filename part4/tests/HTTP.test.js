const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = require('./blogs_for_test')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('Testing HTTP methods', () => {
  test('HTTP GET BLOGS', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  test('The unique identifier property named id not _id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    response.body.forEach(blog => {assert.strictEqual('id' in blog, true)})
  })
  test('HTTP POST BLOGS', async () => {
    const newBlog = {
      title: 'Second class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 100
    }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const dbArray = await helper.blogsInDb()
    const titles = dbArray.map(blog => blog.title)
    assert(titles.includes('Second class tests'))
    assert.strictEqual(initialBlogs.length + 1, dbArray.length)
  })
  test('missing likes', async () => {
    const newBlog = {
      title: 'Second class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    }
    const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const responseBlog = await Blog.findById(response.body.id)
    assert(responseBlog.likes === 0)
    const dbArray = await helper.blogsInDb()
    assert.strictEqual(initialBlogs.length + 1, dbArray.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = require('./blogs_for_test')
const mongoose = require('mongoose')
// const helper = require('./test_helper')

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
})

after(async () => {
  await mongoose.connection.close()
})
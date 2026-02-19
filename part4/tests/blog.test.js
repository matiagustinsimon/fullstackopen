const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./blogs_test_helper')

const initialBlogs = helper.blogs

const api = supertest(app)

const newBlog = {
  title: 'Second class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 100
}

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
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const dbArray = await helper.blogsInDb()
    const titles = dbArray.map(blog => blog.title)
    assert(titles.includes('Second class tests'))
    assert.strictEqual(initialBlogs.length + 1, dbArray.length)
  })
  test('Missing likes', async () => {
    // eslint-disable-next-line no-unused-vars
    const { likes, ...blogWithoutLikes } = newBlog
    const response = await api.post('/api/blogs').send(blogWithoutLikes).expect(201).expect('Content-Type', /application\/json/)
    const responseBlog = await Blog.findById(response.body.id)
    assert(responseBlog.likes === 0)
    const dbArray = await helper.blogsInDb()
    assert.strictEqual(initialBlogs.length + 1, dbArray.length)
  })
  test('Missing title or url', async () => {
    // eslint-disable-next-line no-unused-vars
    const { title, ...blogWithoutTitle } = newBlog
    // eslint-disable-next-line no-unused-vars
    const { url, ...blogWithoutUrl } = newBlog
    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
  })
  test('HTTP DELETE BLOGS with valid id', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blogsBeforeDelete[0].id}`).expect(204)
    const blogsAfterDelete = await helper.blogsInDb()
    assert.strictEqual(blogsBeforeDelete.length - 1, blogsAfterDelete.length)
  })
  test('HTTP DELETE BLOGS with invalid id', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const invalidId = await helper.nonExistingId()
    await api.delete(`/api/blogs/${invalidId}`).expect(204)
    const blogsAfterDelete = await helper.blogsInDb()
    assert.strictEqual(blogsBeforeDelete.length, blogsAfterDelete.length)
  })
  test('HTTP PUT BLOGS with valid id', async () => {
    const blogsInDb = await helper.blogsInDb()
    const response = await api.put(`/api/blogs/${blogsInDb[0].id}`).send(newBlog).expect(200)
    const UpdatedPerson = response.body
    newBlog.id = blogsInDb[0].id
    assert.deepStrictEqual(UpdatedPerson, newBlog)
  })
  test('HTTP PUT BLOGS with invalid id', async () => {
    const invalidId = await helper.nonExistingId()
    await api.put(`/api/blogs/${invalidId}`).send(newBlog).expect(404)
  })
  test('UnknownEndpoint and malformatted id', async () => {
    const url = '/api/unknown'
    let response = await api.get(url).expect(404)
    assert.strictEqual(response.error.text, '{"error":"unknown endpoint"}')
    response = await api.post(url).send(newBlog).expect(404)
    assert.strictEqual(response.error.text, '{"error":"unknown endpoint"}')
    response = await api.put('/api/blogs/unknown').send(newBlog).expect(400)
    assert.strictEqual(response.error.text, '{"error":"malformatted id"}')
    response = await api.delete('/api/blogs/unknown').expect(400)
    assert.strictEqual(response.error.text, '{"error":"malformatted id"}')
  })
})

after(async () => {
  await mongoose.connection.close()
})
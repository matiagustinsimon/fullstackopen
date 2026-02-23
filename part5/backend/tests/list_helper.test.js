const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogsTestList = require('./blogs_for_test')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogsTestList[1]])
    assert.strictEqual(result, blogsTestList[1].likes)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogsTestList)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })
  test('when list has only one blog, result equals the given blog', () => {
    const result = listHelper.favoriteBlog([blogsTestList[1]])
    assert.deepStrictEqual(result, blogsTestList[1])
  })
  test('of a bigger list it finds the favorite right', () => {
    const result = listHelper.favoriteBlog(blogsTestList)
    assert.deepStrictEqual(result, blogsTestList[2])
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })
  test('when list has only one blog, result should be the only author with one blog', () => {
    const result = listHelper.mostBlogs([blogsTestList[1]])
    assert.deepStrictEqual(result, { author: blogsTestList[1].author, blogs: 1 })
  })
  test('of a bigger list it finds the one with most blogs', () => {
    const result = listHelper.mostBlogs(blogsTestList)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })
  test('when list has only one blog, result should be the only author with its likes', () => {
    const result = listHelper.mostLikes([blogsTestList[1]])
    assert.deepStrictEqual(result, { author: blogsTestList[1].author, likes: blogsTestList[1].likes })
  })
  test('of a bigger list it finds the one with most likes', () => {
    const result = listHelper.mostLikes(blogsTestList)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
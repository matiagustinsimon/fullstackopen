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
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./users_test_helper')

const api = supertest(app)
const newUser = { username: 'testPerson68', name: 'Test Person', password: '123456' }

const assertInvalidUserCreation = async (invalidUser, expectedErrorMessage) => {
  const dbBegining = await helper.usersInDb()

  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

  const dbEnding = await helper.usersInDb()

  assert.deepStrictEqual(response.body, { error: expectedErrorMessage })
  assert.strictEqual(dbEnding.length, dbBegining.length)
}

beforeEach( async () => {
  await User.deleteMany({})
  await User.insertMany(helper.users)
})

describe('User tests', () => {
  test('Should be able to create a new valid user', async () => {
    const dbBegining = await helper.usersInDb()
    const response = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    const dbEnding = await helper.usersInDb()
    assert.strictEqual(response.body.username, newUser.username)
    assert.strictEqual(response.body.name, newUser.name)
    assert.strictEqual(dbEnding.length, dbBegining.length + 1)
  })
  test('Should not be able to create a new invalid user (no username)', async () => {
    // eslint-disable-next-line no-unused-vars
    const { username, ...invalidUser } = newUser
    await assertInvalidUserCreation(
      invalidUser,
      'User validation failed: username: Path `username` is required.'
    )
  })
  test('Should not be able to create a new invalid user (no password)', async () => {
    // eslint-disable-next-line no-unused-vars
    const { password, ...invalidUser } = newUser
    await assertInvalidUserCreation(
      invalidUser,
      'password missing'
    )
  })
  test('Should not be able to create a new invalid user (short password)', async () => {
    const invalidUser = { username: 'testPerson68', name: 'Test Peson', password: '16' }
    await assertInvalidUserCreation(
      invalidUser,
      'password must be at least 3 characters long'
    )
  })
  test('Should not be able to create a new invalid user (short username)', async () => {
    const invalidUser = { username: 't8', name: 'Test Peson', password: '123456' }
    await assertInvalidUserCreation(
      invalidUser,
      'User validation failed: username: Path `username` (`t8`, length 2) is shorter than the minimum allowed length (3).'
    )
  })
  test('Should not be able to create a new invalid user (not unique)', async () => {
    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    const invalidUser = { username: 'testPerson68', name: 'Random Person', password: '654321' }
    await assertInvalidUserCreation(
      invalidUser,
      'expected `username` to be unique'
    )
  })
})

after(async () => {
  await mongoose.connection.close()
})
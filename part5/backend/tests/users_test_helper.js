const User = require('../models/user')

const users = [
  {
    username: 'testPerson1',
    name: 'Test Peson',
    password: '1234'
  },
  {
    username: 'testPerson2',
    name: 'Test Peson',
    password: '4321'
  }]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { users, usersInDb }
// noinspection JSCheckFunctionSignatures
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password) {
    return response.status(400).json({
      error: 'password missing'
    })
  }
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await user.save()
  return response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter
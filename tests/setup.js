const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../server/models/User')
const { mongoUri, mongoOptions, jwtOptions, jwtSecret } = require('../server/config')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'User One',
  email: 'userone@test.com',
  password: 'Test1234',
  token: ''
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwoToken = jwt.sign({ _id: userTwoId }, jwtSecret, jwtOptions)
const userTwo = {
  _id: userTwoId,
  name: 'User Two',
  email: 'usertwo@test.com',
  password: 'Test1234',
  token: userTwoToken
}

const setupDatabase = async () => {
  try {
    await mongoose.connect(mongoUri, mongoOptions)
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
  } catch (err) {
    console.error(err)
  }
}

const cleanupDatabase = async () => {
  try {
    await mongoose.disconnect()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  userTwoToken,
  setupDatabase,
  cleanupDatabase
}

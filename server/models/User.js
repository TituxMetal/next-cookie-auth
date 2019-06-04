const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { jwtSecret, jwtOptions } = require('../config')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    token: { type: String }
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  const user = this

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(12)

    user.password = await bcrypt.hash(user.password, salt)
  }
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const _id = user.id.toString()
  const token = await jwt.sign({ _id }, jwtSecret, jwtOptions)

  user.token = token

  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  const errorMessage = JSON.stringify({
    errors: { message: 'Unable to login. Bad credentials.' }
  })

  if (!user) {
    throw new Error(errorMessage)
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error(errorMessage)
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User

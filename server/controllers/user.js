const User = require('../models/User')

const register = async ({ value }, res) => {
  const { name, email, password } = value.body

  try {
    const foundUser = await User.find({ $or: [{ email }, { name }] }).countDocuments()

    if (foundUser) {
      const error = JSON.stringify({ errors: 'User already exists' })

      throw new Error(error)
    }

    const user = new User({ email, name, password })
    const token = await user.generateAuthToken()

    await user.save()

    res.status(201).json({ user })
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const UserController = { register }

module.exports = UserController
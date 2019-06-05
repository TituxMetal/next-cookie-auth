const { sessName } = require('../config')
const User = require('../models/User')

const register = async ({ value, session }, res) => {
  const { name, email, password } = value.body

  try {
    const foundUser = await User.find({ $or: [{ email }, { name }] }).countDocuments()

    if (foundUser) {
      const error = JSON.stringify({ errors: { message: 'User already exists' } })

      throw new Error(error)
    }

    const user = new User({ email, name, password })
    const token = await user.generateAuthToken()

    session.accessToken = token
    await user.save()

    res.status(201).json({ user, success: true })
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const login = async ({ session, value }, res) => {
  const { email, password } = value.body

  try {
    const user = await User.findByCredentials(email, password)

    const token = await user.generateAuthToken()

    session.accessToken = token
    user.token = token
    await user.save()

    res.send({ user, success: true })
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const logout = async (req, res) => {
  if (req.user) {
    const { email, token } = req.user
    const logoutUser = await User.findOne({ $or: [{ email }, { token }] })

    logoutUser.token = ''
    await logoutUser.save()
    delete req.user
  }

  delete req.session

  res.clearCookie(sessName)
  res.json({ success: true })
}

const me = async ({ user }, res) =>
  user ? res.json({ user, success: true }) : res.json({ user: false, success: false })

const UserController = { register, login, logout, me }

module.exports = UserController

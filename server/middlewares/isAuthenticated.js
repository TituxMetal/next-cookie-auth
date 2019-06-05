const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { jwtSecret, sessName } = require('../config')

const isAuthenticated = async (req, res, next) => {
  const headerToken = req.header('authorization') || null
  const sessionToken = req.session && req.session.accessToken
  const token = headerToken ? headerToken.replace('Bearer ', '') : sessionToken

  try {
    const { _id } = await jwt.verify(token, jwtSecret)
    const user = await User.findOne({ _id, token })

    req.user = user.toJSON()

    next()
  } catch (e) {
    await User.findOneAndUpdate({ token }, { $set: { token: '' } }, { new: true })
    res.clearCookie(sessName)

    delete req.user
    delete req.session

    next()
  }
}

module.exports = isAuthenticated

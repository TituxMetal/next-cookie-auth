const session = require('express-session')

const store = require('../store')

const { isProd, sessName, sessSecret, sessLifetime } = require('../config')

module.exports = session({
  store,
  name: sessName,
  secret: sessSecret,
  resave: true,
  rolling: true,
  proxy: true,
  saveUninitialized: false,
  cookie: { maxAge: parseInt(sessLifetime), sameSite: true, secure: isProd }
})

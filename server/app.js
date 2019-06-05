const express = require('express')

const { session } = require('./middlewares')

const server = express()

server.use(express.json())

server.use(session)

server.use('/api/users', require('./routes/user'))
server.use('/api', require('./routes/welcome'))

server.use((err, _req, res, _next) => {
  const { status = 500, message } = err
  res.status(status).json(message)
})

module.exports = server

const router = require('express').Router()

const UserController = require('../controllers/user')
const { validateBody } = require('../middlewares')

const { register } = require('../validation')

router.post('/register', validateBody(register), UserController.register)

module.exports = router

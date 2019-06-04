const router = require('express').Router()

const UserController = require('../controllers/user')
const { validateBody } = require('../middlewares')

const { register, login } = require('../validation')

router.post('/register', validateBody(register), UserController.register)
router.post('/login', validateBody(login), UserController.login)

module.exports = router

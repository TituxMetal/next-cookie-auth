const router = require('express').Router()

const UserController = require('../controllers/user')
const { isAuthenticated, validateBody } = require('../middlewares')

const { register, login } = require('../validation')

router.post('/register', validateBody(register), UserController.register)
router.post('/login', validateBody(login), UserController.login)
router.post('/me', isAuthenticated, UserController.logout)
router.get('/me', isAuthenticated, UserController.me)

module.exports = router

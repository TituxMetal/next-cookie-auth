const router = require('express').Router()

const UserController = require('../controllers/user')
const { isAuthenticated, validateBody } = require('../middlewares')

const { register, login, edit } = require('../validation')

router.post('/register', validateBody(register, false), UserController.register)
router.post('/login', validateBody(login, false), UserController.login)
router.post('/me', isAuthenticated, UserController.logout)
router.get('/me', isAuthenticated, UserController.me)
router.patch('/me', isAuthenticated, validateBody(edit, true), UserController.edit)
router.delete('/me', isAuthenticated, UserController.remove)

module.exports = router

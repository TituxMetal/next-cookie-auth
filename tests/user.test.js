const request = require('supertest')

const server = require('../server/app')
const User = require('../server/models/User')
const {
  userOne,
  userTwo,
  userTwoId,
  userTwoToken,
  setupDatabase,
  cleanupDatabase
} = require('./setup')

describe('Users Routes', () => {
  const testUser = { name: 'test', email: 'test@test.com', password: 'test1234' }

  beforeEach(async () => {
    await setupDatabase()
    expect(await User.find().countDocuments()).toBe(2)
  })

  afterEach(async () => await cleanupDatabase())

  describe('POST /api/users/register => Register user', () => {
    it('should register a new user', async () => {
      const { body } = await request(server)
        .post('/api/users/register')
        .send(testUser)
        .expect(201)

      const { password } = await User.findOne({ email: testUser.email })

      expect(password).not.toEqual(testUser.password)
      expect(body.user.password).not.toBeDefined()
      expect(body.user.token).toBeDefined()

      const { name, email } = testUser
      expect(body.user).toMatchObject({ name, email })
    })

    it('should not create user if the same user name or email already exists', async () => {
      const { name, email, password } = userOne
      const { error } = await request(server)
        .post('/api/users/register')
        .send({ email, name, password })
        .expect(400)

      expect(await User.find().countDocuments()).toBe(2)

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBeDefined()
      expect(errors.message).toBe('User already exists')
    })

    it('should not create user if invalid data given', async () => {
      const { error } = await request(server)
        .post('/api/users/register')
        .send({ name: '   abc   ', email: 'not an email' })
        .expect(400)

      expect(await User.find().countDocuments()).toBe(2)

      const { errors } = JSON.parse(error.text)

      expect(errors.name).toBeDefined()
      expect(errors.email).toBeDefined()
      expect(errors.password).toBeDefined()
      expect(errors.name).toBe('"Name field" length must be at least 4 characters long')
      expect(errors.email).toBe('"Email field" must be a valid email')
      expect(errors.password).toBe('"Password field" is required')
    })
  })

  describe('POST /api/users/login => Log a user in', () => {
    it('should log the user in', async () => {
      const { _id, name, email, password } = userOne
      const { body } = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)

      expect(body.user).toMatchObject({ _id: _id.toString(), name, email })
      expect(body.user.token).toBeDefined()
      expect(body.success).toBe(true)
    })

    it('should return an error message if bad credentials given', async () => {
      const { email, password } = testUser
      const { error, body } = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBe('Unable to login. Bad credentials.')
    })

    it('should return error message if invalid data given', async () => {
      const { error, body } = await request(server)
        .post('/api/users/login')
        .send({ email: '   invalid@email .com   ', password: '   abc   ' })
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors.email).toBeDefined()
      expect(errors.password).toBeDefined()
      expect(errors.email).toBe(`"Email field" must be a valid email`)
      expect(errors.password).toBe(`"Password field" length must be at least 8 characters long`)
    })
  })

  describe('POST /api/users/me => Logout user', () => {
    it('should logout current user authenticated with token header', async () => {
      const { email, token } = userTwo
      const { body } = await request(server)
        .post('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(body).toEqual({ success: true })

      const user = await User.findOne({ email })

      expect(user.token).toBe('')
    })

    it('should logout current user authenticated with session cookie', async () => {
      const { email, password } = userTwo
      const response = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)

      expect(response.header['set-cookie']).toBeDefined()

      const cookie = response.header['set-cookie'][0].split(';')[0]
      const { header, body } = await request(server)
        .post('/api/users/me')
        .set('Cookie', cookie)
        .expect(200)

      expect(header['set-cookie'][0].split(';')[0]).toBe('token=')

      expect(body).toEqual({ success: true })

      const { token } = await User.findOne({ email })
      expect(token).toEqual('')
    })

    it('should return status 200 and success: true if user is already logged out', async () => {
      const { header, body } = await request(server)
        .post('/api/users/me')
        .expect(200)

      expect(header['set-cookie'][0].split(';')[0]).toBe('token=')
      expect(body).toEqual({ success: true })
    })
  })

  describe('GET /api/users/me => Check the user authentication', () => {
    it('should return the user data and success must be true if the user is authenticated with bearer token header', async () => {
      const { body } = await request(server)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .expect(200)

      expect(body.success).toBe(true)

      const { _id, name, email, token } = userTwo

      expect(body.user).toMatchObject({ _id: _id.toString(), name, email, token })
    })

    it('should return the user data and success must be true if the user is authenticated with session cookie', async () => {
      const { _id, email, name, password, token } = userTwo
      const { header } = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      expect(header['set-cookie']).toBeDefined()

      const cookie = header['set-cookie'][0].split(';')[0]
      const { body } = await request(server)
        .get('/api/users/me')
        .set('Cookie', cookie)
        .expect(200)

      expect(body.user).toMatchObject({ _id: _id.toString(), name, email })
      expect(body.user.token).toBeDefined()
      expect(body.success).toBe(true)
    })

    it('should return user: false and success: false if the user is not authenticated', async () => {
      const { header, body } = await request(server)
        .get('/api/users/me')
        .expect(200)

      expect(header['set-cookie']).toBeDefined()

      const cookie = header['set-cookie'][0].split(';')[0]

      expect(cookie).toBe('token=')

      expect(body.user).toBe(false)
      expect(body.success).toBe(false)
    })
  })

  describe('PATCH /api/users/me => Edit user', () => {
    it('should edit the current logged in user and return updated user data', async () => {
      const updatedUser = {
        name: 'User Two Update',
        email: 'usertwoupdate@test.com',
        password: 'newSuperTestPassword'
      }
      const { body } = await request(server)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send(updatedUser)
        .expect(200)

      expect(body.success).toBe(true)

      const { name, email } = updatedUser

      expect(body.user).toMatchObject({ name, email })
    })

    it('should not edit the user if it is not authenticated', async () => {
      const { error, body } = await request(server)
        .patch('/api/users/me')
        .send({ name: 'update' })
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBe('You must be authenticated')
    })

    it('should not update invalid user fields', async () => {
      const { error, body } = await request(server)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send({ name: 'updated', location: 'not valid field' })
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors).toMatchObject({ location: '"location" is not allowed' })

      const { name, location } = await User.findOne({ _id: userTwoId })

      expect(name).not.toBe('updated')
      expect(location).not.toBeDefined()
    })
  })

  describe('DELETE /api/users/me => Delete user', () => {
    it('should delete the current logged in user', async () => {
      const { body } = await request(server)
        .delete('/api/users/me')
        .set('Authorization', `${userTwoToken}`)
        .expect(200)

      expect(body).toEqual({ success: true })

      const user = await User.findById(userTwoId)

      expect(user).toBe(null)
    })

    it('should not delete user if not authenticated', async () => {
      const { error, body } = await request(server)
        .delete('/api/users/me')
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBe('You must be authenticated')
    })
  })
})

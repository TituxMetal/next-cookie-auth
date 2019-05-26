const request = require('supertest')

const server = require('../server/app')
const User = require('../server/models/User')
const { userOne, setupDatabase, cleanupDatabase } = require('./setup')

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

      expect(errors).toBeDefined()
      expect(errors).toBe('User already exists')
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
})

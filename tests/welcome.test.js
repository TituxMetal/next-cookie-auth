const request = require('supertest')

const server = require('../server/app')

describe('Welcome route', () => {
  describe('GET /api/welcome', () => {
    it('should return the welcome message', async () => {
      const { body } = await request(server)
        .get('/api/welcome')
        .send()
        .expect(200)

      expect(body.message).toBe('Hello from express server')
    })
  })
})

module.exports = {
  isProd: process.env.NODE_ENV === 'production' || false,
  port: process.env.PORT || 3000,
  // Mongodb Setup
  mongoOptions: { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false },
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  // JsonWebToken Setup
  jwtSecret: process.env.JWT_SECRET || '$supersecretjsonwebtoken',
  jwtOptions: { expiresIn: 1000 * 60 * 60 * 24 * 2 },
  // Redis setup
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
  redisPassword: process.env.REDIS_PASSWORD || 'redisDev',
  // Session setup
  sessName: process.env.SESS_NAME || 'token',
  sessSecret: process.env.SESS_SECRET || 'session!secret!',
  sessLifetime: process.env.SESS_LIFETIME || 1000 * 60 * 60 * 24 * 2 // <- 2 days
}

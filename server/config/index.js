module.exports = {
  isProd: process.env.NODE_ENV === 'production' || false,
  port: process.env.PORT || 3000,
  // Mongodb Setup
  mongoOptions: { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false },
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  // JsonWebToken Setup
  jwtSecret: process.env.JWT_SECRET || '$supersecretjsonwebtoken',
  jwtOptions: { expiresIn: '2 days' }
}

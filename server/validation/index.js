const Joi = require('@hapi/joi')

// Email field validation
const email = Joi.string()
  .email()
  .trim()
  .label('Email field')

// Name field validation
const name = Joi.string()
  .min(4)
  .max(254)
  .trim()
  .label('Name field')

// Password field validation
const password = Joi.string()
  .min(8)
  .max(30)
  .trim()
  .label('Password field')

const register = Joi.object().keys({
  email: email.required(),
  name: name.required(),
  password: password.required()
})

module.exports = { register }

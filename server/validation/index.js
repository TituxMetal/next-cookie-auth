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

const isUpdate = field =>
  Joi.when('$update', {
    is: Joi.boolean()
      .valid(true)
      .required(),
    then: field.optional(),
    otherwise: field.required()
  })

const register = Joi.object().keys({
  email: isUpdate(email),
  name: isUpdate(name),
  password: isUpdate(password)
})

const login = Joi.object().keys({
  email: isUpdate(email),
  password: isUpdate(password)
})

const edit = Joi.object().keys({
  email: isUpdate(email),
  name: isUpdate(name),
  password: isUpdate(password)
})

module.exports = { register, login, edit }

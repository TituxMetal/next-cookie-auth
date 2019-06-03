import { useContext } from 'react'

import { UserContext } from '../../context'
import { InputField } from '../form'
import { Form, Button, Error } from '../styled'

const RegisterForm = () => {
  const { fields, error, submitRegister } = useContext(UserContext)

  const handleSubmit = async event => {
    event.preventDefault()
    await submitRegister()
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error.message && <Error>{error.message}</Error>}
      <InputField name='name' type='text' label='Name' value={fields.name} />
      <InputField name='email' type='email' label='Email' value={fields.email} />
      <InputField name='password' type='password' label='Password' value={fields.password} />
      <Button type='submit'>Register</Button>
    </Form>
  )
}

export default RegisterForm

import { useContext } from 'react'

import { UserContext } from '../../context'
import { InputField } from '../form'
import { Form, Button, Error } from '../styled'

const LoginForm = () => {
  const { fields, error, submitAuth } = useContext(UserContext)

  const handleSubmit = async event => {
    event.preventDefault()
    const { email, password } = fields
    await submitAuth({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error.message && <Error>{error.message}</Error>}
      <InputField name='email' type='email' label='Email' value={fields.email} />
      <InputField name='password' type='password' label='Password' value={fields.password} />
      <Button type='submit'>Login</Button>
    </Form>
  )
}

export default LoginForm

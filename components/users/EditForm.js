import { useContext, useEffect } from 'react'

import { UserContext } from '../../context'
import { InputField } from '../form'
import { Form, Button, Error } from '../styled'

const EditForm = () => {
  const { user, fields, setFields, handleChange, error, submitUpdate } = useContext(UserContext)

  useEffect(() => {
    const { email, name } = user
    setFields({ ...fields, email, name })
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    await submitUpdate()
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error.message && <Error>{error.message}</Error>}
      <InputField name='name' type='text' label='Name' value={fields.name} />
      <InputField name='email' type='email' label='Email' value={fields.email} />
      <InputField name='password' type='password' label='Password' value={fields.password} />
      <Button type='submit'>Update</Button>
    </Form>
  )
}

export default EditForm

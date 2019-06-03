import { Page } from '../components/layout'
import { Title } from '../components/styled'
import { RegisterForm } from '../components/users'

const Register = () => {
  return (
    <Page title='Register'>
      <Title>Register Page</Title>
      <RegisterForm />
    </Page>
  )
}

export default Register

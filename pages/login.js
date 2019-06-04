import { Page } from '../components/layout'
import { Title } from '../components/styled'
import { LoginForm } from '../components/users'

const Login = () => {
  return (
    <Page title='Login'>
      <Title>Login Page</Title>
      <LoginForm />
    </Page>
  )
}

export default Login

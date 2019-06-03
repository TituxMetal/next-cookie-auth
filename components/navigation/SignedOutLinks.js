import { ActiveLink } from '../navigation'

const SignedOutLinks = () => (
  <>
    <ActiveLink href='/register'>
      <a>Register</a>
    </ActiveLink>
    <ActiveLink href='/login'>
      <a>Login</a>
    </ActiveLink>
  </>
)

export default SignedOutLinks

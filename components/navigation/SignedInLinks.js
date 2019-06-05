import { ActiveLink } from '../navigation'
import { NavButton } from '../styled'

const SignedInLinks = ({ logout }) => (
  <>
    <ActiveLink href='/profile'>
      <a>Profile</a>
    </ActiveLink>
    <NavButton onClick={logout}>Logout</NavButton>
  </>
)

export default SignedInLinks

import { ActiveLink } from '../navigation'
import { NavButton } from '../styled'

const SignedInLinks = () => (
  <>
    <ActiveLink href='/profile'>
      <a>Profile</a>
    </ActiveLink>
    <NavButton>Logout</NavButton>
  </>
)

export default SignedInLinks

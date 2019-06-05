import { useContext } from 'react'

import { UserContext } from '../../context'
import { NavBar } from '../styled'
import { ActiveLink, SignedInLinks, SignedOutLinks } from '../navigation'

const Menu = props => {
  const { isAuthenticated, handleLogout } = useContext(UserContext)

  return (
    <NavBar>
      <div className='brand'>
        <ActiveLink href='/'>
          <a>Next Cookie Auth</a>
        </ActiveLink>
      </div>
      <section>
        <ActiveLink href='/'>
          <a>Home</a>
        </ActiveLink>
        <ActiveLink href='/about'>
          <a>About</a>
        </ActiveLink>
        {isAuthenticated ? <SignedInLinks logout={handleLogout} /> : <SignedOutLinks />}
      </section>
    </NavBar>
  )
}

export default Menu

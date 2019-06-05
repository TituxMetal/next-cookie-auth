import { useContext } from 'react'

import { UserContext } from '../../context'
import { NavBar } from '../styled'
import { ActiveLink, SignedInLinks, SignedOutLinks } from '../navigation'

const Menu = props => {
  const { isAuthenticated } = useContext(UserContext)

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
        {isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
      </section>
    </NavBar>
  )
}

export default Menu

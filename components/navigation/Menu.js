import { NavBar } from '../styled'
import { ActiveLink } from '../navigation'

const Menu = () => {
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
      </section>
    </NavBar>
  )
}

export default Menu
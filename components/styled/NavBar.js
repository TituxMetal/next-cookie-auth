import styled from 'styled-components'

const NavBar = styled.nav`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textOnMain};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  section {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin-right: 0.5rem;
      padding: 0.5rem;
      color: ${props => props.theme.textOnMain};
      text-decoration: none;

      &.active {
        color: ${props => props.theme.secondaryLight};

        &:after {
          content: '';
          display: block;
          width: calc(100% + 8px);
          height: 3px;
          background-color: ${props => props.theme.secondary};
          margin-top: -3px;
          margin-left: -4px;
        }
      }

      &:hover {
        color: ${props => props.theme.secondary};
      }
    }
  }

  .brand a {
    font-weight: bold;
    font-size: 1.4rem;
    margin-left: 0.5rem;
    color: ${props => props.theme.secondaryLight};
    text-decoration: none;
  }
`

export default NavBar

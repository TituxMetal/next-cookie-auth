import styled from 'styled-components'

const NavButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  font: inherit;
  line-height: inherit;
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${props => props.theme.textOnMain};

  &:hover {
    color: ${props => props.theme.secondary};
  }
`

export default NavButton

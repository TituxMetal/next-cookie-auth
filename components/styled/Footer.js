import styled from 'styled-components'

const Footer = styled.footer`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textOnPrimary};
  font-size: 0.8rem;
  max-width: 100vw;
  display: flex;
  justify-content: center;
`

export default Footer

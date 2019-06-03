import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.secondary};
  border-radius: 5px;
  color: ${props => props.theme.secondaryLight};
  cursor: pointer;
  font: inherit;
  margin: auto;
  padding: 0.3rem;
  transition: all ease-in-out 0.3s;
  width: 30%;

  &:hover {
    border-radius: 3px;
    width: 100%;
  }
`

export default Button

import styled from 'styled-components'

const Error = styled.p`
  padding: 0.5rem 0;
  margin: 1rem auto 0;
  color: ${props => props.theme.errorSecondary};
  flex-grow: 1;
  border: 2px solid ${props => props.theme.errorPrimary};
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  width: 100%;
`

export default Error

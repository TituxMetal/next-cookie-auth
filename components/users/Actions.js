import styled from 'styled-components'

import { Button } from '../styled'

const Actions = styled.section`
  display: flex;
  flex-direction: row;
  align-items: space-around;

  .edit {
    color: ${props => props.theme.primaryLight};
  }

  .delete {
    color: ${props => props.theme.errorSecondary};
  }

  button:hover {
    width: 30%;
  }
`

export default ({ edit }) => (
  <Actions>
    <Button className='edit' onClick={() => edit(true)}>
      Edit Profile
    </Button>
    <Button className='delete'>Delete Profile</Button>
  </Actions>
)

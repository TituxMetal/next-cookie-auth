import { useContext } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../context'
import { Error } from '../styled'

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem 0;

  &.error {
    .field {
      label {
        color: ${props => props.theme.errorSecondary};
        font-weight: 600;
      }

      input {
        color: ${props => props.theme.errorPrimary};
        font-weight: 600;
        border-bottom: 2px solid ${props => props.theme.errorSecondary};
      }
    }
  }

  .field {
    display: flex;
    width: 100%;

    label {
      margin-right: 1rem;
      color: ${props => props.theme.secondaryLight};
    }

    input {
      border: none;
      border-bottom: 1px solid ${props => props.theme.secondary};
      background: transparent;
      font: inherit;
      color: inherit;
      line-height: inherit;
      padding: 0;
      margin: 0;
      flex-grow: 1;
    }
  }
`

export default ({ name, type, label, value }) => {
  const { handleChange, error } = useContext(UserContext)

  return (
    <InputField className={error[name] && 'error'}>
      <div className='field'>
        <label htmlFor={name}>{label}:</label>
        <input onChange={handleChange} name={name} id={name} type={type} value={value} />
      </div>
      {error[name] && <Error>{error[name]}</Error>}
    </InputField>
  )
}

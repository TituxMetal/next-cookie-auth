import { useContext } from 'react'

import { UserContext } from '../../context'

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
    <section>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </section>
  )
}

export default Profile

import { useContext } from 'react'

import { UserContext } from '../../context'

const Profile = () => {
  const { user } = useContext(UserContext)
  const userDate = new Date(user.createdAt).toLocaleDateString()

  return (
    <section>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Created Date: {userDate}</p>
    </section>
  )
}

export default Profile

import { useEffect, useContext } from 'react'
import Router from 'next/router'

import { UserContext } from '../context'
import { Page } from '../components/layout'
import { UserProfile } from '../components/users'
import { Title } from '../components/styled'

const Profile = () => {
  const { isAuthenticated } = useContext(UserContext)

  useEffect(
    () => {
      !isAuthenticated && Router.push('/login')
    },
    [isAuthenticated]
  )

  return (
    isAuthenticated && (
      <Page title='Profile Page'>
        <Title>Your Profile</Title>
        <UserProfile />
      </Page>
    )
  )
}

export default Profile

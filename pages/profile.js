import { useEffect, useContext } from 'react'
import Router from 'next/router'

import { UserContext } from '../context'
import { Page } from '../components/layout'
import { UserProfile, EditForm, Actions } from '../components/users'
import { Title } from '../components/styled'

const Profile = () => {
  const { isAuthenticated, editMode, setEditMode, submitDelete } = useContext(UserContext)

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
        {editMode ? (
          <EditForm />
        ) : (
          <>
            <UserProfile />
            <Actions edit={setEditMode} remove={submitDelete} />
          </>
        )}
      </Page>
    )
  )
}

export default Profile

import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { AuthContext } from 'context/AuthContext'

export const HomeWrapper = () => {
  const { isLoaded, currentUser, currentFirebaseUser } = useContext(AuthContext)
  if (isLoaded && currentUser && currentFirebaseUser) {
    return <Redirect to="/home" />
  }
  return <WelcomeWrapper />
}

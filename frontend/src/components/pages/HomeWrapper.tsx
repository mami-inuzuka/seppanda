import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { UserContext } from 'context/UserContext'

export const HomeWrapper = () => {
  const { isLoaded, currentUser, currentFirebaseUser } = useContext(UserContext)
  if (isLoaded && currentUser && currentFirebaseUser) {
    return <Navigate to="/home" />
  }
  return <WelcomeWrapper />
}

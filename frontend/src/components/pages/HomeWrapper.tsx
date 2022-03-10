import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { AuthContext } from 'context/AuthContext'

export const HomeWrapper = () => {
  const { isLoaded, currentUser, currentFirebaseUser } = useContext(AuthContext)
  if (isLoaded && currentUser && currentFirebaseUser) {
    return <Navigate to="/home" />
  }
  return <WelcomeWrapper />
}

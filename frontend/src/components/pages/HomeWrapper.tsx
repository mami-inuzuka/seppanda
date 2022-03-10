import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { UserContext } from 'context/UserContext'

export const HomeWrapper = () => {
  const { currentUser } = useContext(UserContext)
  if (currentUser) {
    return <Navigate to="/home" />
  }
  return <WelcomeWrapper />
}

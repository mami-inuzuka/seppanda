import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from 'context/AuthContext'

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isLoaded, currentUser, currentFirebaseUser } = useContext(AuthContext)
  if (isLoaded) {
    if (currentUser && currentFirebaseUser) return children
    return <Redirect to="/" />
  }
  return null
}

import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isLoaded, isSignedIn } = useContext(AuthContext)
  if (isLoaded) {
    if (isSignedIn) return children
    return <Redirect to="/signin" />
  }
  return null
}

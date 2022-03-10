import { useContext, VFC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from 'context/AuthContext'

export const PrivateRoute: VFC = () => {
  const { isLoaded, currentUser, currentFirebaseUser } = useContext(AuthContext)
  if (isLoaded) {
    if (currentUser && currentFirebaseUser) return <Outlet />
    return <Navigate to="/" />
  }
  return null
}

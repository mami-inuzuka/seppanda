import { useContext, VFC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from 'context/AuthContext'

export const PrivateRoute: VFC = () => {
  const { currentUser, currentFirebaseUser } = useContext(AuthContext)

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{currentUser && currentFirebaseUser ? <Outlet /> : <Navigate to="/welcome" />}</>
}

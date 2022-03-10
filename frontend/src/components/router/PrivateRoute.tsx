import { ReactElement, useContext, VFC } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from 'context/AuthContext'

type Props = {
  component: ReactElement
}
export const PrivateRoute: VFC<Props> = ({ component }) => {
  const { isLoaded, currentUser, currentFirebaseUser } = useContext(AuthContext)
  if (isLoaded) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (currentUser && currentFirebaseUser) return <>{component}</>
    return <Navigate to="/" />
  }
  return null
}

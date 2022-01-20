import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isSignedIn } = useContext(AuthContext)
  if (isSignedIn) {
    return children
  } else {
    /* eslint no-else-return:0 */
    return <Redirect to="/signin" />
  }
}

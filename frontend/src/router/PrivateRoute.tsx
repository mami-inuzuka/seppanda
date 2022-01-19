import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
/* eslint import/no-cycle:0 */
import { AuthContext } from '../App'

/* eslint react/function-component-definition:0 */
export const Private = ({ children }: { children: React.ReactElement }) => {
  const { isSignedIn } = useContext(AuthContext)
  if (isSignedIn) {
    return children
  } else {
    /* eslint no-else-return:0 */
    return <Redirect to="/signin" />
  }
}

import { ReactElement, useContext, VFC } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from 'context/UserContext'

type Props = {
  component: ReactElement
}

export const PrivateRoute: VFC<Props> = ({ component }) => {
  const { currentUser } = useContext(UserContext)

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (currentUser) return <>{component}</>
  return <Navigate to="/" />
}

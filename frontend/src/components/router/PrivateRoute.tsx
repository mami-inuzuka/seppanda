import { ReactElement, useContext, useEffect, VFC } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from 'context/UserContext'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

type Props = {
  component: ReactElement
}
export const PrivateRoute: VFC<Props> = ({ component }) => {
  const { isLoaded, setIsLoaded, currentUser, setCurrentUser, currentFirebaseUser, setCurrentFirebaseUser } =
    useContext(UserContext)
  const { errorToast } = useToast()

  const handleGetCurrentUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
      const res = await getCurrentUser(token)
      setCurrentUser(res?.data.user)
    } catch {
      errorToast('エラーが発生しました')
    }
  }

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentFirebaseUser(user)
      if (user) {
        handleGetCurrentUser()
          .catch(() => {
            errorToast('エラーが発生しました')
          })
          .finally(() => {
            setIsLoaded(true)
          })
      } else {
        setIsLoaded(true)
      }
    })
    return () => {
      unsubscribed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoaded) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (currentUser && currentFirebaseUser) return <>{component}</>
    return <Navigate to="/" />
  }
  return null
}

import { useContext, useEffect, useState, VFC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'

import { FullWindowSpinner } from 'components/organisms/spinner/FullWindowSpinner'
import { AuthContext } from 'context/AuthContext'
import { useToast } from 'hooks/useToast'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'
import { PaymentProvider } from 'providers/PaymentProvider'

export const PrivateRoute: VFC = () => {
  const { currentUser, setCurrentUser, currentFirebaseUser, setCurrentFirebaseUser } = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const { errorToast } = useToast()

  const handleGetCurrentUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    try {
      const res = await getCurrentUser(token)
      setCurrentUser(res?.data.user)
    } catch {
      errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
    }
  }

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (currentFirebaseUser && currentUser) {
        setIsLoaded(true)
        return
      }
      if (user) {
        setCurrentFirebaseUser(user)
        handleGetCurrentUser()
          .catch(() => {
            errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
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
    if (currentUser && currentFirebaseUser) {
      return (
        <PaymentProvider>
          <Outlet />
        </PaymentProvider>
      )
    }
    return <Navigate to="/welcome" />
  }
  return <FullWindowSpinner />
}

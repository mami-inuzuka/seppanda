import { useEffect, useState } from 'react'

import firebase from 'firebase/compat/app'

import { Loading } from 'components/pages/Loading'
import { AuthContext } from 'context/AuthContext'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { User } from 'types/user'

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState<firebase.User | null>(null)
  const { errorToast } = useToast()

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isLoaded,
    setIsLoaded,
    currentUser,
    setCurrentUser,
    currentFirebaseUser,
  }

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

  return (
    <AuthContext.Provider value={value}>
      {!isLoaded && <Loading />}
      {isLoaded && children}
    </AuthContext.Provider>
  )
}

import { useEffect, useState } from 'react'

import firebase from 'firebase/compat/app'

import { Loading } from 'components/pages/Loading'
import { AuthContext } from 'context/AuthContext'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'

import type { User } from 'types/user'

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState<firebase.User | null>(null)

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
      if (res?.status === 200) {
        setCurrentUser(res.data.user)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentFirebaseUser(user)
      handleGetCurrentUser()
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsLoaded(true)
        })
    })
    return () => {
      unsubscribed()
    }
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {!isLoaded && <Loading />}
      {isLoaded && children}
    </AuthContext.Provider>
  )
}

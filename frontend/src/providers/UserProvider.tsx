import { useState } from 'react'

import firebase from 'firebase/compat/app'

import { Loading } from 'components/pages/Loading'
import { UserContext } from 'context/UserContext'

import type { User } from 'types/user'

export const UserProvider = ({ children }: { children: React.ReactElement }) => {
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
    setCurrentFirebaseUser,
  }

  return (
    <UserContext.Provider value={value}>
      {!isLoaded && <Loading />}
      {isLoaded && children}
    </UserContext.Provider>
  )
}

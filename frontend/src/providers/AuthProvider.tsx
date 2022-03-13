import { useState } from 'react'

import firebase from 'firebase/compat/app'

import { AuthContext } from 'context/AuthContext'

import type { User } from 'types/user'

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState<firebase.User | null>(null)

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isLoading,
    setIsLoading,
    currentUser,
    setCurrentUser,
    currentFirebaseUser,
    setCurrentFirebaseUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

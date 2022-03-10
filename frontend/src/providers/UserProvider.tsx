import { useState } from 'react'

import firebase from 'firebase/compat/app'

import { UserContext } from 'context/UserContext'

import type { User } from 'types/user'

export const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    setCurrentUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

import { createContext } from 'react'

import firebase from 'firebase/compat/app'

import type { User } from 'types/user'

export type AuthContextType = {
  isLoaded: boolean | null
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  currentFirebaseUser: firebase.User | null
}

export const AuthContext = createContext<AuthContextType>({
  isLoaded: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoaded: () => {},
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
  currentFirebaseUser: null,
})

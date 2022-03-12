import { createContext } from 'react'

import firebase from 'firebase/compat/app'

import type { User } from 'types/user'

export type AuthContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  currentFirebaseUser: firebase.User | null
  setCurrentFirebaseUser: React.Dispatch<React.SetStateAction<firebase.User | null>>
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {},
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
  currentFirebaseUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentFirebaseUser: () => {},
})

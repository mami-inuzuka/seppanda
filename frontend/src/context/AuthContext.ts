import { createContext } from 'react'

import { UserCredential } from 'firebase/auth'

import type { User } from 'types/user'

export type AuthContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  currentFirebaseUser: UserCredential['user'] | null
  setCurrentFirebaseUser: React.Dispatch<React.SetStateAction<UserCredential['user'] | null>>
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

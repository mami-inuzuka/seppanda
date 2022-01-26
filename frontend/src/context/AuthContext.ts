import { createContext } from 'react'

import { User } from '../types/user'

export type AuthContextType = {
  isLoaded: boolean | null
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean | null
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType>({
  isLoaded: null,
  setIsLoaded: () => {
    throw new Error('AuthContext not avaliable')
  },
  isSignedIn: null,
  setIsSignedIn: () => {
    throw new Error('AuthContext not avaliable')
  },
  currentUser: null,
  setCurrentUser: () => {
    throw new Error('AuthContext not avaliable')
  },
})

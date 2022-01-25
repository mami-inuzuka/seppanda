import { createContext } from 'react'
import { User } from '../types/user'

type AuthContextValue = {
  isLoaded: boolean | null
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean | null
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextValue>({
  isLoaded: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoaded: () => {},
  isSignedIn: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsSignedIn: () => {},
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
})

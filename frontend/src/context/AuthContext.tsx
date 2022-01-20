import { createContext } from 'react'

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean | undefined
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  }
)
